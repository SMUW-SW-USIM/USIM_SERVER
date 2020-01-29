const { Router } = require('express')
const records = Router()

const recordsCtrl = require('../controller/recordController')
const needAuth = require('../middlewares/userCheck')

// 녹음 리스트
records.get('/list', needAuth, recordsCtrl.recordList)
records.post('/list', needAuth, recordsCtrl.recordAppend)

module.exports = records
