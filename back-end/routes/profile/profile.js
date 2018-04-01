import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './../users/model'
import controller from './controller';
import helper from '../../helpers/helper';
const ObjectId = mongoose.Types.ObjectId;

let router = express.Router();

router.get('/', (req, res) => {
  helper.beforeSendUser(res.locals.user)
  res.status(200).json({ success: true, message: 'Ваш профиль. Your profile.', content: res.locals.user })
})

router.get('/products', (req, res) => {
  Product.find({ userId : res.locals.user._id },  (err, products) => {
    if (err) res.status(500).json({ success: false, message: err.message })
    else {
      helper.beforeSend(products)
      res.status(200).json({ success: true, message: 'Список ваших продуктов. List of your products.', content: products })
    }
  })
})

router.put('/', (req, res) => {
  res.locals.user.update(req.body, {runValidators : true}, (err, result) => {
    // a test de renvoyer "result" dans le front
    if (err) res.status(500).json({ success: false, message: err.message })
    else res.status(200).json({ success: true, message: 'Профиль обновлен! Profile updated!', content: result })
  })
})

export default router