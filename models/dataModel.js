'use strict';
// Import mongoose
const mongoose = require("mongoose");

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema properties
const DataSchema = new Schema({
    temperature: {
        type:Number,
        required:true
    },
    humidity: {
        type:Number,
        required:true
    },
    pressure: {
        type:Number,
        required:true
    },
    date: {
        type:Date,
        default:Date.now
    }
});

// create and export model
module.exports = mongoose.model("bme280collection", DataSchema);