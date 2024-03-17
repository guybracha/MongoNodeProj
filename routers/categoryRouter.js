const express = require('express');
const router = express.Router();
const categoryModel = require('../models/categoryModel.js');

router.get("/",(req,res) =>{
    categoryModel.find().then(
        function(docs){
            res.send(docs);
            console.log("category route");
        }
    ).catch(
        (error)=>{
            console.log(error);
        }
    )
})


module.exports = router;