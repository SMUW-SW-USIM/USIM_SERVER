const moment = require('moment')
const { Transaction, getConnection } = require('../lib/dbConnection')
const recordDao = require('../dao/recordDao')

exports.recordList = async (req, next) => {
    const connection = await getConnection()
    try {
        return result = await recordDao.recordList(connection, req, next)
    } catch (e) {
        console.log(e.message)
        return e.message
    } finally {
        connection.release()
    }
}

exports.recordAppend = async (req, next) => {
    const connection = await getConnection()
    try {
        return result = await recordDao.recordAppend(connection, req, next)
    } catch (e) {
        console.log(e.message)
        return e.message
    } finally {
        connection.release()
    }
}