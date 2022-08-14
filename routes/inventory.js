var express = require("express")
var router = express.Router()

const Item = require('../models/Item')

const itemController = require('../controllers/itemController')


// every route will start with /inventory

router.get("/newItem/:bin", itemController.add_item_get)

router.post("/newItem", itemController.add_item_post)


router.post('/update/', itemController.update_item_post) 
router.get('/update/:id', itemController.update_item_get)


module.exports = router
