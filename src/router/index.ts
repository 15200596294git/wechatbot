import express from 'express'

import botRouter from './bot'

const app = express()

app.use(botRouter)

export default app