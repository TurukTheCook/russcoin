import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  hash_password: { type: String, required: true },
  created: { type: Date, default: Date.now },
  last_updated: { type: Date, default:Date.now }
});

UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
}

export default mongoose.model('User', UserSchema);