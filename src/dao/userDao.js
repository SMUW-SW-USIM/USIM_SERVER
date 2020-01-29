exports.signIn = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `
        SELECT * FROM User WHERE u_id = '${data.u_id}'
        `
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

exports.signUp = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `
        INSERT INTO User(u_name, u_id, u_salt, u_pw) 
        VALUES("${data.u_name}", "${data.u_id}", "${data.u_salt}", "${data.u_pw}")
        `
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

exports.duplicateId = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `
        SELECT * FROM User WHERE u_id = '${data.u_id}'
        `
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}
