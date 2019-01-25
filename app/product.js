const express = require("express");
const router = express.Router();
const fileDb = require("../fileDb");


const createRouter = ()=>{
    router.get("/",(req,res)=>{
        res.send(fileDb.getData(req.params.date));
    });
    router.post("/",(req,res)=>{
        const product =req.body;
        if(product.name.length > 0 && product.description.length > 0 && product.price !== null){
            fileDb.addProduct(product).then(result=>{
                res.send(result);
            })
        }else{
            res.send({message: "Error"});
        }
    });

    return router;
};

module.exports = createRouter;