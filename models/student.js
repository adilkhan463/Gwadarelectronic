
const mongoose = require('mongoose');
const Studentshecma = new mongoose.Schema({
    category: {type:String,required:true},
    brand: {type:String,required:true},
    price: {type:String,required:true},
    descrption: {type:String,required:true},
    warrenty: {type:String,required:true},
    year: {type:String,required:true},
    image: {type:String,required:true}



  },{timestamps:true});
  //it will look for Students collection in side a which ever db you have selected in DB Connection String
  //Student = Students
  const Student = mongoose.model('Student', Studentshecma);
  module.exports = Student;
