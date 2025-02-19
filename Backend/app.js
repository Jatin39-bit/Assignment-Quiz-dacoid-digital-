const dontenv=require('dotenv')
dontenv.config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes.js')

app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/user',userRoutes)

app.get('*', (req, res) => {
    res.send('Hello User! Check you URL')
}
)


module.exports = app