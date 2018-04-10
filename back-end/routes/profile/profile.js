import express from 'express'
import controller from './controller'

let router = express.Router()

router.route('/')
  .get(controller.read)

router.route('/products')
  .get(controller.readProductsAll)

// {runValidators : true}
// exploiter le contenue de "result" pour faire des réponses differentes
router.route('/')
  .put(controller.update)

// pour router.put : if (req.body.password || req.body.hash_password) functionQuiGereLeBail()

export default router