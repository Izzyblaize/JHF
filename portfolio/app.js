const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';
const path = require('path');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Set up a transport for nodemailer
const myMail = process.env.MY_MAIL || 'your-email@example.com'
const myMailPassword = process.env.APP_PASS || 'your-email-password'
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port:465,
  secure:true,
  logger:true,
  debug:true,
  secureConnection:false,
  auth: {
    user: myMail,
    pass: myMailPassword ,
  },
  tls:{ rejectUnauthorized: true},
});

// Handle form submissions
app.post('/send-message', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
        from: email,
    to: 'jutelabs@gmail.com', 
    subject: subject,
    text: `Name: ${name}\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('404.html')
    }
    res.status(200).redirect('/success.html');
  });

});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
