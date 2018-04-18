import mongoose from 'mongoose'

let ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  picture: { type: String },
  userId: { type: String, required: true },
  address: {
    country: String,
    region: String,
    city: String,
    street: String,
    longitude: Number,
    latitude: Number
  },
  creationDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  // id pour respecter la spec, fuck la spec :'(
  id: mongoose.Schema.Types.Mixed  
})

export default mongoose.model('Product', ProductSchema);