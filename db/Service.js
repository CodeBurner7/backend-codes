const mongoose=require("mongoose");
const serviceSchema=new mongoose.Schema({
    id:Number,
    servicename: String,
    category: String,
    image: String,
    location: String,
    budget: String,
    time: String,
    servicetype: String,
    taskername: String,
    description: String,
    featured: String
});
module.exports=mongoose.model('services',serviceSchema);