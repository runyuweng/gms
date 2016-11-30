var mysql      = require('mysql');
var connection = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : '0000',
  database: 'gpm',
  port:3306
});

module.exports = connection;


// connection.connect();

// connection.query('SELECT * AS student', function(err, rows, fields) {
//   if (err) throw err;
//   console.log(rows);
// });

// connection.end();