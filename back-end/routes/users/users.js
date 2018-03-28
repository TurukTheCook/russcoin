import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../../models/User'
const ObjectId = mongoose.Types.ObjectId;

let users = express.Router();

// Route pour récuperer tous les utilisateurs
// On utilise la méthode find() du modèle mongoose 'User' qui renvoi ici tous les users
users.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).json({success: false, message: err.message})
    else {
      for(let i=0; i<users.length; i++) {
        users[i].hash_password = undefined
        users[i].__v = undefined
      }
      res.status(200).json({ success: true, message: 'Вот список пользователей! Here is the list of users!', content: users})
    }
  })
})

users.get('/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    User.findById(req.params.id, (err, user) => {
      if (!user) {
        res.status(404).json({ success: false, message: 'Пользователь не найден. User not found..' })
      } else {
        if (err) res.status(500).json({success: false, message: err.message})
        else {
          user.hash_password = undefined
          user.__v = undefined
          res.status(200).json({ success: true, message: 'Вот профиль пользователя! Here is the user profile!', content: user })
        }
      }
    })
  } else {
    res.status(404).json({ success: false, message: 'Неверный ID. Invalid ID'})
  }
})

users.put('/:id', (req, res) => {
  if (req.body && req.body.username && req.body.password) {
    if (ObjectId.isValid(req.params.id)) {
      User.findById(req.params.id, function (err, user) {
        if (!user) {
          res.status(404).json({ success: false, message: 'Пользователь не найден. User not found..' })
        } else {
          if (err) res.status(500).json({success: false, message: err.message})
          else {
            user.username = req.body.username;
            user.hash_password = bcrypt.hashSync(req.body.password, 10)
            user.save(function (err, updatedUser) {
              if (err) {
                res.status(500).json({success: false, message: err.message})
              } else {
                updatedUser.hash_password = undefined
                res.status(200).json({ success: true, message: 'Пользователь обновлен! User updated!', content: updatedUser}) }
            })
          }
        }
      })
    } else {
      res.status(404).json({ success: false, message: 'Неверный ID. Invalid ID' })
    }
  } else {
    res.status(400).json({ success: false, message: 'Отсутствуют данные. Data is missing..'})
  }
})

users.delete('/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    User.findById(req.params.id, function (err, user) {
      if (err) {
        res.status(500).json({success: false, message: err.message})
      } else if (!user) {
        res.status(404).json({ success: false, message: 'Пользователь не найден. User not found..'})
      } else {
        User.remove({ _id: req.params.id }, function (err) {
          if (err) res.status(500).json({success: false, message: err.message})
          else {
            res.status(200).json({ success: true, message: 'Пользователь удален! User deleted!'})
          }
        })
      }
    })
  } else {
    res.status(404).json({ success: false, message: 'Неверный ID. Invalid ID' })
  }
})

export default users

// ???
// Gestion d'erreurs un peu different entre "users.get/put/delete" . A voir ce qui est le plus pertinent