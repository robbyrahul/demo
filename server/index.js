var express=require("express")
var cors=require("cors")
const mongoose = require('mongoose')
const multer=require ("multer")
var api=express()
api.use(cors())
api.use(express.json())
api.use(express.urlencoded({extended:true}))
api.use(express.static("upload"))
api.listen(express.json)
//connection
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/demoDB')
console.log("database connected") }

const demo=mongoose.Schema({fileurl:String})
const demoModel=mongoose.model('demoTable',demo)

//multer
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{cb(null,'upload/')},
    filename:(req,file,cb)=>{cb(null,file.originalname)},
})

const upload=multer({storage:storage})

api.post('/uploadimage',upload.single('file'),(req,res)=>{
    console.log(url)
    res.send({'msg':'success'})
})
api.listen(9000,()=>{
    console.log("server running http://localhost:9000/ ")
})
