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
router
    .route("/day")
    .get(dataList.getAvgAllLastDay);


module.exports = router;