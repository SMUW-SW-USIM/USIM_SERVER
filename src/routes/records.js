const { Router } = require('express')
const records = Router()

const recordsCtrl = require('../controller/recordController')
const needAuth = require('../middlewares/userCheck')
const { multer } = require('../../config/multer')
const upload = multer('records')

// 녹음 리스트
records.get('/list', needAuth, recordsCtrl.recordList)
records.post('/list', needAuth, upload.single('records'), recordsCtrl.recordAppend)

module.exports = records
