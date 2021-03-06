const Joi = require('@hapi/joi')
const visitorService = require('../service/visitorService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')

exports.visitorList = async (req, res, next) => {
    try {
        const result = await visitorService.visitorList(req, next)
        response.respondJson(message.VISITOR_DATA_LIST_SUCCESS, result, res, statusCode.OK)
    } catch (e) {
        response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
    }
}

exports.visitorCurrent = async (req, res, next) => {
    try {
        const result = await visitorService.visitorCurrent(req, next)
        if (!result.length) response.respondJson(message.VISITOR_DETECT_FAIL, result, res, statusCode.OK)
        else response.respondJson(message.VISITOR_DETECT_SUCCESS, result, res, statusCode.OK)
    } catch (e) {
        response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
    }
}
exports.visitorAppend = async (req, res, next) => {
    try {
        const result = await visitorService.visitorAppend(req, next)
        response.respondJsonWithoutData(message.VISITOR_APPEND_SUCCESS, res, statusCode.CREATED)
    } catch (e) {
        response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
    }
}

exports.visitorModify = async (req, res, next) => {
    try {
        const result = await visitorService.visitorModify(req, next)
        response.respondJsonWithoutData(message.VISITOR_MODIFY_SUCCESS, res, statusCode.OK)
    } catch (e) {
        response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
    }
}