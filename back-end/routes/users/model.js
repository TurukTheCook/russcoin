import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hash_password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  address: {
    country: String,
    region: String,
    city: String,
    street: String,
    longitude: Number,
    latitude: Number
  },
  creationDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default:Date.now },
  // id pour respecter la spec, fuck la spec :'(
  id: mongoose.Schema.Types.Mixed
});

UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
}

export default mongoose.model('User', UserSchema);