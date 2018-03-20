import mongoose from 'mongoose'

let MessageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type : String, required: true },
  userID: { type: String, required: true }
});

export default mongoose.model('Message', MessageSchema);