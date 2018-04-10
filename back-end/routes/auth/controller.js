import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import helper from './../../helpers/helper';
import User from './../users/model'

export default {
  /*
  *    LOGIN
  */
  login(req, res) {
    if (req.body.username && req.body.password) {
      User.findOne({ username: helper.caseInsensitive(req.body.username)}, (err, user) => {
        if (err) res.status(500).json({success: false, message: err.message})
        if (!user) res.status(401).json({ success: false, message: 'Пользователь не найден. User not found.' })
        else {
          if (!user.comparePasswords(req.body.password)) {
            res.status(401).json({ success: false, message: 'Неверный пароль. Wrong password.' })
          } else {
            // JWT.SIGN(PAYLOAD, SECRETKEY, CALLBACK(err, result){...})
            jwt.sign({ username: user.username, _id: user._id }, process.env.SECRETKEY, (err, result) => {
              if (err) res.status(500).json({success: false, message: err.message})
              else res.status(200).json({ success: true, message: 'Добро пожаловать! Welcome camarade!', content: {token: process.env.AUTHBEARER + ' ' + result}})
            })
          }
        }
      })
    } else res.status(412).json({ success: false, message: 'Имя пользователя и / или пароль отсутствуют. Username and/or password are missing.'})
  },

  /*
  *   REGISTER
  */
  signup(req, res) {
    if (req.body.username && req.body.password) {
      if (helper.regexEmail.test(req.body.username)) {
        User.findOne({ username: helper.caseInsensitive(req.body.username)}, (err, result) => {
          if (result === null) {
            let newUser = new User(req.body)
            newUser.hash_password = bcrypt.hashSync(req.body.password, 10)
            newUser.save( (err, user) => {
              if (err) res.status(500).json({success: false, message: err.message})
              else {
                helper.beforeSendUser(user)
                res.status(200).json({ success: true, message: 'Новый пользователь зарегистрирован! New user registered successfully!', content: user})
              }
            })
          } else res.status(412).json({ success: false, message: 'Имя пользователя уже используется. Username already used.'})
        })
      } else res.status(412).json({ success: false, message: 'Требуется электронная почта. Email required.' })
    } else res.status(412).json({ success: false, message: 'Имя пользователя и / или пароль отсутствуют. Username and/or password are missing.'})
  }
}