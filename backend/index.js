import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"

import jobRouter from "./routes/job.route.js"
import authRouter from "./routes/user.route.js"

dotenv.config()

const app = express();

app.use(express.json())

const PORT = process.env.PORT

app.use("/api/job", jobRouter)
app.use("/api/auth", authRouter)

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`)
  connectDb();
})