import express from 'express'
import mongoose from 'mongoose'
import Product from './model'
import User from './../users/model'


let router = express.Router();

router.post('/test', (req, res) => {
  // res.status(200).json({ success: true, message: user })  
  // res.status(200).json({ success: true, message: 'citron', content: req })  
  console.log(res)
  res.status(200).send({ success: true, message: 'citron', content: res.locals.user })  
})

router.get('/', (req, res) => {

})

router.get('/:id', (req, res) =>{

})

router.post('/', (req, res) => {
  // let _id = res.locals.decode._id;
  // let _username = res.locals.decode.username
  let newProduct = new Product(req.body)
  newProduct.userId = _username
  if (!req.body.address && res.locals.user.address) {
      newProduct.address = res.locals.user.address 
  }
  newProduct.save(function (err, result) {
    if (err) {
      if (err.message == "ptdr") res.status(500).json({ success: false, message: 'russe' + err.message, content: message })
      if (err.message == "lol") res.status(500).json({ success: false, message: 'russe' + err.message, content: message })
      else res.status(500).json({ success: false, message: err.message, content: message })
    } else res.status(200).json({ success: true, message: 'Вот ваше сообщение! Here is your message!', content: message })
  })

})

// if (err) {
//     if (err.message == "ma string") res.status(500).json({ success: false, message: "string russe" + err.message })
//     else {
//       res.status(200).json({ success: true, message: err.message })
//       }
//     }

// DIMITRI
router.post('/', (req, res) => {
  if (req.body.title && req.body.description && req.body.price)
    var createProduct = function (err) {
      if (err) res.status(500).json({ success: false, message: err.message })
      else {
        let newProduct = new Product(req.body);
        newProduct.save(function (err, Product) {
          if (err) {
            res.status(500).json({ success: false, message: err.message })
          } else {
            res.status(200).json({ success: true, message: 'russe/Product created successfuly!' })
          }
        })
      }
    }
  else {
    res.status(412).json({ success: false, message: 'Title/Description/Price is missing...' })
  }
})



export default router