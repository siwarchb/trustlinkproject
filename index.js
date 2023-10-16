const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const Offre = require("./models/Offre");

var cron = require("node-cron"); // Importing the node-cron library for scheduling tasks.
var nodeMailer = require("nodemailer"); // Importing nodemailer for sending emails.

// Scheduling a cron job to run every 8 hours.
cron.schedule("0 */8 * * *", () => {
  try {
    // Finding offers with 'etat_reception' set to "confirmé" and populating 'ticket_id'.
    Offre.find({ etat_reception: "confirmé" })
      .populate(["ticket_id"])
      .then((result) => {
        result.forEach((offre, index) => {
          const date1 = offre.date_reception;
          const date2 = Date.now();
          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (offre.etat_confirmation == "en attente") {
            if (diffDays == 15) {
              let client = Client.findById(offre.ticket_id.client_id);
              client.then((userDetails) => {
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
                  from: '"NextConsult" <nextconsult01@gmail.com>',
                  to: userDetails.email,
                  subject: "test",
                  text: "test",
                  html: "<b>reminder regarding verification of your account</b>",
                };
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    return console.log(error);
                  }
                });
              });
            } else if (diffDays == 22) {
              // Sending another email for a different condition.
              // (Similar structure as above)
            } else if (diffDays == 25) {
              // Sending another email for a different condition.
              // (Similar structure as above)
            } else if (diffDays == 28) {
              // If diffDays is 28, set 'etat_confirmation' to 'refusé'.
              Offre.findOne({ _id: offre._id }, (err, off) => {
                if (off) {
                  off.etat_confirmation = "refusé";
                  off.save();
                }
              });
            } else {
              console.log("still time");
            }
          }
        });
      });
  } catch (err) {
    console.log(err);
  }
});

// Express.js application setup:

app.use(cors()); // Handling Cross-Origin Resource Sharing.

app.use(bodyParser.json()); // Parsing JSON requests.
app.use(bodyParser.urlencoded({ extended: false })); // Parsing URL-encoded requests.

// Serving static files located in the directory 'front/dist'.
app.use(express.static(path.join(__dirname, "front/dist")));

// routes api
const auth = require("./routes/auth.js");
app.use("/api/auth", auth);

const contrats = require("./routes/contrats.js");
app.use("/api/contrats", contrats);

const interventions = require("./routes/interventions.js");
app.use("/api/interventions", interventions);

const clients = require("./routes/clients.js");
app.use("/api/clients", clients);

const tickets = require("./routes/tickets.js");
app.use("/api/tickets", tickets);

const emplacements = require("./routes/emplacements.js");
app.use("/api/emplacements", emplacements);

const stocks = require("./routes/stocks.js");
app.use("/api/stocks", stocks);

const pannes = require("./routes/pannes.js");
app.use("/api/pannes", pannes);

const diagnostics = require("./routes/diagnostics.js");
app.use("/api/diagnostics", diagnostics);

const demandestock = require("./routes/demandestock.js");
app.use("/api/demandestock", demandestock);

const acheteurs = require("./routes/acheteurs.js");
app.use("/api/acheteurs", acheteurs);

const users = require("./routes/users.js");
app.use("/api/users", users);

const accessoires = require("./routes/accessoires.js");
app.use("/api/accessoires", accessoires);

const offres = require("./routes/offres.js");
app.use("/api/offres", offres);

const revendeurs = require("./routes/revendeurs.js");
const Client = require("./models/Client");
app.use("/api/revendeurs", revendeurs);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/front/dist/index.html"));
});

// app.use(require('./routes/auth.js'));
// app.use(require('./routes/clients.js'));
// app.use(require('./routes/tickets.js'));
// app.use(require('./routes/emplacements.js'));
// app.use(require('./routes/stocks.js'));
// app.use(require('./routes/pannes.js'));
// app.use(require('./routes/diagnostics.js'));
// app.use(require('./routes/demandestock.js'));
// app.use(require('./routes/acheteurs.js'));

//port
const port = process.env.PORT || 3010;
app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});
//database connection
mongoose.connect(
  "mongodb+srv://seif:seif@cluster0.qdmw6.mongodb.net/savsiwar?retryWrites=true&w=majority",
  (err, done) => {
    if (err) {
      console.log(err);
    }
    if (done) {
      console.log("data base connected");
    }
  }
);
