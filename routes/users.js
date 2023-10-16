var express = require("express");
var router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");



router.get("/getechniciens", async (req, res) => {
  try {
    await User.find({role : "technicien" }).
    then((result) => {
      res.send(result);

    });
  } catch (err) {
    console.log(err);
  }
});

//get users
router.get("/getusers", async (req, res) => {
    try {
      await User.find().then((result) => {
        res.send(result);

      });
    } catch (err) {
      console.log(err);
    }
  });

// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    User.deleteOne({ _id: req.params.id })
    .then((result1) => {
      res.status(200).json({
        message: "user supprimé",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});


////
router.get("/getuserbyid/:id", async (req, res) => {
    try {
      await User.findOne({ _id: req.params.id }).then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
    }
  });
  
///add user
router.post("/adduser", async (req, res) => {
    
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10),
        passwordtext:req.body.password,
      adresse: req.body.adresse,
      telephone: req.body.telephone,
      role:req.body.role

    });
    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      res.send({ message: "user added successfully!" });
    });
  });
  ///edit
  router.put("/edituser", async (req, res) => {
  
    const user = await User.findOne({ _id: req.body.id });
    (user.name = req.body.name),
      (user.password = bcrypt.hashSync(req.body.password, 10)),
      (user.passwordtext = req.body.password),
      (user.email = req.body.email),
      (user.adresse = req.body.adresse),
      (user.telephone = req.body.telephone),
      (user.role = req.body.role),
     
 
      user.save((err) => {
        if (err) {
          console.log(err);
        }
        return res.status(200).json({
          title: "user  modifié",
        });
      });
  });
  
  module.exports = router;