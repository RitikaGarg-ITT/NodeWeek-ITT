const express = require("express");
const mongose=require("mongoose")
const playerSchema = new mongose.Schema({
    ranking:{
        type:Number,
        required:true,
        unique:true
    },
      name:{
        type:String,
        required:true,
    },
    dob:{
        type:Date,
        required:true,

    },
    country:{
        type:String,
        required:true,
    },
    score:{
        type:Number,
        required:true,
    },
    event:{
        type:String,
        default:"100m"
    }
})
const playersCollection = mongose.model("PlayersRanking", playerSchema);
module.exports=playersCollection