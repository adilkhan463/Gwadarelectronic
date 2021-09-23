
const mongoose = require('mongoose');
const productshecma = new mongoose.Schema({
    name: {type:String,required:true},
    number: {type:String,required:true},
    email: {type:String,required:true},
    city: {type:String,required:true},
    brand: {type:String,required:true},
    category: {type:String,required:true}
   



  },{timestamps:true});
  //it will look for Students collection in side a which ever db you have selected in DB Connection String
  //Student = Students
  const Buyproduct = mongoose.model('Buyproduct', productshecma);
  module.exports = Buyproduct;


  /// student e jAH buy
  // studentschema e jah productschema