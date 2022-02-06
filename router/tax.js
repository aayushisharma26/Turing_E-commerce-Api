const express=require("express")

const router = express.Router()

const user = require("../controller/tax")



router.get("/tax",user.tax)

router.get("/tax/:tax_id",user.tax_id)

// router.get("/shipping/region/:shipping_id",shipping.shipping_region_id)




module.exports = router
