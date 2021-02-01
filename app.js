const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const express = require('express')

//app
const app = express()

//routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order")

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 
const expressValidator = require('express-validator');

//const path = require('path')
//require('dotenv').config({ path: path.resolve(__dirname, '.env') })

//Connection with db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log("Status: Conectado; Estabilida: ok"));

//middlewares

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})