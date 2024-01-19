const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()
const authRoute = require("./routes/auth.route")
const fileRoute = require("./routes/file.route");
const app = express()

app.use(cors())
app.use(express.json());
app.use('/api/auth', authRoute)
app.use('/api/files',fileRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    try {
        mongoose.connect("mongodb://localhost:27017/localData");
        console.log(`server is running on port ${PORT}`)
    } catch (err) {
        console.log('something went wrong')
    }
})
