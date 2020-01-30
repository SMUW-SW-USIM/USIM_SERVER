const { Router } = require('express')
const visitors = Router()

const visitorsCtrl = require('../controller/visitorController')
const needAuth = require('../middlewares/userCheck')
const { multer } = require('../../config/multer')
const upload = multer('visitors')

// 방문자 리스트
visitors.get('/list', needAuth, visitorsCtrl.visitorList)
//실시간 방문자 정보
visitors.get('/current', needAuth, visitorsCtrl.visitorCurrent)
// 지인 버튼 누르면 방문자 리스트 추가
visitors.post('/list', needAuth, upload.single('visitors'), visitorsCtrl.visitorAppend)

module.exports = visitors
