const environment=process.env.ENVIRONMENT || 'development'
const config=require('../knexfile')[environment]
const knex=require("knex")(config)
const jwt = require("jsonwebtoken");
const express=require("express")
const bodyParser=require("body-parser")
const bcrypt=require("bcrypt")
var app = express();
app.use(express.json());
app.use(bodyParser.json());


customers_signup = (req, res) => {
    const user = req.body;
        knex("customer").insert({
                name:user.name,
                email: user.email,
                password: user.password
            })
            .then((result) => {
                console.log(result)
                res.send({ sucess: "signup sucessfully" })
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({ error: err })
                }
            })
}


customers_login = (req, res) => {
    const user = req.body;
    knex.from("customer").select("*").where("email", user.email)
        .then((data) => {
            if (data.length !== 0) {
                var email = req.body.email;
                var password = req.body.password;
                var log_token = jwt.sign({ email, password }, "customer", {
                    expiresIn: "2h"
                });
                res.send({
                    data,
                    access_token:log_token
                });
            } else {
                res.status(400).json({
                    message: "failed"
                });
            }
        })
}


get_signup=(req,res)=>{
    knex.from("customer").select("*")
    .then((row) =>{
        res.send(row)
    })
    .catch((err)=>{
        res.json({
            message:err
        })
    })  
}


put_customers=(req,res)=>{
    user=req.data
    console.log(user)
    knex.from("customer").where({email:user.email}).update(
        {
            "name":req.body.name,
            "email":req.body.email,
            "password":req.body.password
            ,"day_phone":req.body.day_phone
            ,"eve_phone":req.body.eve_phone
            ,"mob_phone":req.body.mob_phone
        })
        .then((result)=>{
            res.send("data updated")
        })
        .catch((err)=>{
            res.send(err)
        })
   

}


put_customer_address=(req,res)=>{
    add_token=req.data
    console.log(add_token)
    knex.from("customer").where({email:add_token.email}).update(
        {
            "address_1":req.body.address_1,
            "address_2":req.body.address_2,
            "city":req.body.city,
            "region ":req.body.region ,
            "postal_code":req.body.postal_code,
            "country":req.body.country,
            "shipping_region_id":req.body.shipping_region_id
        })
        .then((result)=>{
            res.send("data update")
        })
        .catch((err)=>{
            res.send(err)
        })
    
}


put_credit_card=(req,res)=>{
    credit_token=req.data
    console.log(credit_token)
    knex.from("customer").where({email:credit_token.email}).update(
        {
            "credit_card":req.body.credit_card
        })
        .then((result)=>{
            console.log(result)

            res.send("data update")
        })
        .catch((err)=>{
            res.send(err)
        })
    
} 

module.exports={customers_signup,customers_login,get_signup,put_customers,put_customer_address,put_credit_card}