const mongoose = require('mongoose')
const { Schema } = mongoose

const BinSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
})

module.exports = mongoose.model("Bin", BinSchema)
