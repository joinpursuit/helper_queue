require('dotenv').config();

const checkAdminId = async (req, res, next) => {
    const admin_id = req.headers.authtoken;
    if (admin_id !== process.env.SECRET_ADMIN_KEY) {
        res.status(401).json({ message: "No user authenticated!" });
    }
    next();
}

module.exports = { checkAdminId };
