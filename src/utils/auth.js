const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {

  const token = req.headers.authorization;
  console.log(token, " token check")
  let newtoken = token.split(" ")

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
 
    jwt.verify(newtoken[1], "mynameisvivekkumaryadavokdkfidfhdifijhugbyigndfksdn", (error, decoded) => {
      if (error) {
        res.status(401).json({ message: 'Ujn' });
      } else {
        req.user = decoded;
        console.log("successful")
        next();
      }
    });
  }
};
module.exports = authenticate