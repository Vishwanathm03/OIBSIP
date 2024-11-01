const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static('public'));

// Hardcoded user credentials
const hardcodedUser = {
    username: 'admin',
    password: 'password123'
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check hardcoded credentials
    if (username === hardcodedUser.username && password === hardcodedUser.password) {
        req.session.username = username; // Log in the user
        res.redirect('/secured');
    } else {
        res.send('Login failed. <a href="/">Try again</a>');
    }
});

app.get('/secured', (req, res) => {
    if (req.session.username) {
        res.sendFile(__dirname + '/public/secured.html');
    } else {
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/secured');
        }
        res.redirect('/');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
