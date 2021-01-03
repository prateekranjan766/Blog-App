const jwt = require("jsonwebtoken");
const congig = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).json({ msg: "No Token, Authentication denied" });
  }
  try {
    const decode = jwt.verify(token, congig.get("jwtSecret"));
    req.user = decode.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).send("Invalid Token");
  }
};
