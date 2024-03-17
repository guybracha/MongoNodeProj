const express = require('express');
const mongoose = require('mongoose');
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
const categoryRouter = require("./routers/categoryRouter");
const loginRouter = require("./routers/loginRouter");

const port = 3000;
const app = express();
const Schema = mongoose.Schema;

// mongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/finalProjApi').then(
    ()=>{
        console.log("database connected");
    }
).catch(
    (error)=>{
        console.log(error);
    }
)

app.get("/",function(req,res){
    res.send("Hello and Welcome, Please Login");
    console.log("hello index");
})

// access to routers
app.use("/users",userRouter);
app.use("/tasks",taskRouter);
app.use("/category",categoryRouter);
app.use("/login",loginRouter)

// port listening
app.listen(port,function(){
    console.log(`listening of port ${port}`);
})