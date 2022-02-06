const environment=process.env.ENVIRONMENT || 'development'
const config=require('../knexfile')[environment]
const knex=require("knex")(config)
const crypto = require('crypto');
const bodyParser=require("body-parser")
const express=require("express")
var app = express();
app.use(express.json());
app.use(bodyParser.json());


shopping_uniqueId=(req,res)=>{
    const generateUuid = () => {
        return [4, 2, 2, 2, 6] 
            .map(group => crypto.randomBytes(group).toString('hex'))
            .join('-');
    };
    cart_id = generateUuid();
    res.send({cart_id:cart_id}); 
}

module.exports={shopping_uniqueId}