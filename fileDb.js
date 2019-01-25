const fs = require("fs");
const nanoid = require("nanoid");

let data = null;

module.exports = {
    init: ()=>{
        return new Promise((resolve,reject)=>{
            fs.readFile("./product.json", (err,result)=>{
                if(err){
                    reject();
                }else{
                    data = JSON.parse(result);
                    resolve();
                }
            })
        })
    },
    getData: ()=>data,
    addProduct:(product) =>{
        product.id = nanoid(8);
        product.date = new Date().toISOString();
        data.push(product);

        let contents = JSON.stringify(data, null, 2);

        return new Promise((resolve,reject)=>{
            fs.writeFile("./product.json", contents, err=>{
                if(err){
                    reject();
                }else{
                    resolve(product);
                }
            })
        })
    },
    ChangeProduct:(product) => {
        const id = data.findIndex(data1 => data1.id === product.id);
        data[id].name = product.name;
        data[id].description = product.description;
        data[id].price = product.price;
        let contents = JSON.stringify(data, null, 2);
        return new Promise((resolve,reject)=>{
            fs.writeFile("./product.json", contents, err=>{
                if(err){
                    reject();
                }else{
                    resolve(product);
                }
            })
        })
    }
};