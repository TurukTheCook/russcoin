import mongoose from 'mongoose'
import User from './model'
import helper from '../../helpers/helper'
const ObjectId = mongoose.Types.ObjectId

export default {
  readAll(req, res) {
    User.find({}, (err, users) => {
      if (err) res.status(500).json({success: false, message: err.message})
      else {
        for(let i=0; i<users.length; i++) {
          helper.beforeSendUser(users[i])
        }
        res.status(200).json({ success: true, message: 'Вот список пользователей! Here is the list of users!', content: users})
      }
    })
  },

  read(req, res) {
    if (ObjectId.isValid(req.params.id)) {
      User.findById(req.params.id, (err, user) => {
        if (err) res.status(500).json({ success: false, message: err.message })
        if (!user) res.status(404).json({ success: false, message: 'Пользователь не найден. User not found.' })
        else {
          helper.beforeSendUser(user)
          res.status(200).json({ success: true, message: 'Вот профиль пользователя! Here is the user profile!', content: user })
        }
      })
    } else res.status(400).json({ success: false, message: 'Неверный ID. Invalid ID' })
  }
}