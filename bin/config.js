'use strict'

// Export mongoose
const  mongoose = require("mongoose");

const mongodb = "BME280dev";
const pass = 'AF7cPTGCqLaUtgxd';

// const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://bme280user:"+pass+"@cluster0.ljlhf.azure.mongodb.net/"+mongodb+"?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });


const  options = {
    useNewUrlParser:  true,
    useUnifiedTopology:  true
};

mongoose.connect(uri, options).then(() => {
        console.log("Database connection established!");
    },
    err  => {
        {
            console.log("Error connecting Database instance due to:", err);
        }
    });

//
//
//
// client.connect().then(() => {
//         const collection = client.db("bme280database").collection("bme280collection");
//         // perform actions on the collection object
//         console.log("We are connected: " + client.isConnected());
//         //client.close();
//     },
//     err  => {
//         {
//             console.log("Error connecting Database instance due to:", err);
//         }})
