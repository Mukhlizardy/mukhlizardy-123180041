// Mengimport package
const express = require("express");
const db1 = require("./config");

const router = express.Router();

// CRUD purchases
router.get("/", (req, res) => {
  db1.query("SELECT * FROM purchases", (err, results) => {
    if (err) {
      console.error("Error fetching purchases:", err.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
});

// GET purchase by ID
router.get("/:id_purchase", (req, res) => {
  const { id_purchase } = req.params;
  db1.query(
    "SELECT * FROM purchases WHERE id_purchase = ?",
    [id_purchase],
    (err, result) => {
      if (err) {
        console.error("Error fetching purchase:", err.stack);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(result);
    }
  );
});

// POST new purchase
router.post("/", (req, res) => {
  const { id_user, item_name, price } = req.body;
  const query =
    "INSERT INTO purchases (id_user, item_name, price) VALUES (?, ?, ?)";
  db1.query(query, [id_user, item_name, price], (err, result) => {
    if (err) {
      console.error("Error creating purchase:", err.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(201).json({ id_purchase: result.insertId });
  });
});

// PUT update purchase by ID
router.put("/:id_purchase", (req, res) => {
  const { id_purchase } = req.params;
  const { id_user, item_name, price } = req.body;
  const query =
    "UPDATE purchases SET id_user = ?, item_name = ?, price = ? WHERE id_purchase = ?";
  db1.query(query, [id_user, item_name, price, id_purchase], (err, result) => {
    if (err) {
      console.error("Error updating purchase:", err.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json({ message: "Purchase updated" });
  });
});

// DELETE purchase by ID
router.delete("/:id_purchase", (req, res) => {
  const { id_purchase } = req.params;
  db1.query(
    "DELETE FROM purchases WHERE id_purchase = ?",
    [id_purchase],
    (err, result) => {
      if (err) {
        console.error("Error deleting purchase:", err.stack);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({ message: "Purchase deleted" });
    }
  );
});

module.exports = router; // Mengekspor router
