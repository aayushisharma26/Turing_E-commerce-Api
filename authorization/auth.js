const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        var decoded = jwt.decode(bearerToken);
        req.data = decoded
        next();
    } else {
        res.status(403).send("user is not authenticated")
    }
}