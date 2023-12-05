const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/submit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/auth/index.html'));
});

app.post('/submit', (req, res) => {
    // Handle form submission logic here
    console.log(req.body); // This will log the form data to the console

    // Send a response to the client if needed
    // res.send('Form submitted successfully');

    // Redirect to the /auth route
    res.redirect('/auth');
});

app.get('/registerUser', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'crud.html'));
});

app.post('/registerUser', (req, res) => {
    console.log(req.body);
    res.redirect('/index.html');
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
