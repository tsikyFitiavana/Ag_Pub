const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Entreprise = require("../../models/Entreprise.model");
// find Entreprise
router.get("/entreprise",(req, res) => {   
  Entreprise.find()
  .then(users => {    
      res.send(users);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Something wrong while retrieving profils."
      });
  });
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }else {
      User.find()
        .then(user =>{
          var id;
            if (user.length == 0) {
                id = 0
            } else {
                id = parseInt(user[user.length - 1]._id) + 1
            }
            const newUser = new User({
              _id:id,
              name: req.body.name,
              email: req.body.email,
              cles: req.body.cles,
              password: req.body.password
            });
      
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then(user => res.json(user))
                  .catch(err => console.log(err));
              });
            });
        })
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // let entre = 0;
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          cles: user.cles
        };
        console.log(user.id);
        
        Entreprise.find()
        .then(atel => {
          for(let i = 0 ; i< atel.length; i++){
            console.log(atel[i]._id)
          }
            // res.send(atel);
            console.log(atel);
            
            
        })

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              id: user.id,
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

//Contract entreprise
router.post("/entreprise", (req, res) => {
      Entreprise.find()
        .then(entre =>{
          var id;
            if (entre.length == 0) {
                id = 0
            } else {
                id = parseInt(entre[entre.length - 1]._id) + 1
            }
            const newEntre = new Entreprise({
              _id:id,
              nom: req.body.nom,
              email: req.body.email,
              phones: req.body.phone,
              mots_cles: req.body.mots_cles,
              produitAuth: req.body.produitAuth
            });
            newEntre.save()
                  .then(entre => res.json(entre))
                  .catch(err => console.log(err));
            
        })
    })
module.exports = router;
