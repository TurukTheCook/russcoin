import mongoose from 'mongoose'

export default mongoose.model('Products', new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    creationDate: { type: Date, default: Date.now },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    picture: { type: [String]},
    userId: { type: String, required: true },
    address: {
        country: String,
        region: String,
        city: String,
        street: String,
        longitude: Number,
        latitude: Number
      }
}))