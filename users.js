// Mengimport package
const express = require("express");
const db = require("./config");

const router = express.Router();

// CRUD users

// GET all users
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error fetching users:", err.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
});

// GET user by ID
router.get("/:id_user", (req, res) => {
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

// POST new user
router.post("/", (req, res) => {
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

// PUT update user by ID
router.put("/:id_user", (req, res) => {
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

// DELETE user by ID
router.delete("/:id_user", (req, res) => {
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

module.exports = router; // Mengekspor router
