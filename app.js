require('dotenv').config()
const multer = require("multer");
const path = require("path")
const express = require("express");
const AWS = require("aws-sdk");
const uuid = require('uuid').v4()
const app = express();
const port = process.env.port || 5000;


app.use(express.static(path.join(__dirname,'./public')));

app.get('/form', function(req,res){
    res.sendFile(path.join(__dirname,'./public/form.html'));
  });



const s3 = new AWS.S3({
    accessKeyId : process.env.AWS_ACCESS_KEY,
    secretAccessKey : process.env.AWS_SECRET_KEY
})
const storage = multer.memoryStorage({
    destination : function (req,file,callback){
        callback(null,'')
    }
})
//midleware
const upload = multer({storage}).single("image")

app.get("/", (req,res) => {
    res.send("hey Hello world 123!!!");
})
app.post("/save", (req,res) => {
    res.send("form submit")
})
//api for image upload
app.post("/upload", upload, (req,res) => {
    const fileArr = req.file.originalname.split(".");
    const fileType = fileArr[fileArr.length -1];
   
    const params = {
        Bucket : process.env.AWS_BUCKET_NAME,
        Key : `test/${uuid}.${fileType}`, //create folder test
        Body : req.file.buffer
    }
    s3.upload(params,(err,data) => {
        if(err) res.status(500).send(err);
        res.status(200).send(data);
    })
})

app.listen(port , () => {
    console.log(`server is listening on port ${port}`)
})

console.log(process.env.AWS_BUCKET_NAME)