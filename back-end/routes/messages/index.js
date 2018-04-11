import express from 'express'
import controller from './controller'

let router = express.Router()

router.route('/')
  .get(controller.readAll)
  .post(controller.create)

router.route('/:messageID')
  .put(controller.update)


// Route pour delete un message, on utilise la méthode remove() du modele mongoose ezpz
// router.delete('/:id', (req, res) => {
//   if (ObjectId.isValid(req.params.id)) {
//     Message.findById(req.params.id, function (err, message) {
//       if (err) {
//         res.status(500).json({ success: false, message: err.message })
//       } else if (!message) {
//         res.status(404).json({ success: false, message: 'Message not found..' })
//       } else {
//         Message.remove({ _id: req.params.id }, function (err) {
//           if (err) res.status(500).json({ success: false, message: err.message })
//           else {
//             res.status(200).json({ success: true, message: 'The message has been deleted!' })
//           }
//         })
//       }
//     })
//   } else {
//     res.status(404).json({ success: false, message: 'message not found..' })
//   }
// })


export default router
