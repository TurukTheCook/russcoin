import mongoose from 'mongoose'

export default mongoose.model('Message', new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  readDate: { type: Date },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
}))