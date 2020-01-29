const Joi = require('@hapi/joi')
const contactService = require('../service/contactService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')

exports.contactList = async (req, res, next) => {
    try {
        const result = await contactService.contactList(req, next)
        response.respondJson(message.CONTACT_DATA_LIST_SUCCESS, result, res, statusCode.OK)
    } catch (e) {
        response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
    }
}

exports.contactAppend = async (req, res, next) => {
    try {
        const result = await contactService.contactAppend(req, next)
        response.respondJsonWithoutData(message.CONTACT_APPEND_SUCCESS, res, statusCode.CREATED)
    } catch (e) {
        response.respondOnError(message.INTERNAL_SERVER_ERROR, res, statusCode.INTERNAL_SERVER_ERROR)
    }
}