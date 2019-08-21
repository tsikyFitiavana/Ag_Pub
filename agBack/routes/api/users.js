const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const fs = require('fs')

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Publications = require("../../models/Publication.model");
const Entreprise = require("../../models/Entreprise.model");
// find Entreprise
router.get("/entreprise", (req, res) => {
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
    } else {
      User.find()
        .then(user => {
          var id;
          if (user.length == 0) {
            id = 0
          } else {
            id = parseInt(user[user.length - 1]._id) + 1
          }
          const newUser = new User({
            _id: id,
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


    console.log('afaka findOne ' + user)
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    
    Entreprise.find()
      .then(atel => {
        for (let i = 0; i < atel.length; i++) {
          console.log(atel.length)
          console.log("atel i "+atel[i])
          console.log(atel.mots_cles)
          if(user.cles != atel[i].mots_cles){
            console.log('votsek lesy eh de ita oeh diso oh')
            return res.status(404).json({ clesnotfound: "Vous avez un comptes Ag-pub mais malheuresement vous ne dispose pas le cles de votre entreprise" });
          }else{
            console.log('ato izy zao marn kouh');
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
                console.log('id anleh entreprise ty ah ' +atel[i]._id);
    
    
    
    
                // Sign token
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  {
                    expiresIn: 31556926 // 1 year in seconds
                  },
                  (err, token) => {
                    res.json({
                      idE: atel[i]._id,
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
            break;
            
          }
          console.log('efa aty anaty get entreprise sy boucle for' + user.cles)
        }
        // res.send(atel);
        console.log(atel);
        console.log(user);

        // console.log('efa aty anaty get entreprise ' + user.cles)
        
        
        // verify si l'users possede la cles d'entreprise

        // Check password
        
      })
  });
});

//Contract entreprise
router.post("/entreprise", (req, res) => {
  Entreprise.find()
    .then(entre => {
      var id;
      if (entre.length == 0) {
        id = 0
      } else {
        id = parseInt(entre[entre.length - 1]._id) + 1
      }
      const newEntre = new Entreprise({
        _id: id,
        nom: req.body.nom,
        email: req.body.email,
        phones: req.body.phones,
        mots_cles: req.body.mots_cles,
        produitAuth: req.body.produitAuth
      });
      newEntre.save()
        .then(entre => res.json(entre))
        .catch(err => console.log(err));

    })
})




// Ajout de nouvelle Publication

router.post("/publication",  (req, res) => {
  Publications.find()
  .then(user => {
      var id;
      if (user.length == 0) {
          id = 0
      } else {
          id = parseInt(user[user.length - 1]._id) + 1
      }
      let imageFile = req.files.image;
      let nomImage = id
      res.setHeader('Content-Type', 'text/plain');
  
      imageFile.mv(`${__dirname}/public/${nomImage}.jpg`, function (err) {
          if (err) {
              return res.status(500).send(err);
          }
      });
      const pub = new Publications({
          _id: id,
          idUser:req.body.idUser,
          nom: req.body.nom,
          prix: req.body.prix,
          description: req.body.description,
          image:nomImage + '.jpg',
          marque: req.body.marque
      });
      console.log(pub)
      pub.save()
          .then((data) => {
            res.send(data)
          }).catch(err => {
              res.status(500).send({
                  message: err.message || "Something wrong while creating the profil."
              });
          });
  })

});
//get one Pub
router.get('/publication/:idPub',(req, res) => {
  let id = req.params.idPub;
  Publications.findById(id, function (err, business){
      res.json(business);
  });
});
//Delete pub
router.get('/publicationDeleted/:idPub',(req, res) => {
  Publications.findByIdAndRemove({_id: req.params.idPub}, function(err, business){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});

// modifier publication
router.put("/publication/:idPub",(req, res) => {
  // Validate Request()
  console.log('ity ny requete'+req.body.nom)
  if(!req.body.nom || !req.body.description) {
      return res.status(400).send({
          message: "eleve content can not be empty"
      });
  }
  console.log('ity n params'+req.params.idPub)
  let imageFile = req.files.image;
      //console.log('inona ny ato o!'+imageFile)
      let nomImage = req.params.idPub
      res.setHeader('Content-Type', 'text/plain');

      imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
      console.log('tonga eto v nw')
  // Find and update eleve with the request body
  Publications.findByIdAndUpdate(req.params.idPub, {
    idUser:req.body.idUser,
    nom: req.body.nom,
    prix: req.body.prix,
    description: req.body.description,
    image:nomImage + '.jpg',
    marque: req.body.marque,
    idEntre: req.body.idEntre,
      
  }, {new: true})
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "eleve not found with id " + req.params.idPub
          });
      }
      res.send(user);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "eleve not found with id " + req.params.idPub
          });                
      }
      return res.status(500).send({
          message: "Something wrong updating note with id " + req.params.idPub
      });
  });
});

//get image
router.get("/image/:image",(req, res) =>{ 
  try {
    let picture = fs.readFileSync('./routes/api/public/'+req.params.image)
    res.write(picture)
    res.end()
} catch (e) {
    console.log("erreur be miitsy", e.stack);
}
})

// seulement mon produit

router.get("/monProduit/:idUser",(req, res) => {
  Publications.find({idUser:req.params.idUser})
      .then(profilchoix => {
          //console.log(unprofil)
          if (!profilchoix) {
              return res.status(404).send({
                  message: "profil not found with id" + req.params.idUser
              });
          }
          else {
              res.send(profilchoix);
          }


      }).catch(err => {
          if (err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "profil not found with id " + req.params.idUser
              });
          }
          return res.status(500).send({
              message: "Something wrong retrieving profil with id " + req.params.idUser
          });
      });
});

// seulement le produit du scociete

router.get("/societeProduit/:idEntre",(req, res) => {
  Publications.find({idEntre:req.params.idEntre})
      .then(profilchoix => {
          //console.log(unprofil)
          if (!profilchoix) {
              return res.status(404).send({
                  message: "profil not found with id" + req.params.idEntre
              });
          }
          else {
              res.send(profilchoix);
          }


      }).catch(err => {
          if (err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "profil not found with id " + req.params.idEntre
              });
          }
          return res.status(500).send({
              message: "Something wrong retrieving profil with id " + req.params.idEntre
          });
      });
});

router.get("/publication", (req, res) => {
  Publications.find()
    .then(users => {
      res.send(users);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving profils."
      });
    });
});
module.exports = router;
