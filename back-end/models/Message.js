import mongoose from 'mongoose'

let MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

export default mongoose.model('Message', MessageSchema);