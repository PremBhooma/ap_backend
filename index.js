const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const { connection } = require('./config/db');

require('dotenv').config();


const adminRouter = require("./routes/Admin.routes");
const categoryRouter = require("./routes/Category.routes");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.use("/api/admin", adminRouter);
app.use("/api/category", categoryRouter);

app.get("/", (req, res) => {
    res.send("API is running");
})

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
    try {
        await connection
        console.log("DB Connected Sucessfully")
    } catch (err) {
        console.log("DB Failed to Connect")
        console.log(err)
    }
    console.log(`Listening on ${PORT} Port`)
})