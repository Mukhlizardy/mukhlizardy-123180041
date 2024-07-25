// Mengimport package
const express = require("express");
const db1 = require("./config");

const router = express.Router();

// CRUD purchases
router.get("/", (req, res) => {
  // Menggunakan root path untuk router ini
  db1.query("SELECT * FROM purchases", (err, results) => {
    if (err) {
      console.error("Error fetching purchases:", err.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
});

module.exports = router; // Mengekspor router
