
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://bme280user:<password>@cluster0.ljlhf.azure.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

const pass = 'AF7cPTGCqLaUtgxd'

const connection = 'mongodb+srv://bme280user:' + pass + '@cluster0.ljlhf.azure.mongodb.net/<dbname>?retryWrites=true&w=majority';