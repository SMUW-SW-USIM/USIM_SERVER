exports.visitorList = (connection, req) => {
    return new Promise((resolve, reject) => {
        const Query = `SELECT v_name, v_gender, v_times, v_age, v_faceId FROM Visitor WHERE u_idx = "${req.user.u_idx}";`
        connection.query(Query, (err, result) => {
            err && reject(err)
            resolve(result)
        })
    })
}



exports.visitorCurrent = (Transaction, req, next, personId) => {
    return Transaction(async (connection) => {
        const Query = `SELECT v_name, v_gender, v_times, v_age FROM Visitor 
                     WHERE u_idx = "${req.user.u_idx}" AND v_faceId = "${personId}"`;
        const v_data = await connection.query(Query);
        return v_data
    }).catch(error => {
        return next(error)
    })
}

exports.visitorAppend = (connection, req) => {
    return new Promise((resolve, reject) => {
        const Query = `INSERT INTO Visitor(u_idx, v_name, v_gender, v_times, v_age, v_faceId)
                           VALUES("${req.user.u_idx}", "${req.body.v_name}", "${req.body.v_gender}", "${req.body.v_times}", "${req.body.v_age}", "${req.body.v_faceId}")`;
        connection.query(Query, (err, result) => {
            err && reject(err)
            resolve(result)
        })
    })
}



exports.visitorModify = (Transaction, req, next) => {
    return Transaction(async (connection) => {
        const Query1 = `SELECT v_idx FROM Visitor WHERE v_faceId="${req.body.v_faceId}"`
        const v_idx = await connection.query(Query1)
        const Query2 = `UPDATE Visitor 
                SET v_name = "${req.body.v_name}",
                v_gender = "${req.body.v_gender}",
                v_times = "${req.body.v_times}",
                v_age = "${req.body.v_age}"
                WHERE v_idx=${v_idx[0].v_idx}`
        await connection.query(Query2)
    }).catch(error => {
        return next(error)
    })
}