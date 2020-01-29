exports.recordList = (connection, req) => {
    return new Promise((resolve, reject) => {
        const Query = `SELECT r_name, r_info FROM Record WHERE u_idx = ${req.user.u_idx};`
        connection.query(Query, (err, result) => {
            err && reject(err)
            resolve(result)
        })
    })
}

exports.recordAppend = (connection, req) => {
    return new Promise((resolve, reject) => {
        const Query = `INSERT INTO Record(u_idx, r_name, r_info)
                           VALUES("${req.user.u_idx}", "${req.body.r_name}", "${req.body.r_info}")`;
        connection.query(Query, (err, result) => {
            err && reject(err)
            resolve(result)
        })
    })
}