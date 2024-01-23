const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const uploadRouter = require('./src/routes/uploadRoute')
app.use(morgan('dev'))
app.use('/imagens', express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use('/upload', uploadRouter)

app.use((req,res,next)=>{
    res.header('Acess-Control-Allow-Origin','*');
    res.header(
        'Acess-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Aceppt, Authorization'
        )
        if(req.method == 'OPTIONS'){
            res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
            return res.status(200).send({})
        }
        next()
    })
    app.use((req, res, next)=>{
        res.status(404).send('Page not found')
    })
    
module.exports = app