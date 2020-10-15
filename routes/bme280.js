let express = require('express');
let router = express.Router();
let loki = require('lokijs');
let moment = require('moment');

let db = new loki('bme280data.db');
const mongodb = "BME280dev";
const pass = 'AF7cPTGCqLaUtgxd';
let bme280 = db.addCollection('bme280', {indices: ['date']});

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://bme280user:"+pass+"@cluster0.ljlhf.azure.mongodb.net/"+mongodb+"?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("bme280database").collection("bme280collection");
  // perform actions on the collection object
  console.log("If connected "+ client.isConnected());
  client.close();
});

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
  let results = bme280.find({'date': {'$gt': oneMin}});
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


router.get('/all', function(req, res, next) {
  // simple anonymous filter
  // console.log(bme280.data);
  console.log("get all");
  let oneMin = Date.now() - 60*1000;
  // console.log(moment().format("DD-MMM-YYYY, h:mm:ss "));
  // console.log(oneMin.format("DD-MMM-YYYY, h:mm:ss "));
  let results = bme280.find({'date': {'$gt': oneMin}});
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
router.post('/all', function(req, res) {
  // console.log(req.body);
  const data = req.body;
  console.log(data.check);
  console.log(data.Temperature);
  console.log(data.Humidity);
  console.log(data.Pressure);
  data.Date = Date.now();
  console.log(data.Date);
  if(data.check==1){
    var test = bme280.insert({temperature:data.Temperature, humidity:data.Humidity, pressure:data.Pressure, date: data.Date});
    console.log(test.$loki);
    var mongodbInsert = collection.insert

    res.status(200).send('OK '+test.$loki);
  }else{
    res.status(202).send('NOT OK');
  }




})

module.exports = router;
