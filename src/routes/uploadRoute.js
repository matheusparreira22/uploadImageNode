const express = require('express')
const route = express.Router()
const multer = require('multer')
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
//     if(file.mimetype === 'image/jpg' || file.mimetype === 'image'){
//         cb(null, true)
//     }else{
//     cb(null, false);
//     }
// }
const uploads = multer({
    storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    }
})

route.post('/',uploads.single('imagem'), (req, res)=>{
    console.log(req.file)
res.status(200).send({message: 'uploadroute'})
})

module.exports = route