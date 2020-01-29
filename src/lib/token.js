const jwt = require('jsonwebtoken')
const secretKey = require('../../config/jwt.secretKey')

exports.encode = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey.development, {
      issuer: 'usim',
      algorithm: 'HS256',
      expiresIn: 60000 * 60 * 24 * 10 * 10 * 10, // 1000일
    }, (err, result) => {
      err && reject(new Error(err))
      resolve(result)
    })
  })
}

exports.decode = (token) => {
  return new Promise((resolve) => {
    jwt.verify(token, secretKey.development, (err, decoded) => {
      if (err) {
        console.log(err)
        resolve({})
      }
      resolve(decoded)
    })
  })
}
