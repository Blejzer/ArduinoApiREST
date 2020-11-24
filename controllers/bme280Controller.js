// import Data Model
const  Data = require("../models/dataModel");

exports.bme280_get_avg_temp_last_hour = async function(req, res, next){
    let date1, date2;
    try{
        date1 = parseInt(req.query.d1);
        date2 = parseInt(req.query.d2);
    }catch (err) {
        res.status(500).send("Date(s) not valid");
    }

    console.log("get from -> " + date1 + " to -> " + date2);

    if(!client.isConnected){
        console.log("Have to reconnect");
        await client.connect();
    }
    console.log("Connected correctly to server");
    const col = client.db("bme280database").collection("bme280collection");

    // Find documents
    const results = [];
    col.find({"date": {$gte : parseInt(date1), $lt : parseInt(date2)}}).toArray(function(error, documents) {
        if (error) throw error;
        console.log(documents.length);
        documents.forEach(document => {
            results.push(document);
        })
        if(!results || results.length === 0) {
            return res.status(404).send({error : "No results were found"})
        }else{
            let avg = 0;
            results.forEach(document => {
                avg = avg + document.temperature;
            })
            // console.log(avg);
            avg = avg / results.length;
            console.log(avg);
            return res.status(200).json({temperature: avg.toFixed(2)});
        }
    });
}

exports.bme280_post = async function (req, res, next){
    const data = req.body;
    data.Date = Date.now();

    let myobj = {
        temperature: data.Temperature,
        humidity: data.Humidity,
        pressure: data.Pressure,
        date: data.Date
    };

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
        await col.insertOne(myobj);
        // console.log("this is p object: " + p);
        // Find one document
        const myDoc = await col.findOne();
        // Print to the console
        console.log(myDoc);
        res.sendStatus('OK ');

    } catch (err) {
        console.log(err.stack);
        res.sendStatus(500);
    }
}


// DEFINE CONTROLLER FUNCTIONS

// Weather station index page collects current data
exports.indexBme280 = (req, res) => {

    Data.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, data) {
        data.date  = data.date.toLocaleString('hr-HR');
        data.humidity = data.humidity.toFixed(2);
        data.temperature = data.temperature.toFixed(2);
        data.pressure = data.pressure.toFixed(2);
        console.log( data );
        res.render('indexbme280', { data });
    });

}

exports.getCurrentAll = (req, res) => {

    Data.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, data) {
        data.date  = data.date.toLocaleString('hr-HR');
        data.humidity = data.humidity.toFixed(2);
        data.temperature = data.temperature.toFixed(2);
        data.pressure = data.pressure.toFixed(2);
        console.log( data );
        res.status('200').send(data);
    });

}

// listAllData function - To list all data
exports.listAllData = (req, res) => {
    console.log(Date.now());
    Data.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(data);
    });
};

exports.getAvgTempLastHour = (req, res) => {
    try {
        let date1 = new Date();
        date1.setHours(date1.getHours() - 1);
        let date2 = new Date();

        Data.find({"date": {$gte: date1, $lt: date2}}, (err, data) => {
            if (err) {
                console.error(err);
                res.status(501).send(err);
            }else {
                let avg = 0;
                data.forEach(temp => {
                    avg = avg + temp.temperature;
                })
                avg = avg / data.length;

                res.status(200).json(avg);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

exports.getAvgAllLastHour = (req, res) => {
    try {
        let date1 = new Date();
        date1.setHours(date1.getHours() - 1);
        let date2 = new Date();

        Data.find({"date": {$gte: date1, $lt: date2}}, (err, data) => {
            if (err) {
                console.error(err);
                res.status(501).send(err);
            }else {
                let avgt = 0;
                let avgh = 0;
                let avgp = 0;
                data.forEach(temp => {
                    avgt = avgt + temp.temperature;
                    avgh = avgh + temp.humidity;
                    avgp = avgp + temp.pressure;
                })
                avgt = avgt / data.length;
                avgh = avgh / data.length;
                avgp = avgp / data.length;
                let avg = {
                    "temperature" : null,
                    "humidity" : null,
                    "pressure" : null,
                    "date" : date2.toLocaleString('hr-HR')
                }
                if(data.length>0){
                    avg = {
                        "temperature" : avgt.toFixed(2),
                        "humidity" : avgh.toFixed(2),
                        "pressure" : avgp.toFixed(2),
                        "date" : date2.toLocaleString('hr-HR')
                    }
                }
                res.status(200).json(avg);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}


exports.getAvgTempBtw = (req, res) => {
    try {
        let date1 = new Date(req.body.d1);
        let date2 = new Date(req.body.d2);

        Data.find({"date": {$gte : date1, $lt : date2}}, (err, data) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(data);
        });
    }catch (err) {
        console.error(err);
        res.status(500).send(err);
    }


    Data.find()
}

// createNewData function - To create new data
exports.createNewData = (req, res) => {

    let myobj = {
        temperature: req.body.Temperature,
        humidity: req.body.Humidity,
        pressure: req.body.Pressure
    };
    let  newData = new Data (myobj);

    newData.save((err, data) => {
        if (err) {
            console.error (err);
            res.status(500).send(err);
        }
        res.status(201).json(data);
    });
};

// updateData function - To update data status by id
exports.updateData = (req, res) => {
    Data.findOneAndUpdate({ _id:req.params.id }, req.body, { new:true }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(data);
    });
};

// deleteData function - To delete data by id
exports.deleteData = async ( req, res) => {
    await  Data.deleteOne({ _id:req.params.id }, (err) => {
        if (err) {
            return res.status(404).send(err);
        }
        res.status(200).json({ message:"Data successfully deleted"});
    });
};





