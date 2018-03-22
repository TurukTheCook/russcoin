import mongoose from 'mongoose'

let MessageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type : String, required: true },
  creationDate: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  readDate: { type: Date },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
});

export default mongoose.model('Message', MessageSchema);