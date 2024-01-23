const express = require('express')
const multer = require('multer')
const route = express.Router()
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
            console.log(file.originalname)
            file.originalname = "upload.png"
        cb(null, file.originalname)
    }
})
const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpg' || file.mimetype==='image/png' || file.mimetype === 'image'){
        cb(null, true)
    }else{
    cb(null, false);
    }
}
const uploads = multer({
    storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

route.post('/',uploads.single('imagem'), (req, res)=>{
    const response = {
        message: "imagem inserida com suscesso!",
        descricao: "caminho da imagem"
    } 
    res.status(200).send({message: response})
})
route.get('/',(req, res, next)=>{
    res.status(200).send({message: 'imagem obtida com sucesso'})
})

module.exports = route