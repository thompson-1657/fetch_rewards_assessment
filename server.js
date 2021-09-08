const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewURLParser: true });

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DB"));

app.use(express.json());
const transactionsRouter = require("./routes/transactions");
app.use("/transactions", transactionsRouter);

app.listen(3000, () => console.log("Server has started"));
