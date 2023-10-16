// Importing necessary modules and models
var express = require("express");
var router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var nodeMailer = require("nodemailer");

// Route for user login
router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err)
      return res.status(500).json({
        title: "server error",
        error: err,
      });
    if (!user) {
      return res.status(401).json({
        title: "user not found",
        error: "user not found",
      });
    }
    // Incorrect password
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        tite: "login failed",
        error: " credentials are false",
      });
    }
    // If all is good, create a token and send to frontend
    let token = jwt.sign({ userId: user._id }, "secretkey");
    await User.findOne({ _id: user._id }).then((result) => {
      return res.status(200).json({
        title: "you are connected",
        token: token,
        user: result,
      });
    });
  });
});

// Route to get user email
router.get("/getemail/:mail", async (req, res) => {
  try {
    await User.findOne({ email: req.params.mail }).then((result) => {
      console.log(result);
      if (result) {
        let token = jwt.sign({ userId: result._id }, "secretkey");
        let transporter = nodeMailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "nextconsult01@gmail.com",
            pass: "aqqrayirwswvhwkz",
          },
        });
        let mailOptions = {
          from: '"NextConsult" <nextconsult01@gmail.com>', // sender address
          to: req.params.mail, // list of receivers
          subject: "reset password", // Subject line
          text: "reset password", // plain text body
          html:
            '<p>You requested for reset password, kindly use this <a href="http://localhost:8080/#/forgetpassword/' +
            token +
            '">link</a> to reset your password</p>', // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          }
          console.log("Message %s sent: %s");
        });
        res.send(" mail exist");
      } else {
        res.send("null");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Route to change user password
router.post("/changerpassword", async (req, res) => {
  let token = req.body.token;
  jwt.verify(token, "secretkey", async (err, decoded) => {
    try {
      await User.findOne({ _id: decoded.userId }).then((result) => {
        result.password = bcrypt.hashSync(req.body.password, 10);
        result.passwordtext = req.body.password;
        result.save();
        res.send("user updated");
      });
    } catch (err) {
      title: "unauthorized";
    }
  });
});

// Route to register a new user
router.post("/register", async (req, res) => {
  console.log(req);
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  user.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "User was registered successfully!" });
  });
});

// Route to get user information
router.get("/getuser/:token", (req, res, next) => {
  let token = req.params.token;
  jwt.verify(token, "secretkey", async (err, decoded) => {
    try {
      await User.findOne({ _id: decoded.userId }).then((result) => {
        res.send(result);
      });
    } catch (err) {
      title: "unauthorized";
    }
  });
});

// Exporting the router
module.exports = router;
