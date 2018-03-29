import express from 'express'
import mongoose from 'mongoose'
// bcrypt sert à hasher des chaines de caracteres
// on l'utilise ici pour hasher les password et les rendre secure
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// On importe ici les modeles (schemas) mongoose afin de les utiliser
import User from './../users/model'

let router = express.Router()

import searchObj from './../../helpers/search';

router.post('/login', (req, res) => {
  if (req.body.username && req.body.password) {
    User.findOne({ username: searchObj.caseInsensitive(req.body.username)}, function (err, user) {
      if (err) res.status(500).json({success: false, message: err.message})
      if (!user) {
        res.status(401).json({ success: false, message: 'Пользователь не найден. User not found..' })
      } else if (user) {
        // Si l'utilisateur existe, on compare les password avec la méthode comparePasswords (défini dans le modele utilisateur User)
        if (!user.comparePasswords(req.body.password)) {
          res.status(401).json({ success: false, message: 'Неверный пароль. Wrong password..' })
        } else {
          // Avec JWT.SIGN(PAYLOAD, SECRETKEY, CALLBACK(err, result){...}) on créer un token
          // JWT utilise ce qu'on met dans le payload plus la secretkey pour creer ce token
          // puis il renvoi ce token dans le 'result' du callback
          // On recupere donc ce token et on l'envoi dans une reponse.
          // Ici, on a aussi sauvegardé le token dans la base via la methode save() sur le modele Token (grace à mongoose)
          jwt.sign({ username: user.username, _id: user._id }, process.env.SECRETKEY, function (err, result) {
            if (err) {
              res.status(500).json({success: false, message: err.message})
            } else {
              res.status(200).json({ success: true, message: 'Добро пожаловать! Welcome camarade!', content: {token: process.env.AUTHBEARER + ' ' + result}})
            }
          })
        }
      }
    })
  } else {
    res.status(412).json({ success: false, message: 'Имя пользователя и / или пароль отсутствуют. Username and/or password are missing..'})
  }
})

router.post('/signup', (req, res) => {
  if (req.body.username && req.body.password) {
    if (searchObj.regexEmail.test(req.body.username)) {
      // On verifie que l'utilisateur existe avec findOne
      User.findOne({ username: searchObj.caseInsensitive(req.body.username)}, function (err, result) {
        if (result === null) {
          // puis on en créé un si il n'existe pas
          let newUser = new User(req.body)
          // on hash son password avec la méthode hashSync de bcrypt
          newUser.hash_password = bcrypt.hashSync(req.body.password, 10)
          // et enfin on sauvegarde l'utilisateur dans la database
          newUser.save(function (err, user) {
            if (err) {
              res.status(500).json({success: false, message: err.message})
            } else {
              user.hash_password = undefined
              res.status(200).json({ success: true, message: 'Новый пользователь зарегистрирован! New user registered successfully!', content: user})
            }
          })
        } else {
          res.status(412).json({ success: false, message: 'Имя пользователя уже используется.. Username already used..'})
        }
      })
    } else {
      res.status(412).json({ success: false, message: 'Требуется электронная почта.. Email required..' })
    }
  } else {
    res.status(412).json({ success: false, message: 'Имя пользователя и / или пароль отсутствуют. Username and/or password are missing..'})
  }
})

export default router