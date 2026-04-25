const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve all static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// Handle form POST
app.post('/send', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'seyi1st2019@gmail.com',
    subject: `New message from ${name} - ${subject}`,
    text: `
Name: ${name}
Email: ${email}
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

// // ✅ Handle form POST
// app.post('/send', (req, res) => {
//   const { name, email, subject, message } = req.body;

//   // If any field is missing, return an error response
//   if (!name || !email || !subject || !message) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   const mailOptions = {
//     from: email,
//     to: 'seyi1st2019@gmail.com',
//     subject: `New message from ${name} - ${subject}`,
//     text: `
// Name: ${name}
// Email: ${email}
// Subject: ${subject}

// Message:
// ${message}
// `,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('❌ Email send error:', error);
//       return res.status(500).json({ message: 'Message failed to send.' });
//     }
//     console.log('✅ Email sent:', info.response);
//     res.status(200).json({ message: 'Message sent successfully!' });
//   });
// });

// ✅ Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});




// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const path = require('path');
// require('dotenv').config();

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// // ✅ Serve all static files (HTML, CSS, JS, images)
// app.use(express.static(path.join(__dirname)));

// // Nodemailer setup
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Handle form POST
// app.post('/send', (req, res) => {
//   const { name, email, subject, message } = req.body;

//   const mailOptions = {
//     from: email,
//   to: 'seyi1st2019@gmail.com',
//   subject: `New message from ${name} - ${subject}`,
//   text: `
// Name: ${name}
// Email: ${email}
// Subject: ${subject}

// Message:
// ${message}
// `,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).send('Message failed to send.');
//     }
//     console.log('Email sent: ' + info.response);
//     res.status(200).send('Message sent successfully!');
//   });
// });

// // ✅ Serve index.html for root
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



// const express = require('express');
// const nodemailer = require('nodemailer');
// // const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');
// require('dotenv').config();


// const app = express();
// const PORT = 3000;

// // Middleware
// // app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static(__dirname)); // <-- Serve your current folder as static

// // Nodemailer transporter (example using Gmail)
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS // Use App Password or OAuth2
//   }
// });

// app.post('/send', (req, res) => {
//   const { name, email, subject, message } = req.body;

//   const mailOptions = {
//     from: email,
//     to: 'yourgmail@gmail.com',
//     subject: subject,
//     text: `Message from ${name} (${email}):\n\n${message}`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//       res.status(500).send('Message failed to send.');
//     } else {
//       console.log('Email sent: ' + info.response);
//       res.status(200).send('Message sent successfully!');
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
