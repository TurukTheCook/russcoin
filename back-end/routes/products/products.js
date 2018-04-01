import express from 'express'
import mongoose from 'mongoose'
import Product from './model'
import User from './../users/model'
import helper from '../../helpers/helper';

let router = express.Router();

router.post('/test', (req, res) => {
  // res.status(200).json({ success: true, message: user })  
  // res.status(200).json({ success: true, message: 'citron', content: req })  
  console.log(res)
  res.status(200).send({ success: true, message: 'citron', content: res.locals.user })  
})

// Route get products avec param optionnel pour limiter le nombres de products récupéré
// j'avais penser a un 'if/else', mais aprés quelques test je pense avoir trouver mieux :D
router.get('/:limit?', (req, res) => {
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
})

router.get('/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Product.findById(req.params.id, (err, product) => {
      if (err) res.status(500).json({ success: false, message: err.message })
      if (!product) res.status(404).json({ success: false, message: 'продукт не найден. product not found.' })
      else {
        helper.beforeSend(product)
        res.status(200).json({ success: true, message: 'Вот продукт! Here is the product!', content: product })
      }
    })
  } else res.status(404).json({ success: false, message: 'Неверный ID. Invalid ID' })
})

router.post('/', (req, res) => {
  let newProduct = new Product(req.body)
  newProduct.userId = res.locals.user.username
  if (!req.body.address && res.locals.user.address) {
    newProduct.address = res.locals.user.address 
  }
  newProduct.save(function (err, product) {
    if (err) {
      // err.message.match(RegExp)
      // foutre une RegExp genre : ^'Product validation failed' + anything
      if (err.message.match(/^Product validation failed.+/)) {
        res.status(500).json({ success: false, message: 'russe' + err.message })
      }
      // if (err.message == "lol") res.status(500).json({ success: false, message: 'russe' + err.message })
      else res.status(500).json({ success: false, message: err.message })
    } else {
      // veux t'on renvoyer "product" dans le front ?
      helper.beforeSend(product)
      res.status(200).json({ success: true, message: 'Вот ваш новый продукт! Here is your new product!', content: product })
    }
  })
})

// if (err) {
//     if (err.message == "ma string") res.status(500).json({ success: false, message: "string russe" + err.message })
//     else {
//       res.status(200).json({ success: true, message: err.message })
//       }
//     }

export default router
