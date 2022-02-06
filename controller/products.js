const express = require("express");
const bodyParser = require("body-parser");
const knex = require('knex')
const connection = require("../knexfile");
const { query } = require("express");
const knexcon = knex(connection["development"])
var app = express();
app.use(express.json());
app.use(bodyParser.json());


products = (req, res) => {
    knexcon.select("*").from("product").
    then((result) => {
            console.log(result)
            if (req.query.page == undefined) {
                req.query.page = 1
            }
            if (req.query.limit == undefined) {
                req.query.limit = 20
            }
            knexcon("product").count("product_id")
                .then((count) => {
                    knexcon.select("*").from("product").offset((req.query.page - 1) * req.query.limit).limit(req.query.limit)
                        .then((data) => {
                            for (i in data) {
                                if (req.query.description_length != undefined) {
                                    data[i]["description"] = data[i]["description"].slice(0, data[i]["description"].length - (data[i]["description"].length - req.query.description_length))
                                } else {
                                    data[i]["description"] = data[i]["description"]
                                }
                            }
                            res.send({
                                count: count[0]['count(`product_id`)'],
                                rows: data
                            })
                        })
                        .catch((err) => {
                            res.send(err)
                        })
                })
        })
        .catch((err) => {
            res.send(err)
        })
}




products_by_product_id=(req,res)=>{
    knexcon("product")
    .select("*")
    .where("product_id",req.params.product_id)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })
}

//wrong
// products_by_category_id = (req, res) => {
//     var des = req.description_length;
//     knexcon.select("product.product_id", "product.name", "product.description", "product.price", "product.discounted_price", "product.thumbnail").from("product")
//         .join("product_category", function() {
//             this.on("product.product_id", "product_category.product_id")
//         }).where("product_category.category_id", req.params.category_id).limit(req.query.limit).offset((req.query.page - 1) * req.query.limit)
//         .then((data) => {
//             res.send({ counts: data.length, rows: data })
//         })
// }












module.exports={products,products_by_product_id}