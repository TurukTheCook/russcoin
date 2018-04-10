import express from 'express'
import controller from './controller'

let router = express.Router();

// Route get products avec param optionnel pour limiter le nombres de products récupéré
// j'avais penser a un 'if/else', mais aprés quelques test je pense avoir trouver mieux :D
router.route('/:limit?')
  .get(controller.readAll)

router.route('/:id')
  .get(controller.read)

router.route('/')
  .post(controller.create)

export default router
