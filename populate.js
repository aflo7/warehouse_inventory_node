const Bin = require("./models/Bin")
const Item = require("./models/Item")
const mongoose = require("mongoose")

const async = require("async")
require("dotenv").config()

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// var db = mongoose.connection
// db.on("error", console.error.bind(console, "MongoDB connection error:"))

function createBins() {
  const LargeBin = new Bin({
    name: "Large Bin",
    color: "green"
  })

  const SmallBin = new Bin({
    name: "Small Bin",
    color: "blue"
  })

  const TrashBin = new Bin({
    name: "Trash Bin",
    color: "red"
  })

  async.parallel(
    {
      LargeBin: function (cb) {
        LargeBin.save(cb)
      },
      SmallBin: function (cb) {
        SmallBin.save(cb)
      },
      TrashBin: function (cb) {
        TrashBin.save(cb)
      }
    },
    function (err, result) {
      if (err) {
        return console.error(err)
      }

      console.log("success")
    }
  )
}

const itemOne = new Item({
  name: "Camera",
  serialNumber: "000000000",
  quantity: 25
})

const itemTwo = new Item({
  name: "Speaker",
  serialNumber: "000000001",
  quantity: 21
})

const itemThree = new Item({
  name: "Transistor",
  serialNumber: "000000002",
  quantity: 900
})

const itemFour = new Item({
  name: "Screen",
  serialNumber: "000000003",
  quantity: 40
})

const itemFive = new Item({
  name: "Home_Button",
  serialNumber: "000000004",
  quantity: 40
})

const itemSix = new Item({
  name: "Volume_Up_Button",
  serialNumber: "000000005",
  quantity: 50
})

function createItems() {
  async.parallel(
    {
      1: function (cb) {
        itemOne.save(cb)
      },
      2: function (cb) {
        itemTwo.save(cb)
      },
      3: function (cb) {
        itemThree.save(cb)
      },
      4: function (cb) {
        itemFour.save(cb)
      },
      5: function (cb) {
        itemFive.save(cb)
      },
      6: function (cb) {
        itemSix.save(cb)
      }
    },
    function (err, result) {
      if (err) {
        return console.error(err)
      }
      console.log("created items successfully")
    }
  )
}

function addToBin() {
  Item.find({}, function (err, itemsFound) {
    if (err) {
      return console.error(err)
    }
    console.log(itemsFound)

    Bin.findOneAndUpdate(
      { name: "Small Bin" },
      { $push: { items: {$each: [itemsFound[0]._id, itemsFound[1]._id]} } },
      (err, result) => {
        if (err) {
          console.log(err)
        }
      }
    )

    Bin.findOneAndUpdate(
      { name: "Large Bin" },
      { $push: { items: {$each: [itemsFound[2]._id, itemsFound[3]._id]} } },
      (err, result) => {
        if (err) {
          console.log(err)
        }
      }
    )

    Bin.findOneAndUpdate(
      { name: "Trash Bin" },
      { $push: { items: {$each: [itemsFound[4]._id, itemsFound[5]._id]} } },
      (err, result) => {
        if (err) {
          console.log(err)
        }
      }
    )
  })
}

// createBins()
// createItems()
// addToBin()
