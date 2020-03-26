const moment = require('moment')
const { Transaction, getConnection } = require('../lib/dbConnection')
const visitorDao = require('../dao/visitorDao')
const faceDetect = require('../faceapi/faceDetection')
const faceIdentify = require('../faceapi/faceIdentify')
const imageURL = require('../../config/faceapi_config')

exports.visitorList = async (req, next) => {
    const connection = await getConnection()
    try {
        return result = await visitorDao.visitorList(connection, req, next)
    } catch (e) {
        console.log(e.message)
        return e.message
    } finally {
        connection.release()
    }
}



exports.visitorCurrent = async (req, next) => {
    try {
        console.log(imageURL.imageURL+ req.file.transforms[0].key)
        const faceId = faceDetect(imageURL.imageURL+ req.file.transforms[0].key)
        // console.log(faceIdentify(faceId))
        const personId = '4b4d0073-2325-4e35-a674-e6d17c3cc86'
        //faceIdentify('f17947e0-b7a0-4351-85ed-d23beb27ee14')
        // faceIdentify(faceId)

        const result = await visitorDao.visitorCurrent(Transaction, req, next, personId)
        return result
    } catch (e) {
        console.log(e.message)
        return e.message
    }
}



exports.visitorAppend = async (req, next) => {
    const connection = await getConnection()
    try {
        return result = await visitorDao.visitorAppend(connection, req, next)
    } catch (e) {
        console.log(e.message)
        return e.message
    } finally {
        connection.release()
    }
}


exports.visitorModify = async (req, next) => {
    try {
        const result = await visitorDao.visitorModify(Transaction, req, next)
        return result
    } catch (e) {
        console.log(e.message)
        return e.message
    }
}