import express from 'express'
import controller from './controller'

let router = express.Router()

router.route('/login')
  .post(controller.login)

router.route('/signup')
  .post(controller.signup)

export default router