import express from 'express'
import controller from './controller'
import multer from 'multer'

// MULTER DEFINING
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
})
let upload = multer({ storage })

let router = express.Router();

router.route('/')
  .get(controller.readAllMine)
  .post(upload.single('picture'), controller.create)

// Route get products avec param optionnel pour limiter le nombres de products récupéré
// j'avais penser a un 'if/else', mais aprés quelques test je pense avoir trouver mieux :D
router.route('/:limit?')
  .get(controller.readAll)

router.route('/:id')
  .get(controller.read)

export default router
