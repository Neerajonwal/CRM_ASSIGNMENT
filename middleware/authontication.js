const config = require("../config/config")
const jwt = require("jsonwebtoken")
const employee = require("../model/Employe_Schema")
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token, config.JWT_SECRET, (err, employee) => {
        if (err) return res.status(403).send('Invalid Token');
        req.employee = employee;
        next();
    });
}
module.exports = authenticateToken;