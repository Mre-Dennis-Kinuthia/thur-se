const express = require('express');
//const { PrismaClient } = require('@prisma/client');
//const prisma = new PrismaClient(); 
const path = require('path');
const bodyParser = require('body-parser'); // Import body-parser

const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the "public" folder
app.use(express.static('public'));

// Serve the auth form
app.get('/submit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/auth/index.html'));
});

// Handle the POST request for the "/submit" endpoint
app.post('/submit', (req, res) => {
    // Handle form submission logic here
    console.log(req.body); // This will log the form data to the console
    res.send('Form submitted successfully'); // Send a response to the client

    res.redirect('/auth');
});

// Serve the success page
app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/auth/index.html'));
});

// Serve the register.html page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/auth/institution / register.html'));
});

// Serve CSS files with the correct MIME type
app.get('/login/learner.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login', 'learner.css'), {
        headers: {
            'Content-Type': 'text/css', // Set the correct MIME type for CSS
        },
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});