const mysql = require('mysql');

//local mysql db connection
const connection = mysql.createConnection({
    host     : '10.101.130.161',
    user     : 'root',
    password : 'root',
    database : 'micro_service_tbl'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;