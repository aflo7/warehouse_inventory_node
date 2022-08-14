const Item = require("../models/Item")
const Bin = require("../models/Bin")

// load the form to create a new item
exports.add_item_get = function (req, res, next) {
  res.render("newItemForm", { title: "New Item", bin: req.params.bin })
}
// save the item from FORM to the database
// also add the item to the bin it belongs to
exports.add_item_post = function (req, res, next) {
  var bin = null

  if (req.body.bin == "large") {
    bin = "Large Bin"
  } else if (req.body.bin == "small") {
    bin = "Small Bin"
  } else if (req.body.bin == "trash") {
    bin = "Trash Bin"
  }

  newItem = new Item({
    name: req.body.name,
    serialNumber: req.body.serial,
    quantity: req.body.quantity
  })

  newItem.save((err, savedItem) => {
    if (err) {
      return next(err)
    }

    Bin.findOneAndUpdate(
      { name: bin },
      { $push: { items: savedItem.id } },
      (err, result) => {
        if (err) {
          return next(err)
        }

        res.redirect("/")
      }
    )
  })
}
// should delete item, and remove from the BIN array that it's currently in
exports.deleteItem = function (req, res, next) {}

// get the form to update an item. it should be prepopulated with the current items info
exports.update_item_get = function (req, res, next) {
  Item.findById(req.params.id, (err, itemFound) => {
    if (err) {
      return next(err)
    }
    console.log("hello!")
    console.log(itemFound)

    res.render("updateItemForm", {
      title: "Update Item",
      itemName: itemFound.name,
      itemSerial: itemFound.serialNumber,
      itemQuantity: itemFound.quantity,
      itemID: req.params.id
    })
  })
}

exports.update_item_post = function (req, res, next) {
  Item.findById(req.body.itemID, async (err, result) => {
    if (err) {
      return next(err)
    }
    if (!result) {
      return next(err)
    }
    result.name = req.body.name
    result.serialNumber = req.body.serial
    result.quantity = req.body.quantity
    result.save()
    res.redirect('/')
  })
  
}
