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
        res.send(fileDb.getData());
    });

    router.post("/",upload.single("image"),(req,res)=>{
        const product =req.body;
        if(req.body.id === "" || req.body.id === undefined){
            if (req.file) product.image = req.file.filename;
            if(product.name.length > 0 && product.description.length > 0 && product.price !== null){
                fileDb.addProduct(product).then(result=>{
                    res.send(result);
                })
            }else{
                res.send({message: "Error"});
            }
        }else {
            fileDb.ChangeProduct(product);
        }
    });

    return router;
};

module.exports = createRouter;