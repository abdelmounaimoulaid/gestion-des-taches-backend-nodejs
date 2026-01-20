const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify(token, SECRET_TOKEN);
        const userId = decodeToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch {
        res.status(403).json({ message: "unauthorized"})
    }
}