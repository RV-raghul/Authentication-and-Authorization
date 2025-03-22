import express from 'express'
import config from './src/config/index.config.js'
import cors from 'cors'
import routes from './src/routes/index.routes.js'


const app = express()


app.use(express.json())
app.use(cors())
app.use(routes)



app.listen(config.PORT,()=>{
    console.log(`Server listening on ${config.PORT}`)
})