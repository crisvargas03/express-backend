const express = require('express');
const cors = require('cors');
const { dbConnetion } = require('./database/config');

require('dotenv').config();

// create express server
const app = express();

// Db
dbConnetion();

// cors
app.use(cors());

app.use(express.static('public'));

app.use(express.json());

// // Routes
// auth -> create, login, renew
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// TODO: CRUD -> Events

// listen request
app.listen(process.env.PORT, () => {
	console.log(`🏃‍➡️ Server Running on port: ${process.env.PORT}`);
});
