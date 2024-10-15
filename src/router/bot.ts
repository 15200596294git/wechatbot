import express from 'express'
import { responseJson } from '../utils/api'
import { startBotAndReturnScanQRCode } from '../bot'

const router = express.Router()

router.get('/api/startBot', (req, res) => {
  startBotAndReturnScanQRCode().then((qrImage) => {
    res.json(responseJson.success(qrImage))
  })
})

export default router
