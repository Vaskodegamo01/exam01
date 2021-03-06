const express = require("express");
const port = 3333;
const cors = require("cors");
const product = require("./app/product");
const fileDb = require("./fileDb");

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

fileDb.init().then(()=>{
    console.log("Database was loaded");

    app.use("/product", product());

    app.listen(port, ()=>{
        console.log("Server on port 3333");
    })
});

