'use strict';
let router = require('express').Router();
// let moment = require('moment');
// const asyncHandler = require('express-async-handler')
const dataList = require('../controllers/bme280Controller');

router
    .route('/')
    .get(dataList.indexBme280);
router
    .route('/current')
    .get(dataList.getCurrentAll);
router
    .route("/all")
    .get(dataList.listAllData)
    .post(dataList.createNewData);

router
    .route("/btw")
    .get(dataList.getAvgTempBtw);

router
    .route("/hourTemp")
    .get(dataList.getAvgTempLastHour);
router
    .route("/avg")
    .get(dataList.getAvgAllLastHour);

// create App function
// module.exports = function(app) {
//   var dataList = require('../controllers/bme280Controller');
//   // todoList Routes
//
//   // get and post request for /todos endpoints
//   app
//       .route("/all")
//       .get(dataList.listAllData)
//       .post(dataList.createNewData);
//
// // put and delete request for /todos endpoints
//   app
//       .route("/data/:id")
//       .put(dataList.updateData)
//       .delete(dataList.deleteData);
// };




// let db = new loki('bme280data.db');
// const mongodb = "BME280dev";
// const pass = 'AF7cPTGCqLaUtgxd';
// let bme280 = db.addCollection('bme280', {indices: ['date']});

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://bme280user:"+pass+"@cluster0.ljlhf.azure.mongodb.net/"+mongodb+"?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect().then(() => {
//       const collection = client.db("bme280database").collection("bme280collection");
//       // perform actions on the collection object
//       console.log("If connected " + client.isConnected());
//       //client.close();
//     })

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.status(200).send('OK = '+moment().format("DD-MMM-YYYY, h:mm:ss "));
//   console.log();
// });
//
// //
// router.get('/hour', function(req, res, next) {
//   // simple anonymous filter
//   // console.log(bme280.data);
//   console.log("get all");
//   let oneMin = Date.now() - 60*1000*60;
//   // console.log(moment().format("DD-MMM-YYYY, h:mm:ss "));
//   // console.log(oneMin.format("DD-MMM-YYYY, h:mm:ss "));
//   // let results = bme280.find({'date': {'$gt': oneMin}});
//   // console.log(results);
//   results.forEach(element => {
//     console.log(element.temperature);
//     console.log(moment(element.date).format("DD-MMM-YYYY, h:mm:ss "));
//     console.log(moment(oneMin).format("DD-MMM-YYYY, h:mm:ss "));
//     element.date = moment(element.date).format("DD-MMM-YYYY, h:mm:ss ");
//   })
//   // let data = results.temperature;
//   res.status(200).send('OK '+results[results.length-1].temperature);
// });
//
// // Retrieve all data between given dates
// router.get('/all', asyncHandler(async(req, res) => {
//
//   let date1, date2;
//   try{
//     date1 = parseInt(req.query.d1);
//     date2 = parseInt(req.query.d2);
//     // console.log(moment(date1).format("DD-MMM-YYYY, h:mm:ss "));
//   }catch (err) {
//     res.status(500).send("Date(s) not valid");
//   }
//
//   console.log("get from -> " + date1 + " to -> " + date2);
//
//   const results = [];
//
//   if(!client.isConnected){
//     console.log("Have to reconnect");
//     await client.connect();
//   }
//   console.log("Connected correctly to server");
//   const db = client.db("bme280database");
//
//   // Use the collection "people"
//   const col = db.collection("bme280collection");
//
//   // Find one document
//
//   col.find({"date": {$gte : parseInt(date1), $lt : parseInt(date2)}}).toArray(function(error, documents) {
//     if (error) throw error;
//     console.log(documents.length);
//     documents.forEach(document => {
//       results.push(document);
//     })
//     if(!results || results.length === 0) {
//       res.status(404).send({error : "No results were found"})
//     }else{
//       res.status(200).send(results);
//     }
//   });
// }))
//
// // Retrieve average temperature between given dates
// router.get('/avgTemp', asyncHandler(async(req, res, next) => {
//
//   await bme280Controller.bme280_get_avg_temp_last_hour(req, res, next);
//
// }))
//
// // Retrieve average temperature in past hour
// router.get('/avgTemph', asyncHandler(async(req, res) => {
//
//   let oneHour = Date.now() - 60*1000*60;
//
//   if(!client.isConnected){
//     console.log("Have to reconnect");
//     await client.connect();
//   }
//   console.log("Connected correctly to server");
//   const db = client.db("bme280database");
//
//   // Use the collection "people"
//   const col = db.collection("bme280collection");
//
//   // Find documents
//   const results = [];
//   col.find({"date": {$gte : oneHour}}).toArray(function(error, documents) {
//     if (error) throw error;
//     console.log(documents.length);
//     documents.forEach(document => {
//       results.push(document);
//     })
//     if(!results || results.length === 0) {
//       res.status(404).send({error : "No results were found"})
//     }else{
//       let avg = 0;
//       results.forEach(document => {
//         avg = avg + document.temperature;
//       })
//       // console.log(avg);
//       avg = avg / results.length;
//       console.log(avg);
//       res.status(200).json({temperature: avg.toFixed(2)});
//     }
//   });
// }))
//
// // NodeMCU8266 sends data to server
// router.post('/all', asyncHandler(async(req, res, next) => {
//
//   await bme280Controller.bme280_post(req, res, next);
//
//   // const data = req.body;
//   // data.Date = Date.now();
//   // let myobj = {
//   //   temperature: data.Temperature,
//   //   humidity: data.Humidity,
//   //   pressure: data.Pressure,
//   //   date: data.Date
//   // };
//   // // console.log(myobj);
//   //
//   // // await insertData(myobj)
//   //
//   // res.status(200).send('OK ');
// }))
//
// async function insertData(personDocument) {
//   // try {
//   //   if(!client.isConnected){
//   //     console.log("Have to reconnect");
//   //     await client.connect();
//   //   }
//   //   console.log("Connected correctly to server");
//   //   const db = client.db("bme280database");
//   //
//   //   // Use the collection "people"
//   //   const col = db.collection("bme280collection");
//   //
//   //   // Construct a document
//   //
//   //
//   //   // Insert a single document, wait for promise so we can read it back
//   //   await col.insertOne(personDocument);
//   //   // console.log("this is p object: " + p);
//   //   // Find one document
//   //   const myDoc = await col.findOne();
//   //   // Print to the console
//   //   console.log(myDoc);
//   //
//   // } catch (err) {
//   //   console.log(err.stack);
//   // }
//
//   // finally {
//   //   await client.close();
//   // }
// }
//
// async function getData(req, res, next) {
//
//   let date1, date2;
//   try{
//     date1 = parseInt(req.query.d1);
//     date2 = parseInt(req.query.d2);
//     // console.log(moment(date1).format("DD-MMM-YYYY, h:mm:ss "));
//   }catch (err) {
//     res.status(500).send("Date(s) not valid");
//   }
//
//   console.log("get from -> " + date1 + " to -> " + date2);
//
//   if(!client.isConnected){
//     console.log("Have to reconnect");
//     await client.connect();
//   }
//   console.log("Connected correctly to server");
//   const col = client.db("bme280database").collection("bme280collection");
//
//   // Find documents
//   const results = [];
//   col.find({"date": {$gte : parseInt(date1), $lt : parseInt(date2)}}).toArray(function(error, documents) {
//     if (error) throw error;
//     console.log(documents.length);
//     documents.forEach(document => {
//       results.push(document);
//     })
//     if(!results || results.length === 0) {
//       return res.status(404).send({error : "No results were found"})
//     }else{
//       let avg = 0;
//       results.forEach(document => {
//         avg = avg + document.temperature;
//       })
//       // console.log(avg);
//       avg = avg / results.length;
//       console.log(avg);
//       return res.status(200).json({temperature: avg.toFixed(2)});
//     }
//   });
// }
//
module.exports = router;