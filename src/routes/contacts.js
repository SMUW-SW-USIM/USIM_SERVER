const { Router } = require('express')
const contacts = Router()

const contactsCtrl = require('../controller/contactController')
const needAuth = require('../middlewares/userCheck')

// 긴급전화 리스트
contacts.get('/list', needAuth, contactsCtrl.contactList)
contacts.post('/list', needAuth, contactsCtrl.contactAppend)

module.exports = contacts
