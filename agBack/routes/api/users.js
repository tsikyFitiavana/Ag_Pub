const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const fs = require('fs')
const nodemailer = require('nodemailer');

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Publications = require("../../models/Publication.model");
const Entreprise = require("../../models/Entreprise.model");
const Participants = require("../../models/participant.model");
const Coms = require("../../models/commentaire.model");
const UserClient = require('../../models/clientPartUser.model');

// Sign up a userClient
router.post('/Commender/:params', async (req, res) => {

  try {
    const user = await UserClient.find({ email: req.body.email }).exec();
    if (user.length > 0) {
      return res.json('Email already exists.');
    }
    const newUser = new UserClient({
      email: req.body.email,
      name: req.body.name,
      adresse_exacte: req.body.adresse_exacte,
      phones: req.body.phones,
      nombreDecom: req.body.nombreDecom,
      idProduitCommender: req.body.idProduitCommender
    });
    return newUser
      .save()
      .then((result) => {
        console.log(result);
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "ze revenao ah",
            pass: "io"
          }
        });
        var mailOptions = {
          from:"tsikybr@gmail.com",
          to:result.email,
          subject: ' commende bien ressu',
          text: result.name + "votre commende et bien ressu"
        }


        smtpTransport.sendMail(mailOptions, function (error, response) {
          if (error) {
            console.log('ato ah zany leh ky'+error);
          } else {
            console.log("ok");

          }
        });

        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    return res.status(500).json(err);
  }
});

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
    console.log('ito' + user.cles);

    Entreprise.find()
      .then(atel => {
        let recup = ''
        let x = user.cles
        var bol = true
        for (let i = 0; i < atel.length; i++) {

          recup = atel[i].mots_cles;
          if (x == atel[i].mots_cles) {
            bol = true
            break;
          } else {
            bol = false

          }
        }
        if (bol == true) {
          console.log('voila le atel[i].mots_cles existant', recup);
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
              console.log('ito le user.cles tokony alefanlah lesy eh ' + user.cles);




              // Sign token
              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                  res.json({
                    cles: user.cles,
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
        } else {
          console.log('voila le atel[i].mots_cles inexistant');
          return res.status(404).json({ clesnotfound: "Vous avez un comptes Ag-pub mais malheuresement vous ne dispose pas le cles de votre entreprise" });
        }

        console.log('ty le recup' + recup);

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
//insertion participant
router.post("/participant", (req, res) => {
  Participants.find()
    .then(entre => {
      var id;
      if (entre.length == 0) {
        id = 0
      } else {
        id = parseInt(entre[entre.length - 1]._id) + 1
      }
      const newEntre = new Participants({
        _id: id,
        nom: req.body.nom,
        email: req.body.email,
        phones: req.body.phones,
        prenom: req.body.prenom
      });
      newEntre.save()
        .then(entre => res.json(entre))
        .catch(err => console.log(err));

    })
})
//insertion Coms
router.post("/coms/:_id", (req, res) => {

  Coms.find()
    .then(entre => {
      var id;
      if (entre.length == 0) {
        id = 0
      } else {
        id = parseInt(entre[entre.length - 1]._id) + 1
      }
      Publications.findById(req.params._id).then(Pub => {
        const com = new Coms({
          _id: id,
          identifientEntre: req.body.entre,
          msg: req.body.msg,
        });
        Publications.findByIdAndUpdate(Pub._id, {
          _id: Pub.id,
          idUser: Pub.idUser,
          nom: Pub.nom,
          prix: Pub.prix,
          description: Pub.description,
          image: Pub.image,
          image1: Pub.image1,
          image2: Pub.image2,
          marque: Pub.marque,
          clesEntreprPub: Pub.clesEntreprPub,
          comsNumber: Pub.comsNumber + 1
        }).then(result => {
          console.log(result);


          com.save()
            .then(entre => res.json(entre))
            .catch(err => console.log(err));
        })
      })
    })
})
//get all coms
router.get("/coms", (req, res) => {
  Coms.find()
    .then(users => {
      res.send(users);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving profils."
      });
    });
});
//get mes coms

router.get("/coms/:identifientEntre", (req, res) => {
  Coms.find({ identifientEntre: req.params.identifientEntre })
    .then(profilchoix => {
      //console.log(unprofil)
      if (!profilchoix) {
        return res.status(404).send({
          message: "profil not found with id" + req.params.identifientEntre
        });
      }
      else {
        res.send(profilchoix);
      }


    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "profil not found with id " + req.params.identifientEntre
        });
      }
      return res.status(500).send({
        message: "Something wrong retrieving profil with id " + req.params.identifientEntre
      });
    });
});
// Ajout de nouvelle Publication

router.post("/publication", (req, res) => {
  Publications.find()
    .then(user => {
      var id;
      if (user.length == 0) {
        id = 0
      } else {
        id = parseInt(user[user.length - 1]._id) + 1
      }
      let imageFile = req.files.image;
      let imageFile1 = req.files.image1;
      let imageFile2 = req.files.image2;
      let nomImage = id
      let nomImage1 = 'image1'+id
      let nomImage2 = 'image2'+id
      res.setHeader('Content-Type', 'text/plain');

      imageFile.mv(`${__dirname}/public/${nomImage}.jpg`, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
      imageFile1.mv(`${__dirname}/public/${nomImage1}.jpg`, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
      imageFile2.mv(`${__dirname}/public/${nomImage2}.jpg`, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
      const pub = new Publications({
        _id: id,
        idUser: req.body.idUser,
        nom: req.body.nom,
        prix: req.body.prix,
        description: req.body.description,
        image: nomImage + '.jpg',

    image1: nomImage1 + '.jpg',
    image2: nomImage2 + '.jpg',
        marque: req.body.marque,
        clesEntreprPub: req.body.clesEntreprPub,
        comsNumber: 0
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
router.get('/publication/:idPub', (req, res) => {
  let id = req.params.idPub;
  Publications.findById(id, function (err, business) {
    res.json(business);
  });
});

//Find one entreprise ty ah
router.get('/entreprise/:mots_cles', (req, res) => {
  let mots_cles = req.params.mots_cles;
  console.log(mots_cles)
  Entreprise.findOne({ mots_cles }).then(users => {
    res.send(users);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Something wrong while retrieving profils."
    });
  });
});
//get all entreprise
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
//Delete pub
router.get('/publicationDeleted/:idPub', (req, res) => {
  Publications.findByIdAndRemove({ _id: req.params.idPub }, function (err, business) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

// modifier publication
router.put("/publication/:idPub", (req, res) => {
  // Validate Request()
  console.log('ity ny requete' + req.body.nom)
  if (!req.body.nom || !req.body.description) {
    return res.status(400).send({
      message: "eleve content can not be empty"
    });
  }
  console.log('ity n params' + req.params.idPub)
  let imageFile = req.files.image;
  let imageFile1 = req.files.image1;
  let imageFile2 = req.files.image2;
  //console.log('inona ny ato o!'+imageFile)
  let nomImage =req.params.idPub
  let nomImage1 = 'image1'+req.params.idPub
  let nomImage2 = 'image2'+req.params.idPub
  res.setHeader('Content-Type', 'text/plain');

  imageFile.mv(`${__dirname}/public/${nomImage}.jpg`, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
  });
  imageFile1.mv(`${__dirname}/public/${nomImage1}.jpg`, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
  });
  imageFile2.mv(`${__dirname}/public/${nomImage2}.jpg`, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
  });
  console.log('tonga eto v nw')
  // Find and update eleve with the request body
  Publications.findByIdAndUpdate(req.params.idPub, {
    idUser: req.body.idUser,
    nom: req.body.nom,
    prix: req.body.prix,
    description: req.body.description,
    image: nomImage + '.jpg',
    image1: nomImage1 + '.jpg',
    image2: nomImage2 + '.jpg',
    marque: req.body.marque,
    clesEntreprPub: req.body.clesEntreprPub

  }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "eleve not found with id " + req.params.idPub
        });
      }
      res.send(user);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
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
router.get("/image/:image", (req, res) => {
  try {
    let picture = fs.readFileSync('./routes/api/public/' + req.params.image)
    res.write(picture)
    res.end()
  } catch (e) {
    console.log("erreur be miitsy", e.stack);
  }
})
// //get image1
// router.get("/image1/:image1", (req, res) => {
//   try {
//     let picture = fs.readFileSync('./routes/api/public/' + req.params.image1)
//     res.write(picture)
//     res.end()
//   } catch (e) {
//     console.log("erreur be miitsy", e.stack);
//   }
// })
// //get image2
// router.get("/image2/:image2", (req, res) => {
//   try {
//     let picture = fs.readFileSync('./routes/api/public/' + req.params.image2)
//     res.write(picture)
//     res.end()
//   } catch (e) {
//     console.log("erreur be miitsy", e.stack);
//   }
// })

// seulement mon produit

router.get("/monProduit/:idUser", (req, res) => {
  Publications.find({ idUser: req.params.idUser })
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

router.get("/societeProduit/:clesEntreprPub", (req, res) => {
  Publications.find({ clesEntreprPub: req.params.clesEntreprPub })
    .then(profilchoix => {
      //console.log(unprofil)
      if (!profilchoix) {
        return res.status(404).send({
          message: "profil not found with id" + req.params.clesEntreprPub
        });
      }
      else {
        res.send(profilchoix);
      }


    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "profil not found with id " + req.params.clesEntreprPub
        });
      }
      return res.status(500).send({
        message: "Something wrong retrieving profil with id " + req.params.clesEntreprPub
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
