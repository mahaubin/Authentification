const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
    const token = req.cookies.user;

    if (!token) {
        return res.status(401).json("No token");
    }

    jwt.verify(token, process.env.SECRET_JWT, (err, userId) => {
        if (err) {
            return res.status(401).json("Token invalid");
        }

        req.user = {
            id: userId
        };
        next();
    });
};

module.exports = checkAuth;
