const express = require("express");
const cors = require("cors");
const app = express();
const port = 5100;
//const usersRouter = require("./users");

// Supaya API dapat diakses di domain yang berbeda
app.use(cors());

// Buat ngubah request body yang berupa json ke dalam object
app.use(express.json());

//app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Hello from purchases service! 😁");
});

// Menjalankan server di port
app.listen(port, () => console.log("Server terkoneksi pada port " + port));
