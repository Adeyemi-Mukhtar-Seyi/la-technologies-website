require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({
  origin: "https://latechnology.netlify.app",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// ================== MONGODB ==================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ================== SCHEMA ==================
const OrderSchema = new mongoose.Schema({
  name: String,
  email: String,
  product: String,
  subject: String,
  message: String,
  paid: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema);

// ================== SEND ORDER ==================
app.post('/send', async (req, res) => {
  try {
    console.log("Incoming request:", req.body);
    console.log("RESEND KEY:", process.env.RESEND_API_KEY);

    const { name, email, subject, product, message } = req.body;

    const newOrder = await Order.create({
      name,
      email,
      subject,
      product,
      message
    });

    await resend.emails.send({
      from: "L.A Technology <onboarding@resend.dev>",
      to: ["seyi1st2019@gmail.com"],
      subject: `New Order: ${product}`,
      text: `
Name: ${name}
Email: ${email}
Product: ${product}
Subject: ${subject}

Message:
${message}
      `
    });

    await resend.emails.send({
      from: "L.A Technology <onboarding@resend.dev>",
      to: [email],
      subject: "Your Order has been received",
      text: `
Hi ${name},

Thanks for ordering "${product}" from L.A Technology.

We will contact you shortly.

Best regards,
L.A Technology
      `
    });

    res.status(200).json({
      success: true,
      orderId: newOrder._id
    });

  } catch (err) {
    console.error("FULL ERROR:", err);

    res.status(500).json({
      message: err.message
    });
  }
});

// ================== GET ORDERS ==================
app.get('/orders', async (req, res) => {
  const orders = await Order.find().sort({ date: -1 });
  res.json(orders);
});

// ================== ROOT ==================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ================== START SERVER ==================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});









// const express = require('express');
// const mongoose = require('mongoose');
// const { Resend } = require('resend');
// const resend = new Resend(process.env.RESEND_API_KEY);
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors({
//   origin: "https://latechnology.netlify.app",
//   methods: ["GET", "POST"],
//   allowedHeaders: ["Content-Type"]
// }));
// app.use(express.json());

// // ================== MONGODB ==================
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// // ================== SCHEMA ==================
// const OrderSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   product: String,
//   subject: String,
//   message: String,
//   paid: { type: Boolean, default: false },
//   date: { type: Date, default: Date.now }
// });

// const Order = mongoose.model("Order", OrderSchema);


// // ================== SEND ORDER ==================
// app.post('/send', async (req, res) => {
//   try {
//     console.log("Incoming request:", req.body);

//     const { name, email, subject, product, message } = req.body;

//     // Save to DB
//     const newOrder = await Order.create({
//       name,
//       email,
//       subject,
//       product,
//       message
//     });

//     // ✅ Send email to YOU (admin)
//     await resend.emails.send({
//       from: "L.A Technology <onboarding@resend.dev>", // temporary sender
//       to: ["seyi1st2019@gmail.com"],
//       subject: `New Order: ${product}`,
//       text: `
//       Name: ${name}
//       Email: ${email}
//       Product: ${product}
//       Subject: ${subject}

//       Message:
//       ${message}
//       `
//     });

//     // ✅ Auto reply to customer
//     await resend.emails.send({
//       from: "L.A Technology <onboarding@resend.dev>",
//       to: [email],
//       subject: "Your Order has been received",
//       text: `
//       Hi ${name},

//       Thanks for ordering "${product}" from L.A Technology.

//       We will contact you shortly.

//     Best regards,
//       L.A Technology
//       `
//     });

//     res.status(200).json({
//       success: true,
//       orderId: newOrder._id
//     });

//       } catch (err) {
//       console.error("FULL ERROR:", err);

//       res.status(500).json({
//         message: err.message,
//         stack: err.stack
//       });
// }})

// // ================== GET ORDERS ==================
// app.get('/orders', async (req, res) => {
//   const orders = await Order.find().sort({ date: -1 });
//   res.json(orders);
// });



// // Serve index.html for root
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.listen(3000, () => console.log("Server running on port 3000"));


// app.listen(PORT, () => {
//   console.log(` Server running on http://localhost:${PORT}`);
// });




// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const path = require('path');
// require('dotenv').config();

// const cors = require('cors');

// const app = express();
// app.use(cors({
//   origin: "https://latechnology.netlify.app",
//   methods: ["GET", "POST"],
// }));
// const PORT = process.env.PORT || 3000;



// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve all static files (HTML, CSS, JS, images)
// app.use(express.static(path.join(__dirname)));

// // Nodemailer setup
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.error("SMTP ERROR:", error);
//   } else {
//     console.log("SMTP READY ✅");
//   }
// });


// // Handle form POST
// app.post('/send', (req, res) => {
//   try {
//   console.log("Incoming request:", req.body);
//   const { name, email, subject, product, message } = req.body;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     replyTo: email,
//     to: 'seyi1st2019@gmail.com',
//     subject: `New message from ${name} - ${subject}`,
//     text: `
//     New Order Received
// Name: ${name}
// Email: ${email}
// Product: ${product}
// Subject: ${subject}

// Message:
// ${message}
// `,
//   };

//     const info = await transporter.sendMail(mailOptions);

//     console.log("Email sent:", info.response);
//     res.status(200).json({ message: 'Message sent successfully!' });

//   } catch (error) {
//     console.error("SEND ERROR:", error); // 👈 THIS is what you need
//     res.status(500).json({ message: 'Message failed to send.' });
//   }
//   // transporter.sendMail(mailOptions, (error, info) => {
//   //   if (error) {
//   //     console.error(error);
//   //     return res.status(500).json({ message: 'Message failed to send.' });
//   //   }
//   //   console.log('Email sent: ' + info.response);
//   //   res.status(200).json({ message: 'Message sent successfully!' });
//   // });
// });




