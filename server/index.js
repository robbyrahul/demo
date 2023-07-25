var express=require("express")
var cors=require("cors")
var api=express()
const mongoose = require('mongoose');
const { request } = require("express");
const { Await } = require("react-router-dom");
api.use(cors())
api.use(express.json())
api.use(express.urlencoded({extended:true}))
//connection
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/demo')
console.log("database connected") }