const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const multer = require("multer");
const upload = multer();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Middleware untuk mendukung x-www-form-urlencoded
app.use(upload.array());

const db = mysql.createConnection({
  host: "34.101.175.252",
  user: "root",
  password: "4wee11@$",
  database: "electronics_store",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to electronics_store database");
});

// CRUD Users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/users/:id_user", (req, res) => {
  const { id_user } = req.params;
  db.query(
    "SELECT * FROM users WHERE id_user = ?",
    [id_user],
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.post("/users", (req, res) => {
  const { username, email } = req.body;
  const query = "INSERT INTO users (username, email) VALUES (?, ?)";
  db.query(query, [username, email], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id_user: result.insertId });
  });
});

app.put("/users/:id_user", (req, res) => {
  const { id_user } = req.params;
  const { username, email } = req.body;
  const query = "UPDATE users SET username = ?, email = ? WHERE id_user = ?";
  db.query(query, [username, email, id_user], (err, result) => {
    if (err) throw err;
    res.json({ message: "User updated" });
  });
});

app.delete("/users/:id_user", (req, res) => {
  const { id_user } = req.params;
  db.query("DELETE FROM users WHERE id_user = ?", [id_user], (err, result) => {
    if (err) throw err;
    res.json({ message: "User deleted" });
  });
});

// CRUD Purchases
app.get("/purchases", (req, res) => {
  db.query("SELECT * FROM purchases", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/purchases/:id_purchase", (req, res) => {
  const { id_purchase } = req.params;
  db.query(
    "SELECT * FROM purchases WHERE id_purchase = ?",
    [id_purchase],
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.post("/purchases", (req, res) => {
  const { id_user, item_name, price } = req.body;
  const query =
    "INSERT INTO purchases (id_user, item_name, price) VALUES (?, ?, ?)";
  db.query(query, [id_user, item_name, price], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id_purchase: result.insertId });
  });
});

app.put("/purchases/:id_purchase", (req, res) => {
  const { id_purchase } = req.params;
  const { id_user, item_name, price } = req.body;
  const query =
    "UPDATE purchases SET id_user = ?, item_name = ?, price = ? WHERE id_purchase = ?";
  db.query(query, [id_user, item_name, price, id_purchase], (err, result) => {
    if (err) throw err;
    res.json({ message: "Purchase updated" });
  });
});

app.delete("/purchases/:id_purchase", (req, res) => {
  const { id_purchase } = req.params;
  db.query(
    "DELETE FROM purchases WHERE id_purchase = ?",
    [id_purchase],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Purchase deleted" });
    }
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Electronics store service running on port ${PORT}`);
});
