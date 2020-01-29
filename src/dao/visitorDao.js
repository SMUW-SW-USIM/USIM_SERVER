exports.visitorList = (connection, req) => {
    return new Promise((resolve, reject) => {
        const Query = `SELECT v_name, v_gender, v_times, v_image, v_age FROM Visitor WHERE u_idx = ${req.user.u_idx};`
        connection.query(Query, (err, result) => {
            err && reject(err)
            resolve(result)
        })
    })
}

exports.visitorCurrent = (connection, req) => {
    return new Promise((resolve, reject) => {
        //const Query = `SELECT v_name, v_gender, v_times, v_image, v_age FROM Visitor WHERE u_idx = ${req.user.user_idx};`
        connection.query(Query, (err, result) => {
            err && reject(err)
            resolve(result)
        })
    })
}

exports.visitorAppend = (connection, req) => {
    return new Promise((resolve, reject) => {
        const Query = `INSERT INTO Visitor(u_idx, v_name, v_gender, v_times, v_image, v_age)
                           VALUES("${req.user.u_idx}", "${req.body.v_name}", "${req.body.v_gender}", "${req.body.v_times}", "${req.body.v_image}", "${req.body.v_age}")`;
        connection.query(Query, (err, result) => {
            err && reject(err)
            resolve(result)
        })
    })
}