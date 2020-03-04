const moment = require('moment')
const { Transaction, getConnection } = require('../lib/dbConnection')
const visitorDao = require('../dao/visitorDao')


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
    const connection = await getConnection()
    try {
        return result = await visitorDao.visitorCurrent(connection, req, next)
    } catch (e) {
        console.log(e.message)
        return e.message
    } finally {
        connection.release()
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