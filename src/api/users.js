const express = require("express")
const User = require("../models/user")
const authenticate = require("../utils/auth")


const router = express.Router();



router.get('/', authenticate, (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error fetching user data', error });
    });
});

router.patch('/', authenticate, (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      user.email = req.body.email;
      user.password = req.body.password;

      user.save()
        .then(() => {
          res.json({ message: 'User data updated successfully' });
        })
        .catch((error) => {
          res.status(500).json({ message: 'Error updating user data', error });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error finding user', error });
    });
});
 
module.exports = router