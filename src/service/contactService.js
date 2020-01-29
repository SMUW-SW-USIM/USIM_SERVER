const moment = require('moment')
const { Transaction, getConnection } = require('../lib/dbConnection')
const contactDao = require('../dao/contactDao')

exports.contactList = async (req, next) => {
    const connection = await getConnection()
    try {
        return result = await contactDao.contactList(connection, req, next)
    } catch (e) {
        console.log(e.message)
        return e.message
    } finally {
        connection.release()
    }
}

exports.contactAppend = async (req, next) => {
    const connection = await getConnection()
    try {
        return result = await contactDao.contactAppend(connection, req, next)
    } catch (e) {
        console.log(e.message)
        return e.message
    } finally {
        connection.release()
    }
}