var express=require('express');
var cors=require('cors');
const mongoose=require('mongoose');
const multer= require("multer");
//express object
var api=express()
//cors object
api.use(cors())
api.use(express.urlencoded({extended: true}))
api.use(express.static("upload"))
//json
api.use(express.json())
api.use(express.urlencoded({extended:true}))

/* table structure
const empStructure=new mongoose.Schema({fname:String,email:String,password:String,fileurl:String})
const prodStructure=new mongoose.Schema({productName:String,category:String,price:Number,stock:Number,fileurl:String})
const catgStructure=new mongoose.Schema({category:String})
const demo=mongoose.Schema({fname:String,email:String,password:String,fileurl:String});
*/
/* create model
const empModel = new mongoose.model('employees',empStructure)
const prodModel = new mongoose.model('products',prodStructure)
const demoM=mongoose.model('demoTable',demo);
*/

//multer
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null,'upload/')},
    filename:(req,file,cb)=>{cb(null,file.originalname)} 
});
const upload = multer({storage:storage})
//****** person registration*****************

//table creation
const clientStructure=new mongoose.Schema({fname:String,email:String,password:String,fileurl:String})
//model
const clientModel = new mongoose.model('client register',clientStructure)

  api.post('/clientform', upload.single('file'), (req, res) => {
    var fname = req.body.fname;
    var email = req.body.email;
    var password = req.body.password;
    const url = req.file.filename;
    const obj = new clientModel({fname:fname,email:email,password:password,fileurl:url});
    obj.save().then(() => {
      res.send({ "msg": "send successfully" });
    }).catch((error) => {
      res.status(500).send({ "error": "An error occurred while saving the object" });
    });
  });
  //****************category register************/
  const categoryStructure=new mongoose.Schema({category:String})
  const categoryModel = new mongoose.model('category register',categoryStructure)
  api.post('/categoryform', upload.single('file'), (req, res) => {
    var category = req.body.category;
     // Convert the category to uppercase before saving
  category = category.toUpperCase();
  
    const obj = new categoryModel({category:category});
    obj.save().then(() => {
      res.send({ "msg": "category added" });
    }).catch((error) => {
      res.status(500).send({ "error": "An error occurred while saving category" });
    });
  });

//mongoose connection and database creation
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demoDB');
  console.log("Database Connected")
}
//server creation 
api.listen(9000,()=>{
    console.log("Server running http://localhost:9000")
})