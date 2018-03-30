import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import User from './../routes/users/model'
const ObjectId = mongoose.Types.ObjectId

// AUTH PROTECTION STARTS HERE...
// auth middleware definition
// Ici on défini le middleware qui va servir a vérifier que le token est valide
// On regarde donc si le header AUTHORIZATION existe, puis on separe en deux sa valeur
// la premiere partie est égale à un mot defini dans la config, et la seconde est égale au token.
// On utilise JWT.VERIFY(TOKEN, SECRETKEY, CALLBACK(err, result){...})
// JWT va donc verifier le token avec le secretkey et renvoyer via le callback une erreur ou un resultat
// Ce dernier correspond au token décodé, on retrouve le payload (ex: email utilisateur, id etc..)
// on appelle next() pour dire que tout s'est bien passé et qu'on peut passer à la suite (circulez svp!)
let verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === process.env.AUTHBEARER) {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRETKEY, function (err, decode) {
      if (err) res.status(500).json({ success: false, message: err.message })
      else {
        // res.locals permet de stocker des datas utilisable dans la requête en cours
        res.locals.decode = decode
        if (ObjectId.isValid(decode._id)) {
          User.findById(decode._id, function (err, user) {
            if (err) res.status(500).json({ success: false, message: err.message })
            if (!user) res.status(403).json({ success: false, message: '1 CYKA BLYAT !' })
            else {
              res.locals.user = user
              next()
            }
          })
        } else res.status(404).json({ success: false, message: 'Неверный ID. Invalid ID' })
      }
    })
  } else res.status(403).json({ success: false, message: '3 CYKA BLYAT !' })
}

export default verifyToken