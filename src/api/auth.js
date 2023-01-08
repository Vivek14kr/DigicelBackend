const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authenticate = require("../utils/auth");

const router = express.Router();
let hashpassword = ""
router.post("/signup", (req, res) => {
  const {firstname, email, password } = req.body;


  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(400).json({ message: "Email already exists" });
      } else {
        bcrypt.hash(req.body.password, 8, function (err, hash) {
          if (err) return res.json({ error: true });
          else {
            hashpassword = hash
            const newUser = new User({
              firstname,
              email,
              password: hash,
            });

            newUser
              .save()
              .then(() => {
                res.status(200).json({ message: "User created successfully" });
              })
              .catch((error) => {
                res.status(500).json({ message: "Error creating user", error });
              });
          }
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error finding user", error });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(404).json({ message: "Invalid email or password" });
    } else {
 
 

      let result  = bcrypt.compareSync(password, user.password)
      
        if (result){
       
          const token = jwt.sign(
            { id: user._id },
            "mynameisvivekkumaryadavokdkfidfhdifijhugbyigndfksdn",
            {
              expiresIn: "1d",
            }
          );

          res.json({ 
            "firstname":user.firstname,
            
            "token":token });
        }else {
          res.status(404).json({ message: "Invalid email or password" });
        }
      
     
    }
  });
});

router.get("/verify", authenticate, (req, res) => {
  res.json({ message: "Token is valid" });
});

module.exports = router;
