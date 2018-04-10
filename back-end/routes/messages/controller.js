import mongoose from 'mongoose'
import Message from './model'
import User from './../users/model'

export default {
    /*
    *   READ ALL
    */
    readAll(req, res) {
      Message.find({ $or: [{ receiverId: res.locals.user._id }, { receiverId: res.locals.user.username}] }, (err, messages) => {
        if (err) res.status(500).json({success: false, message: err.message})
        else {
          res.status(200).json({ success: true, message: 'Вот ваши сообщения! Here is your messages!', content: messages })
        }
      })
    },
  
    /*
    *   CREATE
    */
    create(req, res) {
      let newMessage = new Message(req.body)
      newMessage.senderId = res.locals.user.username
      newMessage.receiverId = req.body.userID
      newMessage.save( (err, newMessage) => {
        if (err) res.status(500).json({ success: false, message: err.message })
        else res.status(201).json({ success: true, message: 'Сообщение успешно отправлено! Message sent successfuly!' })    
      })
    },

    /*
    *   UPDATE
    */
    update(req, res) {
      Message.findById(req.params.messageID,  (err, message) => {
        if (err) res.status(500).json({ success: false, message: err.message })      
        else if (!message) res.status(404).json({ success: false, message: 'Сообщение не найдено. Message not found.' })
        else {
          if (message.receiverId != res.locals.user._id && message.receiverId != res.locals.user.username) {
            res.status(403).json({ success: false, message: 'CYKA BLYAT !' })          
          } else if (!message.read) {
              // le req.body.read est chelou, il sert pas a grand chose actuellement (il pourrait servir si on peux UNREAD les messages)
              message.read = req.body.read
              message.readDate = req.body.readDate || Date.now()
              message.save( (err, messageUpdated) => {
                // if (err) message tout de même renvoyer
                if (err) res.status(500).json({ success: false, message: err.message, content: messageUpdated })
                else res.status(200).json({ success: true, message: 'Вот ваше сообщение! Here is your message!', content: messageUpdated })
              })
          } else res.status(200).json({ success: true, message: 'Вот ваше сообщение! Here is your message!', content: message })
        }
      })
    }
}