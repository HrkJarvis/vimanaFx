const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.app_mail,
      pass: process.env.pass
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.app_mail,
    subject: `Contact Form Submission from ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
