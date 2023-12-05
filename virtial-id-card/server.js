const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;
const nodemailer = require('nodemailer');
const crypto = require('crypto');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


// In-memory database for demonstration purposes
const users = [];


// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'denniskinuthia1105@gmail.com',
        pass: 'mkiy hohn bmyh hisx'
    }
});

app.get('/submit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/auth/index.html'));
});

app.post('/submit', (req, res) => {
    // Handle form submission logic here
    console.log(req.body); // This will log the form data to the console

    // Send a response to the client if needed
    // res.send('Form submitted successfully');

    // Redirect to the /auth route
    //res.redirect('/auth');
});

app.get('/registerUser', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'crud.html'));
});

app.post('/registerUser', (req, res) => {
    console.log(req.body);
    const userEmail = req.body.email;

    // Generate a unique verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // Store the user and token (in-memory for simplicity)
    users.push({ email: userEmail, verificationToken });

    // Send verification email
    const verificationLink = `https://thur-se.vercel.app/verify/${verificationToken}`;// use verel
    const mailOptions = {
        from: 'denniskinuthia1105@gmail.com',
        to: userEmail,
        subject: 'Email Verification',
        text: `Click the following link to verify your email: ${verificationLink}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            if (!res.headersSent) {
            res.status(500).send('Internal Server Error');
            }
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully. Check your inbox for verification.');
        }
    });
    res.redirect('/index.html');
});

app.get('/verify/:token', (req, res) => {
    const token = req.params.token;

    //find the user wit the conrresponding token
    const user = users.find(u => u.verificationToken === token);

    if (user) {
        // Mark the user as verified (update your database here)
        // For demonstration, just remove the user from the in-memory storage
        const index = users.indexOf(user);
        users.splice(index, 1);

        res.send('Email Verified Successfully');
    } else {
        res.status(400).send('invalid token');
    }

});

app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/auth/index.html'));
});

app.get('/login/learner.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login', 'learner.css'), {
        headers: {
            'Content-Type': 'text/css',
        },
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
