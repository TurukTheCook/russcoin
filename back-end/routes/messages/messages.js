import express from 'express'
import mongoose from 'mongoose'
import Message from './model'
import User from './../users/model'
const ObjectId = mongoose.Types.ObjectId;

let router = express.Router();

// Route pour récuperer tous les messages
// Utilisation la méthode find() du modèle mongoose 'Message' qui renvoi ici tous les messages
router.get('/', (req, res) => {
  let _userID = req.anas._id;
  let _username = req.anas.username;
  // Verif que req.params.id est bien de type ObjectId avant de passer à la recherche
  if (ObjectId.isValid(_userID)) {
    // Verif que l'utilisateur existe
    User.findById(_userID, function (err, user) {
      if (!user) {
        res.status(404).json({ success: false, message: 'Пользователь не найден. User not found..' })
      } else {
        if (err) res.status(500).json({success: false, message: err.message})
        else {
          // Trouver tout ses messages
          Message.find({ $or: [{ receiverId: _userID }, { receiverId: _username}] }, (err, messages) => {
            if (err) res.status(500).json({success: false, message: err.message})
            else {
              res.status(200).json({ success: true, message: 'Вот ваши сообщения! Here is your messages!', content: messages })
            }
          })
        }
      }
    })
  } else {
    res.status(404).json({ success: false, message: 'Неверный ID. Invalid ID' })
  }
})

// Route pour poster un message
router.post('/', (req, res) => {
  let _userID = req.anas.username;
  let _body = req.body;
  if (_body && _body.userID && _body.title && _body.content) {
    var sendMessage = function (err) {
      if (err) res.status(500).json({ success: false, message: err.message })
      else {
        let newMessage = new Message(req.body);
        newMessage.senderId = _userID
        newMessage.receiverId = _body.userID
        newMessage.save(function (err, newMessage) {
          if (err) {
            res.status(500).json({ success: false, message: err.message })
          } else {
            res.status(200).json({ success: true, message: 'Сообщение успешно отправлено! Message sent successfuly!' })
          }
        })
      }
    }
    if (ObjectId.isValid(_body.userID)) {
      User.find({ _id: _body.userID }, function (err, user) {
        sendMessage(err)
      })
    } else {
      User.find({ username: _body.userID }, function (err, user) {
        sendMessage(err)
      })
    }
  } else {
    res.status(412).json({ success: false, message: 'Отсутствуют данные. Data is missing..'})
  }
})

//Route pour update un message, on trouve le message avec findById puis on l'edit&save
router.put('/:messageID', (req, res) => {
  if (req.body && (req.body.read != null || req.body.read != undefined) && req.body.readDate) {
    if (ObjectId.isValid(req.params.messageID)) {
      Message.findById(req.params.messageID, function (err, message) {
        if (!message) {
          res.status(404).json({ success: false, message: 'Сообщение не найдено.. Message not found..' })
        } else {
          if (err) res.status(500).json({ success: false, message: err.message })
          if (message.receiverId != req.anas._id && message.receiverId != req.anas.username) {
            res.status(403).json({ success: false, message: 'CYKA BLYAT !' })
          } else {
            if (!message.read) {
              message.read = req.body.read
              message.readDate = req.body.readDate
              message.save(function (err, result) {
                if (err) res.status(500).json({ success: false, message: err.message, content: message })
                res.status(200).json({ success: true, message: 'Вот ваше сообщение! Here is your message!', content: message })
              });
            } else {
              res.status(200).json({ success: true, message: 'Вот ваше сообщение! Here is your message!', content: message })
            }
          }
        }
      })
    } else {
      res.status(404).json({ success: false, message: 'Неверный ID. Invalid ID' })
    }
  } else {
    res.status(412).json({ success: false, message: 'Отсутствуют данные. Data is missing..' })
  }
})

// Route pour delete un message, on utilise la méthode remove() du modele mongoose ezpz
// router.delete('/:id', (req, res) => {
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


export default router
