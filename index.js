const express=require('express');
const User=require("./db/User");
const Service=require('./db/Service');
require('./db/config');
const app=express();
const cors=require("cors");

app.use(express.json());
app.use(cors());


app.post("/register",async (req,res)=>{
    let user=new User(req.body);
    let result=await user.save();
    result=result.toObject();
    delete result.password;
res.send(result);
})

app.post('/login',async (req,res)=>{
    if(req.body.password && req.body.email){
        let user=await User.findOne(req.body).select("-password");
        if(user){
            res.send(user);
        }else{
            res.send({result:'no result match or user not exists'});
        }
    }else{
        res.send({result:'no user found with given email and pass'});
    }
   
})


app.post("/add-service",async (req,res)=>{
    let user=new Service(req.body);
    let result=await user.save();
    // result=result.toObject();
    // delete result.password;
res.send(result);
})

app.get('/services',async (req,res)=>{
    let services=await Service.find();
    if(services.length>0){
        res.send(services);
    }else{
        res.send({result:"no results found"});
    }
})

//for handlingg single service by id
// app.get('/services/:id', async (req, res) => {
//     const serviceId = req.params.id; // Retrieve the service ID from the URL
//     try {
//       // Find the service by ID in your database
//       const service = await Service.findById(serviceId);
//       if (service) {
//         res.send(service); // Send the service details as a response
//       } else {
//         res.status(404).send({ result: 'Service not found' });
//       }
//     } catch (error) {
//       res.status(500).send({ result: 'Internal server error' });
//     }
//   });



// app.post("/register", (req,res)=>{
// res.send("api is working");
// })

// app.post("/register", (req,res)=>{
// res.send(req.body);
// })


//NORMAL NODEJS ROUTE
app.get("/",(req,res)=>{
res.send("app is working fine");
})

app.listen(5000);