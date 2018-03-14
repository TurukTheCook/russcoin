import express from 'express'
import mongoose from 'mongoose'
import Message from './../../models/Message'
import User from './../../models/User'
const ObjectId = mongoose.Types.ObjectId;

let messages = express.Router();

// Route pour récuperer tous les messages
// On utilise la méthode find() du modèle mongoose 'Message' qui renvoi ici tous les messages
messagesUser.get('/', (req, res) => {
  let _userId = req.anas._id;
  // on verifie que req.params.id est bien de type ObjectId avant de passer à la recherche
  if (ObjectId.isValid(_userId)) {
    // On verifie que l'utilisateur existe
    User.findById(_userId, function (err, user) {
      if (err) res.status(500).json({success: false, message: err.message})
      else {
        // On va chercher tout ses messages
        Message.find({ userId: _userId }, (err, messages) => {
          if (err) res.status(500).json({success: false, message: err.message})
          else res.status(200).json({success: true, message: 'Here is your messages!', content: messages});
        })
      }
    })
  } else {
    res.status(404).json({success: false, message: 'User not found..'})
  }
})



export default messages
