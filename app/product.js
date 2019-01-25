const express = require("express");
const multer = require("multer");
const path = require("path");

const fileDb = require("../fileDb");
const config = require("../config");

const  storage = multer.diskStorage({
    destination(req,file,cd){
        cd(null, config.uploadPath)
    },
    filename(req,file,cd){
        cd(null,nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});
const router = express.Router();

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