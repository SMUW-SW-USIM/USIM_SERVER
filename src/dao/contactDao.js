exports.contactList = (connection, req) => {
    return new Promise((resolve, reject) => {
        const Query = `SELECT c_name,c_number FROM Contact WHERE u_idx = ${req.user.u_idx};`
        connection.query(Query, (err, result) => {
            err && reject(err)
            resolve(result)
        })
    })
}

exports.contactAppend = (connection, req) => {
    return new Promise((resolve, reject) => {
        const Query = `INSERT INTO Contact(u_idx, c_number, c_name)
                           VALUES("${req.user.u_idx}", "${req.body.c_number}", "${req.body.c_name}")`;
        connection.query(Query, (err, result) => {
            err && reject(err)
            resolve(result)
        })
    })
}