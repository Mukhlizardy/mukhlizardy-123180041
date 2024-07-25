const express = require("express");
const cors = require("cors");
const purchasesRouter = require("./purchases"); // Mengimpor purchases router

const app = express();
const port = 5100;

// Supaya API dapat diakses di domain yang berbeda
app.use(cors());

// Buat ngubah request body yang berupa json ke dalam object
app.use(express.json());

// Menambahkan router untuk purchases
app.use("/purchases", purchasesRouter);

app.get("/", (req, res) => {
  res.send("Hello from purchases service! 😁");
});

// Menjalankan server di port
app.listen(port, () => console.log("Server terkoneksi pada port " + port));
