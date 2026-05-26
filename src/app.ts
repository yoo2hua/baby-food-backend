import express, { Application } from 'express'
import cors from 'cors'

import authRouter from './routes/auth'
import babyRouter from './routes/baby'
import feedingRouter from './routes/feeding'
import analysisRouter from "./routes/analysis";


const app: Application = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/baby', babyRouter )
app.use('/feeding', feedingRouter)
app.use("/analysis", analysisRouter);

export default app
