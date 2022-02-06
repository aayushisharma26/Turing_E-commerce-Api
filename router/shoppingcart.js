const express=require("express")

const router = express.Router()

const user = require("../controller/shoppingcart")


router.get("/shopping_uniqueId",user.shopping_uniqueId)





module.exports = router