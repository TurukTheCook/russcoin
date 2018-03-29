import express from 'express'
import mongoose from 'mongoose'
import Products from './model'
const ObjectId = mongoose.Types.ObjectId;

let router = express.Router();
//Route pour afficher tout les produits
router.get('/', (req, res) => {
    Products.find({}, (err) => {
        if (err) res.status(500).json({success: false, message: err.message})
        else {
            res.status(200).json({ success: true, message: 'russe/ Here is the list of products!', content: users})
        }
    })
})
//Route pour afficher un produit en particulier grace à son id
router.get('/:id', (req, res) =>{

})
// Route pour crée un nouveau produit
router.post('/', (req, res) => {
    if (req.body.title && req.body.description && req.body.price) {
        var createProduct = function (err) {
            if (err) res.status(500).json({ success: false, message: err.message })
            else {
                let newProduct = new Product(req.body);
                newProduct.save(function(err) {
                    if (err) {
                        res.status(500).json({ success: false, message: err.message })
                    } else {
                        res.status(200).json({ success: true, message: 'russe/Product created successfuly!'})
                    }
                })
            }
        }}
    else {
        res.status(412).json({ success: false, message: 'Title/Description/Price is missing...'})
    }
})

export default products