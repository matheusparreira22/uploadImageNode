const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const uploadRouter = require('./src/routes/uploadRoute')
const path = require('path');
app.use(morgan('dev'))
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}))
app.use('/upload', uploadRouter)
app.use((req, res, next)=>{
   res.status(404).send('Page not found')
})

module.exports = app