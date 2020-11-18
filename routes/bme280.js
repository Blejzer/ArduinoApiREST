let express = require('express');
let router = express.Router();
// let loki = require('lokijs');
let moment = require('moment');
const asyncHandler = require('express-async-handler')

// let db = new loki('bme280data.db');
const mongodb = "BME280dev";
const pass = 'AF7cPTGCqLaUtgxd';
// let bme280 = db.addCollection('bme280', {indices: ['date']});

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://bme280user:"+pass+"@cluster0.ljlhf.azure.mongodb.net/"+mongodb+"?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect().then(() => {
      const collection = client.db("bme280database").collection("bme280collection");
      // perform actions on the collection object
      console.log("If connected " + client.isConnected());
      //client.close();
    })

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).send('OK = '+moment().format("DD-MMM-YYYY, h:mm:ss "));
  console.log();
});

//
router.get('/hour', function(req, res, next) {
  // simple anonymous filter
  // console.log(bme280.data);
  console.log("get all");
  let oneMin = Date.now() - 60*1000;
  // console.log(moment().format("DD-MMM-YYYY, h:mm:ss "));
  // console.log(oneMin.format("DD-MMM-YYYY, h:mm:ss "));
  // let results = bme280.find({'date': {'$gt': oneMin}});
  // console.log(results);
  results.forEach(element => {
    console.log(element.temperature);
    console.log(moment(element.date).format("DD-MMM-YYYY, h:mm:ss "));
    console.log(moment(oneMin).format("DD-MMM-YYYY, h:mm:ss "));
    element.date = moment(element.date).format("DD-MMM-YYYY, h:mm:ss ");
  })
  // let data = results.temperature;
  res.status(200).send('OK '+results[results.length-1].temperature);
});

// Retrieve all data given date
router.get('/all', asyncHandler(async(req, res) => {

  let date;
  try{
    date = parseInt(req.query.d);
    console.log(moment(date).format("DD-MMM-YYYY, h:mm:ss "));
  }catch (err) {
    res.status(500).send("Date is not valid");
  }

  console.log("get all -> " + date);

  const results = [];

  if(!client.isConnected){
    console.log("Have to reconnect");
    await client.connect();
  }
  console.log("Connected correctly to server");
  const db = client.db("bme280database");

  // Use the collection "people"
  const col = db.collection("bme280collection");

  // Find one document
  // let parameters = [];
  col.find({"date": {$gte : parseInt(date)}}).toArray(function(error, documents) {
    if (error) throw error;
    console.log(documents.length);
    documents.forEach(document => {
      results.push(document);
    })
    if(!results || results.length === 0) {
      res.status(404).send({error : "No results were found"})
    }else{
      res.status(200).send(results)
    }
  });
}))

router.post('/all', asyncHandler(async(req, res) => {

  const data = req.body;
  data.Date = Date.now();
  let myobj = {
    temperature: data.Temperature,
    humidity: data.Humidity,
    pressure: data.Pressure,
    date: data.Date
  };
  // console.log(myobj);

  // await insertData(myobj)

  res.status(200).send('OK ');
}))



async function insertData(personDocument) {
  try {
    if(!client.isConnected){
      console.log("Have to reconnect");
      await client.connect();
    }
    console.log("Connected correctly to server");
    const db = client.db("bme280database");

    // Use the collection "people"
    const col = db.collection("bme280collection");

    // Construct a document


    // Insert a single document, wait for promise so we can read it back
    await col.insertOne(personDocument);
    // console.log("this is p object: " + p);
    // Find one document
    const myDoc = await col.findOne();
    // Print to the console
    console.log(myDoc);

  } catch (err) {
    console.log(err.stack);
  }

  // finally {
  //   await client.close();
  // }
}

async function getData(d) {
  try {
    if(!client.isConnected){
      console.log("Have to reconnect");
      await client.connect();
    }
    console.log("Connected correctly to server");
    const db = client.db("bme280database");

    // Use the collection "people"
    const col = db.collection("bme280collection");

    // Find one document
    // let parameters = [];
    await col.find({"date": {$gte : d}}).toArray(function(error, documents) {
      if (error) throw error;
      console.log(documents.length);
      return documents;
    });
    // Print to the console

  } catch (err) {
    console.log(err.stack);
    return null;
  }

  // finally {
  //   await client.close();
  // }
}


module.exports = router;