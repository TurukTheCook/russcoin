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