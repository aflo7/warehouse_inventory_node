const mongoose = require('mongoose')
const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: {type: String, required: true},
  serialNumber: {type: String, required: true},
  quantity: {type: Number, required: true}
})

ItemSchema.virtual('update').get(function () {
  return "/inventory/update/" + this._id
})

module.exports = mongoose.model("Item", ItemSchema)
