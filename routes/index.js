var express = require("express")
var router = express.Router()

const Bin = require("../models/Bin")
const Item = require("../models/Item")
const async = require("async")

// every route in here starts with '/'
/* GET home page. */
router.get("/", function (req, res, next) {
  async.parallel(
    {
      LargeBin: function (cb) {
        Bin.find({ name: "Large Bin" }).populate('items').exec(cb)
      },
      SmallBin: function (cb) {
        Bin.find({ name: "Small Bin" }).populate('items').exec(cb)
      },
      TrashBin: function (cb) {
        Bin.find({ name: "Trash Bin" }).populate('items').exec(cb)
      }
    },
    (err, binsInDatabase) => {
      if (err) {
        return next(err)
      }

      console.log(binsInDatabase['LargeBin'][0].items)
      res.render("homepage", {
        title: "Inventory Homepage",
        largeBinItems: binsInDatabase['LargeBin'][0].items,
        smallBinItems: binsInDatabase['SmallBin'][0].items,
        trashBinItems: binsInDatabase['TrashBin'][0].items
      })
    }
  )
})

module.exports = router
