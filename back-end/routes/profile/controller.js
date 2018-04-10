import mongoose from 'mongoose'
import User from './../users/model'
import helper from '../../helpers/helper'
const ObjectId = mongoose.Types.ObjectId

export default {
  read(req, res) {
    helper.beforeSendUser(res.locals.user)
    res.status(200).json({ success: true, message: 'Ваш профиль. Your profile.', content: res.locals.user })
  },

  readProductsAll(req, res) {
    Product.find({ userId : res.locals.user._id },  (err, products) => {
      if (err) res.status(500).json({ success: false, message: err.message })
      else {
        helper.beforeSend(products)
        res.status(200).json({ success: true, message: 'Список ваших продуктов. List of your products.', content: products })
      }
    })
  },

  update(req, res) {
    res.locals.user.update(req.body, (err, result) => {
      if (err) res.status(500).json({ success: false, message: err.message })
      else res.status(200).json({ success: true, message: 'Профиль обновлен! Profile updated!', content: result })
    })
  }
}