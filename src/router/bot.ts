import express from "express";
import { responseJson } from '../utils/api'
import { startBot } from '../bot'

const router = express.Router()


router.get('/startBot', (req, res)=> {
  // res.json(
  //   responseJson.success('jg')
  // )
  startBot((url)=> {
    res.json(
      responseJson.success(url)
    )
  })
})



export default router