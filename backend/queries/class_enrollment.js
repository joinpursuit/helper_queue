const db = require("../db");
const admin = require("../firebase");
const pgp = require("pg-promise")({ capSQL: true });

// our set of columns, to be created only once (statically), and then reused,
// to let it cache up its formatting templates for high performance:
//https://stackoverflow.com/questions/37300997/multi-row-insert-with-pg-promise

const cs = new pgp.helpers.ColumnSet(['id', 'email', 'class'], {
  table: 'users'
});

const enrollClass = async (req, res, next) => {
  try {
    const { studentEmails, cohortNumber } = req.body;
    let emails = studentEmails.split("\n");
    emails = emails.filter((email) => email.slice(-11) === "pursuit.org");

    let newUsers = await Promise.all(
      emails.map((email) => {
        return admin.auth().createUser({
          email,
          emailVerified: false,
          password: "password",
          disabled: false,
        });
      })
    );

    newUsers = newUsers.map((user) => {
      return {
        id: user.uid,
        email: user.email.toLowerCase(),
        class: cohortNumber.trim(),
      };
    });
    const query = pgp.helpers.insert(newUsers, cs);
    await db.none(query);

    res.json({
      message: "Class Enrolled!",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { enrollClass };
