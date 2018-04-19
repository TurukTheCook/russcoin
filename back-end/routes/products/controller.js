import mongoose from 'mongoose'
import Product from './model'
import User from './../users/model'
import helper from '../../helpers/helper';
const ObjectId = mongoose.Types.ObjectId;

export default {
  /*
  *   READ ALL
  */
  readAll(req, res, next) {
    // verif if the param is an ID, then redirect to "router.get('/:id')"
    if (ObjectId.isValid(req.params.limit)) next()
    else {
      if (req.params.limit) req.params.limit = parseInt(req.params.limit)
      Product.find({}, null, { limit: req.params.limit }, (err, products) => {
        if (err) res.status(500).json({ success: false, message: err.message })
        else {
          for (let i = 0; i < products.length; i++) {
            helper.beforeSend(products[i])
          }
          res.status(200).json({ success: true, message: 'Вот список пользователей! Here is the list of products!', content: products })
        }
      })
    }
  },

  /*
  *   READ
  */
  read(req, res) {
    if (ObjectId.isValid(req.params.id)) {
      Product.findById(req.params.id, (err, product) => {
        if (err) res.status(500).json({ success: false, message: err.message })
        else if (!product) res.status(404).json({ success: false, message: 'продукт не найден. product not found.' })
        else {
          helper.beforeSend(product)
          res.status(200).json({ success: true, message: 'Вот продукт! Here is the product!', content: product })
        }
      })
    } else res.status(400).json({ success: false, message: 'Неверный ID. Invalid ID' })
  },

  /*
  *   CREATE
  */
  create(req, res) {
    let newProduct = new Product(JSON.parse(req.body.sendProduct))
    if (req.file) {
      newProduct.picture = req.file.path
    }
    newProduct.userId = res.locals.user.username
    if (!req.body.address && res.locals.user.address) newProduct.address = res.locals.user.address
    newProduct.save((err, product) => {
      if (err) {
        // Russian personalised err.message
        if (err.message.match(/^Product validation failed.+/)) {
          res.status(400).json({ success: false, message: 'Не удалось выполнить проверку продукта / ' + err.message })
        } else res.status(500).json({ success: false, message: err.message })
      } else {
        helper.beforeSend(product)
        res.status(201).json({ success: true, message: 'Вот ваш новый продукт! Here is your new product!', content: product })
      }
    })
  }
}