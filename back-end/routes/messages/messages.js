import express from 'express'
import mongoose from 'mongoose'
import Message from './model'
import User from './../users/model'
const ObjectId = mongoose.Types.ObjectId;

let router = express.Router();

router.get('/', (req, res) => {
  Message.find({ $or: [{ receiverId: res.locals.user._id }, { receiverId: res.locals.user.username}] }, (err, messages) => {
    if (err) res.status(500).json({success: false, message: err.message})
    else {
      res.status(200).json({ success: true, message: 'Вот ваши сообщения! Here is your messages!', content: messages })
    }
  })
})

router.post('/', (req, res) => {
  let newMessage = new Message(req.body)
  newMessage.senderId = res.locals.user.username
  newMessage.receiverId = req.body.userID
  newMessage.save(function (err, newMessage) {
    
  })
})

router.post('/OLD', (req, res) => {
  if (req.body.userID && req.body.title && req.body.content) {
    var sendMessage = function (err) {
      if (err) res.status(500).json({ success: false, message: err.message })
      else {
        let newMessage = new Message(req.body)
        newMessage.senderId = res.locals.user.username
        newMessage.receiverId = req.body.userID
        newMessage.save(function (err, newMessage) {
          if (err) res.status(500).json({ success: false, message: err.message })
          else res.status(201).json({ success: true, message: 'Сообщение успешно отправлено! Message sent successfuly!' })
        })
      }
    }
    if (ObjectId.isValid(req.body.userID)) {
      User.find({ _id: req.body.userID }, function (err, user) {
        sendMessage(err)
      })
    } else {
      User.find({ username: req.body.userID }, function (err, user) {
        sendMessage(err)
      })
    }
  } else res.status(400).json({ success: false, message: 'Отсутствуют данные. Data is missing..'})
})

// router.put('/:OLDmessageID', (req, res) => {
//   // a quoi sert ce if/else ?
//   if (req.body && (req.body.read != null || req.body.read != undefined) && req.body.readDate) {
//     // 
//   } else res.status(412).json({ success: false, message: 'Отсутствуют данные. Data is missing.' })
// })

router.put('/:messageID', (req, res) => {
  if (ObjectId.isValid(req.params.messageID)) {
    Message.findById(req.params.messageID, function (err, message) {
      if (err) res.status(500).json({ success: false, message: err.message })      
      if (!message) res.status(404).json({ success: false, message: 'Сообщение не найдено. Message not found.' })
      else {
        if (message.receiverId != res.locals.user._id || message.receiverId != res.locals.user.username) {
          res.status(403).json({ success: false, message: 'CYKA BLYAT !' })          
        } else {
          if (!message.read) {
            // le req.body.read est chelou, il sert pas a grand chose actuellement (il pourrait servir si on peux UNREAD les messages)
            message.read = req.body.read
            message.readDate = req.body.readDate || Date.now()
            message.save(function (err, messageUpdated) {
              // if (err) message tout de même renvoyer
              if (err) res.status(500).json({ success: false, message: err.message, content: messageUpdated })
              else res.status(200).json({ success: true, message: 'Вот ваше сообщение! Here is your message!', content: messageUpdated })
            })
          } else res.status(200).json({ success: true, message: 'Вот ваше сообщение! Here is your message!', content: message })
        }
      }
    })
  } else res.status(400).json({ success: false, message: 'Неверный ID. Invalid ID' })
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
