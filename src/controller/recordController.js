const Joi = require('@hapi/joi')
const recordService = require('../service/recordService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')

exports.recordList = async (req, res, next) => {
    try {
        const result = await recordService.recordList(req, next)
        response.respondJson(message.RECORD_DATA_LIST_SUCCESS, result, res, statusCode.OK)
    } catch (e) {
        response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
    }
}

exports.recordAppend = async (req, res, next) => {
    try {
        const result = await recordService.recordAppend(req, next)
        response.respondJsonWithoutData(message.RECORD_APPEND_SUCCESS, res, statusCode.CREATED)
    } catch (e) {
        response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
    }
}