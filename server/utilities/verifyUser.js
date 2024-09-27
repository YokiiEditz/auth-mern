const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).send("You need to login");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) res.status(403).send("Token is not valid");

    req.user = user;
    next();
  });
};

module.exports = verifyToken;
