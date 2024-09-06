import express from "express";

const router = express.Router()

router.get('/', (req, res)=> {
  res.json({
    code: 0,
    msg: '雷猴'
  })
})

export default router