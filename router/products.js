const express=require("express")

const router = express.Router()

const user= require("../controller/products")



router.get("/products",user.products)

// router.get("/products_by_products_id",user.products_by_products_id)

router.get("/products/:product_id",user.products_by_product_id)

// router.get("/products/inCategory/:category_id",user.products_by_product_id)

// router.get('/attribute/inProduct/:product_id',attribute.attribute_by_product_id)


// router.get("/attribute/:attribute_id",attribute.attribute_id)

module.exports = router


