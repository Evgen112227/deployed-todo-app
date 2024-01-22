const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
	user: process.env.usernamee,
	password: process.env.password,
	host: process.env.host,
	port: process.env.port,
	database: 'todoapp',
});

module.exports = pool;
