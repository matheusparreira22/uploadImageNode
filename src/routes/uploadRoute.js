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
// const fileFilter = (req, file, cb) =>{
//     if(file.mimetype === 'image/jpg' || file.mimetype==='image/png' || file.mimetype === 'image'){
//         cb(null, true)
//     }else{
//     cb(null, false);
//     }
// }
const uploads = multer({
    storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    // fileFilter: fileFilter
})

route.post('/', uploads.single('imagem'), (req, res)=>{
    console.log(req.file)
    const response = {
        message: "imagem inserida com suscesso!",
        descricao: "caminho da imagem"
    } 
    res.status(200).send(response)
})
route.get('/',(req, res, next)=>{
    const response = {
        message: "imagem obtida",
        url_img: "http://localhost:3001/imagens/upload.png"
    }
    res.status(200).send(response)
})

module.exports = route