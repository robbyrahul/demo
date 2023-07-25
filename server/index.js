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

//table structure
const demo=mongoose.Schema({fileurl:String});
//create model
const demoM=mongoose.model('demoTable',demo);

//multer
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null,'upload')},
    filename:(req,file,cb)=>{cb(null,file.originalname)} 
});
//upload file
const upload = multer({storage:storage})

api.post('/uploadimg', upload.single('file'), (req, res) => {
    try {
      const url = req.file.filename;
      console.log(url);
      // Save the file URL in the database
      const demoEntry = new demoM({
        fileurl: url,
      });
     demoEntry.save();
      // Respond with success message
      res.send({ msg: 'success' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Server error' });
    }
  });


//mongoose connection
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demoDb');
  console.log("Database Connected")
}
//server creation 
api.listen(9000,()=>{
    console.log("Server running http://localhost:9000")
})