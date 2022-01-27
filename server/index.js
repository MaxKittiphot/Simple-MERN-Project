const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./model/Users");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://<adminName>:<password>@cluster0.wpp0u.mongodb.net/MERN?retryWrites=true&w=majority")

app.get("/getUsers", (req,res)=>{
    UserModel.find({}, (err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    })
});

app.post("/createUser", async (req,res)=>{
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user)
})

app.listen(5000, ()=>{
    console.log("Server is running on port 5000.");
});