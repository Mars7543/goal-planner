// import dependencies
const express       = require('express');
const bodyParser    = require('body-parser');

const path          = require('path');
const cors          = require('cors');

const mongoose      = require('mongoose');
const config        = require('./config');

const server        = express();
const port          = process.env.PORT || 8000;

// db config
mongoose.connect(config.db.local);
mongoose.connection
    .on('connected', () => console.log(`Connected to db: ${config.db.local}`))
    .on('error', (err) => console.log(`DB Error: ${err}`));

// serve the public directory
server.use(express.static(path.join(__dirname, '/public')));

// enable cross origin requests (for testing)
server.use(cors());

// use body parser 
server.use(bodyParser.json());

// render the main index.html
server.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// run server
server.listen('8000', _ => console.log(`Server running on port ${port}...`));