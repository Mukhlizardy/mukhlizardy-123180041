const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const upload = multer();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());

const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const db = mysql.createConnection({
  host: "34.31.86.128",
  user: "root",
  password: "4wee11@$",
  database: "electronics_store",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.stack);
    return;
  }
  console.log("Connected to electronics_store database");
});

app.get("/", (req, res) => {
  res.send("Hello from users service! 😁");
});

// CRUD Users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error fetching users:", err.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
});

app.get("/users/:id_user", (req, res) => {
  const { id_user } = req.params;
  db.query(
    "SELECT * FROM users WHERE id_user = ?",
    [id_user],
    (err, result) => {
      if (err) {
        console.error("Error fetching user:", err.stack);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(result);
    }
  );
});

app.post("/users", (req, res) => {
  const { username, email } = req.body;
  const query = "INSERT INTO users (username, email) VALUES (?, ?)";
  db.query(query, [username, email], (err, result) => {
    if (err) {
      console.error("Error creating user:", err.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(201).json({ id_user: result.insertId });
  });
});

app.put("/users/:id_user", (req, res) => {
  const { id_user } = req.params;
  const { username, email } = req.body;
  const query = "UPDATE users SET username = ?, email = ? WHERE id_user = ?";
  db.query(query, [username, email, id_user], (err, result) => {
    if (err) {
      console.error("Error updating user:", err.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json({ message: "User updated" });
  });
});

app.delete("/users/:id_user", (req, res) => {
  const { id_user } = req.params;
  db.query("DELETE FROM users WHERE id_user = ?", [id_user], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json({ message: "User deleted" });
  });
});
