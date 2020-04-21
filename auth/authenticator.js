const jwt = require("jsonwebtoken");
const secrets = require("../api/secrets");

module.exports = (req, res, next) => {
  // tokens are usually sent as the authorization header
  const token = req.headers.authorization;
  const secret = secrets.jwtSecret;
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      // if everything is good with the token, the error will be undefined
      if (error) {
        res.status(401).json({ messgae: "you cannot pass" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ messgae: "provide creds pls" });
  }
};
