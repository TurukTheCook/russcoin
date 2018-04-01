import express from 'express'
import mongoose from 'mongoose'
import fish from '../../helpers/fish';

let router = express.Router();

router.get('/:name?', (req, res) => {
  res.status(666).json(fish.joke(req.params.name))
})

export default router