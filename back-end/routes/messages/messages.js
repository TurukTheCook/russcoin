import express from 'express'
import mongoose from 'mongoose'
import Message from './../../models/Message'
import User from './../../models/User'
const ObjectId = mongoose.Types.ObjectId;

let messages = express.Router();

let exit = (res, messages) => {
  res.status(200).json({ success: true, message: 'Here is your messages!', content: messages })
};
// Route pour récuperer tous les messages
// Utilisation la méthode find() du modèle mongoose 'Message' qui renvoi ici tous les messages
messages.get('/', (req, res) => {
  let _userId = req.anas._id;
  let _username = req.anas.username;
  // Verif que req.params.id est bien de type ObjectId avant de passer à la recherche
  if (ObjectId.isValid(_userId)) {
    // Verif que l'utilisateur existe
    User.findById(_userId, function (err, user) {
      if (err) res.status(500).json({success: false, message: err.message})
      else {
        // Trouver tout ses messages
        Message.find({ $or: [{ receiverId: _userId }, { receiverId: _username}] }, (err, messages) => {
          if (err) res.status(500).json({success: false, message: err.message})
          else {
            // res.status(200).json({ success: true, message: 'Here is your messages!', content: messages })
            // Update les propriétés READ et READDATE
            if (messages[0]) {
              let done = 0;
              for (let i = 0; i < messages.length; i++) {
                messages[i].read = true
                if (!messages[i].readDate) messages[i].readDate = Date.now()
                messages[i].save(function (err, result) {
                  if (err) res.status(500).json({ success: false, message: err.message })
                  else {
                    done++
                    if (done === messages.length) {
                      exit(res, messages)
                    }
                  }
                });
              }
            } else {
              res.status(200).json({ success: true, message: 'Here is your messages!', content: messages })
            }
          }
        })
      }
    })
  } else {
    res.status(404).json({ success: false, message: 'Пользователь не найден.<br/>User not found..'})
  }
})

// Route pour poster un message
messages.post('/', (req, res) => {
  let _userId = req.anas._id;
  let _body = req.body;
  if (_body && _body.username && _body.title && _body.content) {
    // A RETEST PLUS TARD
    // if (_body['username'].length > 12) {
    //   var newObjectId = new ObjectId(_body.username);
    // } else {
    //   var newObjectId = null;
    // }
    // console.log(newObjectId);
    // User.find({ $or: [{ _id: newObjectId }, { username: _body.username }] }
    if (ObjectId.isValid(_body.username)) {
      User.find({ _id: _body.username }, function (err, user) {
        if (err) res.status(500).json({ success: false, message: err.message })
        else {
          let newMessage = new Message(req.body);
          newMessage.senderId = _userId;
          newMessage.receiverId = _body.username;
          newMessage.save(function (err, newMessage) {
            if (err) {
              res.status(500).json({ success: false, message: err.message })
            } else {
              res.status(200).json({ success: true, message: 'Message sent successfuly!' })
            }
          })
        }
      })
    } else {
      User.find({ username: _body.username }, function (err, user) {
        if (err) res.status(500).json({ success: false, message: err.message })
        else {
          let newMessage = new Message(req.body);
          newMessage.senderId = _userId;
          newMessage.receiverId = _body.username;
          newMessage.save(function (err, newMessage) {
            if (err) {
              res.status(500).json({ success: false, message: err.message })
            } else {
              res.status(200).json({ success: true, message: 'Message sent successfuly!' })
            }
          })
        }
      })
    }
  } else {
    res.status(412).json({ success: false, message: 'Some data is missing..'})
  }
})

// Route pour update un message, on trouve le message avec findById puis on l'edit&save
// messages.put('/:id', (req, res) => {
//   if (req.body && req.body.message) {
//     if (ObjectId.isValid(req.params.id)) {
//       Message.findById(req.params.id, function (err, message) {
//         if (err) res.status(500).json({ success: false, message: err.message })
//         else {
//           message.message = req.body.message;
//           message.save(function (err, updatedMessage) {
//             if (err) {
//               res.status(500).json({ success: false, message: err.message })
//             } else {
//               res.status(200).json({ success: true, message: 'Message updated!', content: updatedMessage })
//             }
//           })
//         }
//       })
//     } else {
//       res.status(404).json({ success: false, message: 'Message not found..' })
//     }
//   } else {
//     res.status(400).json({ success: false, message: 'Data is missing..' })
//   }
// })

// Route pour delete un message, on utilise la méthode remove() du modele mongoose ezpz
// messages.delete('/:id', (req, res) => {
//   if (ObjectId.isValid(req.params.id)) {
//     Message.findById(req.params.id, function (err, message) {
//       if (err) {
//         res.status(500).json({ success: false, message: err.message })
//       } else if (!message) {
//         res.status(404).json({ success: false, message: 'Message not found..' })
//       } else {
//         Message.remove({ _id: req.params.id }, function (err) {
//           if (err) res.status(500).json({ success: false, message: err.message })
//           else {
//             res.status(200).json({ success: true, message: 'The message has been deleted!' })
//           }
//         })
//       }
//     })
//   } else {
//     res.status(404).json({ success: false, message: 'message not found..' })
//   }
// })


export default messages
