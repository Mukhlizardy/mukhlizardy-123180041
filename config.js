const mysql = require("mysql");

const config = {
  host: "34.31.86.128",
  user: "root",
  password: "4wee11@$",
  database: "electronics_store",
};

const db1 = mysql.createConnection(config);

db1.connect((err) => {
  if (err) throw err;
  console.log("Connected to electronics_store database");
});

module.exports = db1;
