# ArduinoApiREST
######NodeMCU - NodeJS - BME280

This project is an example of how NodeMCU gathers information from **BME280**, acting as web client and sends received information to nodeJS (ExpressJS) server. 
Server verifies the data received and, in return saves it to mongodb Atlas database.
All data should be accessible through APIs.

[BME280](https://www.adafruit.com/product/2652)

![How to connect BME280 to Arduino Uno](https://i.ibb.co/z6Bk0MV/Screen-Shot-2020-11-25-at-13-31-24.png)

This device is excellent for quickly and easily getting three main parameters of weather conditions.
* Temperature,
* Humidity, and
* Pressure (Pay attention to settings regarding the altitude).

[NodeMCU8266 ESP12-F](https://www.nodemcu.com/index_en.html)

######Available APIs

APIs that return whole data parameters look like this:
 ```
{
     "_id": "5fbe2d7965aad8438e05b1db",
     "temperature": 21.23,
     "humidity": 49.93457,
     "pressure": 1030.349,
     "date": "2020-11-25T10:10:01.841Z",
     "__v": 0
 }
```
Otherwise, requesting only one parameter, server retuns just the numeric value of the parameter.

**List of APIs**
* [Get all data](https://www.bdslab.info/bme280/all) - This API returns all the data. Please consider the fact that each minute one record is added. (JSON)
* [Get all data between two dates](https://www.bdslab.info/bme280/btw) - This API returns JSON list of records between two dates. Provided dates should be sent through req body in the following format:
 ```
{ 
    "d1": "YYYY-MM-DDTHH:mm:ss.sssZ",
    "d2": "YYYY-MM-DDTHH:mm:ss.sssZ" 
}
```
* [Get current data](https://www.bdslab.info/bme280/current) - This API returns latest data (JSON)
* [Get average temperature for the last hour](https://www.bdslab.info/bme280/hourTemp) - This API returns average temperature for the last hour (Number)
* [Get average data for the last hour](https://www.bdslab.info/bme280/avg) - This API returns average values for all data in the past hour (JSON)

* [POST data]() - This API is for receiving data from the NodeMCU. It can only accept strigified JSON data in the following format:
```
{
    "Temperature": Number,
    "Humidity": Number,
    "Pressure": Number
}
```

**Next steps:**

For the future, I plan to add few more APIs, so if you have any suggestions, now is the time to send what you would be interested in.

- [x] Get current data
- [x] Get average data for the last hour
- [ ] add IP based geolocation for the data using [GeoLite2 data created by MaxMind](https://www.maxmind.com)
- [ ] add APIs for IP based geolocation for the data
