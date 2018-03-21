import mongoose from 'mongoose'

let MessageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type : String, required: true },
  creationDate: { type: Date },
  read: { type: Boolean, default: false },
  readDate: { type: Date },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
});

export default mongoose.model('Message', MessageSchema);