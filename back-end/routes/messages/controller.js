import express from 'express'
import mongoose from 'mongoose'
import Message from './model'

export default { 
  editMessage(req, res) {
    return new Promise((resolve, reject) => {
      Message.findById(req.params.messageID,  (err, message) => {
        if (err) reject({ status: 500, data: { success: false, message: err.message } })
        else if (!message) reject({ status: 404, data: { success: false, message: 'Сообщение не найдено. Message not found.' } })
        else {
          if (message.receiverId != res.locals.user._id || message.receiverId != res.locals.user.username) {
            console.log(res.locals.user)
            console.log(message.receiverId)
          reject({ status: 403, data: { success: false, message: 'CYKA BLYAT !' } })
        } else {
          if (!message.read) {
            // le req.body.read est chelou, il sert pas a grand chose actuellement (il pourrait servir si on peux UNREAD les messages)
            message.read = req.body.read
            message.readDate = req.body.readDate || Date.now()
            message.save( (err, messageUpdated) => {
              // if (err) message tout de même renvoyer
              if (err) reject({ status: 500, data: { success: false, message: err.message, content: messageUpdated } })
              else resolve({ status: 200, data: { success: true, message: 'Вот ваше сообщение! Here is your message!', content: messageUpdated } })
            })
          } else resolve({ status: 200, data: { success: true, message: 'Вот ваше сообщение! Here is your message!', content: message } })
        }
      }
    })
  })
  }
}