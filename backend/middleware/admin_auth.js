require('dotenv').config();

const checkAdminId = async (req, res, next) => {
    const admin_id = req.headers.authtoken;
    if (admin_id !== process.env.SECRET_ADMIN_KEY) {
        res.status(401).json({ message: "Must be admin!" });
    }
    next();
}

module.exports = { checkAdminId };
