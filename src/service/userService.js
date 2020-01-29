const crypto = require('crypto')
const { Transaction, getConnection } = require('../lib/dbConnection')
const userDao = require('../dao/userDao')
const jwt = require('../lib/token')


// eslint-disable-next-line consistent-return
exports.signUp = async (data) => {
  const connection = await getConnection()
  // crypto
  data.u_salt = Math.round((new Date().valueOf() * Math.random()))
  data.u_pw = crypto.createHash('sha512').update(data.u_pw + data.u_salt).digest('hex')

  try {
    await userDao.signUp(connection, data)
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}

// eslint-disable-next-line consistent-return
exports.signIn = async (data) => {
  const connection = await getConnection()
  try {
    const result = await userDao.signIn(connection, data)

    const password = crypto.createHash('sha512').update(data.u_pw + result.u_salt).digest('hex')

    if (result.u_pw === password) {
      return jwt.encode({ u_idx: result.u_idx })
    }
    return false

  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}


exports.duplicateId = async (data) => {
  const connection = await getConnection()

  try {
    const result = await userDao.duplicateId(connection, data)

    if (!result) {
      return true
    }
    return false
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}

