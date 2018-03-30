import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../users/model'
const ObjectId = mongoose.Types.ObjectId;

let router = express.Router();

router.get('/', (req, res) => {
  let _userID = res.locals.decode._id;
  let _username = res.locals.decode.username;
  if (ObjectId.isValid(_userID)) {
    User.findById(_userID, function (err, user) {
      if (!user) {
        res.status(404).json({ success: false, message: 'Пользователь не найден. User not found..' })
      } else {
        if (err) res.status(500).json({ success: false, message: err.message })
        else {
          user.hash_password = undefined
          user.__v = undefined
          res.status(200).json({ success: true, message: 'Вот ваш профиль! Here is your profile!', content: user })
        }
      }
    })
  } else {
    res.status(404).json({ success: false, message: 'Неверный ID. Invalid ID' })
  }
})

router.get('/products', (req, res) => {
  
})

router.put('/', (req, res) => {
  let _userID = res.locals.decode._id;
  let _username = res.locals.decode.username;
  if (ObjectId.isValid(_userID)) {
    User.findById(_userID, function (err, user) {
      if (!user) {
        res.status(404).json({ success: false, message: 'Пользователь не найден. User not found..' })
      } else {
        if (err) res.status(500).json({ success: false, message: err.message })
        else {
          
        }
      }
    })
  } else {
    res.status(404).json({ success: false, message: 'Неверный ID. Invalid ID' })
  }
})

export default router