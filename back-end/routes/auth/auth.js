import express from 'express'
import mongoose from 'mongoose'
// bcrypt sert à hasher des chaines de caracteres
// on l'utilise ici pour hasher les password et les rendre secure
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// On importe ici les modeles (schemas) mongoose afin de les utiliser
import User from './../../models/User'

let auth = express.Router()

// La route pour se logger et recevoir un token
auth.post('/login', (req, res) => {
  // On verifie que l'utilisateur a envoyé l'email et le password dans le req.body
  if (req.body.username && req.body.password) {
    // On appelle le model USER defini dans mongoose et importé plus haut
    // avec la methode findOne qui cherche un objet avec la propriété 'email' correspondant à notre requete
    // cette methode renvoi le premier utilisateur trouvé ou rien
    User.findOne({ username: req.body.username }, function (err, user) {
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
            console.log(process.env.AUTHBEARER + ' ' + result)
            if (err) {
              res.status(500).json({success: false, message: err.message})
            } else {
              res.status(200).json({success: true, message: 'Enjoy your unlimited access!', content: {token: process.env.AUTHBEARER + ' ' + result}})
            }
          })
        }
      }
    })
  } else {
    res.status(412).json({success: false, message: 'Username and/or password are mising..'})
  }
})

// Route pour s'enregister
auth.post('/signup', (req, res) => {
  if (req.body.username && req.body.password) {
    // On verifie que l'utilisateur existe avec findOne encore
    User.findOne({ username: req.body.username}, function (err, result) {
      if (result === null) {
        // puis on en créé un si il n'existe pas
        let newUser = new User(req.body)
        // on hash son password avec la méthode hashSync de bcrypt
        newUser.hash_password = bcrypt.hashSync(req.body.password, 10)
        // et enfin on sauvegarde l'utilisateur dans la base
        newUser.save(function (err, user) {
          if (err) {
            res.status(500).json({success: false, message: err.message})
          } else {
            user.hash_password = undefined
            res.status(200).json({success: true, message: 'New user registered successfuly!', content: user})
          }
        })
      } else {
        res.status(412).json({success: false, message: 'Username already used..'})
      }
    })
  } else {
    res.status(412).json({success: false, message: 'Username and/or password are missing..'})
  }
})

export default auth