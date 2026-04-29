const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;



// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve all static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});




// Handle form POST
app.post('/send', (req, res) => {
  console.log("Incoming request:", req.body);
  const { name, email, subject, product, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'seyi1st2019@gmail.com',
    subject: `New message from ${name} - ${subject}`,
    text: `
    New Order Received
Name: ${name}
Email: ${email}
Product: ${product}
Subject: ${subject}

Message:
${message}
`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Message failed to send.' });
    }
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'Message sent successfully!' });
  });
});



// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
