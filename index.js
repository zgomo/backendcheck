// Import necessary modules
const express = require('express');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

// Load environment variables from .env file
dotenv.config();

// Create an instance of an Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());


// Define a route handler for sending emails
app.post('/send-email', async (req, res) => {
  const { name, lastName, phoneNumber, email, message } = req.body;

  if (!name || !lastName || !phoneNumber || !email || !message) {
    return res.status(400).send('All fields are required');
  }

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAILUSER,
      pass: process.env.EMAILPASS
    }
  });

  // Set up email data
  const mailOptions = {
    from: process.env.EMAILUSER,
    to: process.env.EMAILUSER,
    subject: 'New Contact Form Submission',
    text: `Name: ${name} ${lastName}\nPhone Number: ${phoneNumber}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send mail with defined transport object
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});



// Define a route handler for the root route ('/')
app.get('/', (req, res) => {
    res.send('Hello World');
  });
  

// Start the server and listen on the specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
