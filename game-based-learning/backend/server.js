const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const db = require("./db/connect");
const cors = require("cors");
const router = require("./routes/routes");

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000","http://localhost:5173"],
  })
);

// Token expires in 30 Days
app.use("/api/", router);

// Define a route to handle POST requests to /api/sendEmail
app.post("/api/sendEmail", (req, res) => {
  const { emails } = req.body;

  const transporter = nodemailer.createTransport({
    // SMTP configuration
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "legendswork90@gmail.com",
      pass: "btgasvyfwkymlgcq",
    },
  });

  emails.forEach((emailData) => {
    const { recipient, text } = emailData;

    console.log(recipient);

    // All Email content
    const mailOptions = {
      from: "legendswork90@gmail.com",
      to: recipient,
      subject: "Demo Request",
      text: text,
    };

    // Sending the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  });

  res.status(200).send("Emails sent successfully");
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
  console.log("Waiting for Mongo...");
});
