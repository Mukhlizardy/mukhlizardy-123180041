// Mengimport package
const express = require("express");
const router = express.Router();
const db1 = require("./config");

// CRUD purchases
router.get("/", async (req, res) => {
  try {
    // Execute query ke database
    const command = "SELECT * FROM purchases";
    const data = await db1.promise().query(command);

    // Mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil daftar users",
      data: data[0],
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});
