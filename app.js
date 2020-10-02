const express = require('express')

//app
const app = express()

//routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");


const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Ainda não foi baixado este pacote npm i cors
const expressValidator = require('express-validator');
require('dotenv').config()

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(()=> console.log("DB Connected"));

    //middlewares

    app.use(morgan("dev"));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(expressValition());
    app.use(cors());

    //routes middleware
    app.use("/api", authRoutes);
    app.use("/api", userRoutes);
    app.use("/api", categoryRoutes);
    app.use("/api", productRoutes);

    const port = process.env.PORT || 8000;

    app.listen(port, ()=>{
        console.log(`Server is running on port: ${port}`)
    })