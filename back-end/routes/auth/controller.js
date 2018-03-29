import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../users/model'
import searchObj from './../../helpers/search';

export default {
  saveUser: (body, callback) => {
    User.findOne({ username: searchObj.caseInsensitive(body.username) }, function (err, result) {
      var response = ''
      if (result === null) {
        let newUser = new User(body)
        newUser.hash_password = bcrypt.hashSync(body.password, 10)
        newUser.save(function (err, user) {
          if (err) {
            response = 'err'
            callback(response, err)
          } else {
            response = 'save'
            user.hash_password = undefined
            callback(response, user)
          }
        })
      } else {
        response = 'used'
        callback(response)
      }
    })
  },
}

// export default {
//   saveUser: (body, callback) => {
//     // On verifie que l'utilisateur existe avec findOne
//     User.findOne({ username: searchObj.caseInsensitive(body.username) }, function (err, result) {
//       if (result === null) {
//         // puis on en créé un si il n'existe pas
//         let newUser = new User(body)
//         // on hash son password avec la méthode hashSync de bcrypt
//         newUser.hash_password = bcrypt.hashSync(body.password, 10)
//         // et enfin on sauvegarde l'utilisateur dans la database
//         newUser.save(function (err, user) {
//           if (err) {
//             res.status(500).json({ success: false, message: err.message })
//           } else {
//             user.hash_password = undefined
//             res.status(200).json({ success: true, message: 'Новый пользователь зарегистрирован! New user registered successfully!', content: user })
//           }
//         })
//       } else {
//         res.status(412).json({ success: false, message: 'Имя пользователя уже используется.. Username already used..' })
//       }
//     })
//   },
// }