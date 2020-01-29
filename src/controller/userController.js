const Joi = require('@hapi/joi')
const userService = require('../service/userService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')

exports.signUp = async (req, res) => {
  const { u_name, u_id, u_pw } = req.body
  const schema = Joi.object({
    u_name: Joi.string().required(),
    u_id: Joi.string().required(),
    u_pw: Joi.string().required(),
  })

  const validationData = { u_name, u_id, u_pw }
  try {
    const { error } = await schema.validateAsync(validationData)

    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }
    // 아이디 중복확인
    const result = await userService.duplicateId(validationData)

    if (result) {
      // 아이디 중복확인 성공하면 회원가입 진행
      await userService.signUp(validationData)
      response.respondJsonWithoutData(message.SIGN_UP_INSERT_SUCCESS, res, statusCode.CREATED)
    } else {
      response.respondJsonWithoutData(message.INVALID_ID, res, statusCode.DUPLICATED)
    }

  } catch (e) {
    response.respondOnError(e.message, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}

exports.signIn = async (req, res) => {
  const { u_id, u_pw } = req.body

  const schema = Joi.object({
    u_id: Joi.string().required(),
    u_pw: Joi.string().required(),
  })

  const validationData = { u_id, u_pw }

  try {
    const { error } = await schema.validateAsync(validationData)

    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }
    const result = await userService.signIn(validationData)
    if (result) {
      return response.respondJson(message.SIGN_IN_SUCCESS, { token: result }, res, statusCode.OK)
    }
    return response.respondJsonWithoutData(message.SIGN_IN_ERROR, res, statusCode.FORBIDDEN)

  } catch (e) {
    return response.respondOnError(e.message, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}


exports.duplicateId = async (req, res) => {
  const { u_id } = req.body

  const schema = Joi.object({
    u_id: Joi.string().required(),
  })

  const validationData = { u_id }

  try {
    const { error } = await schema.validateAsync(validationData)

    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }

    const result = await userService.duplicateId(validationData)

    if (result) {
      response.respondJsonWithoutData(message.VALID_ID, res, statusCode.CREATED)
    } else {
      response.respondJsonWithoutData(message.INVALID_ID, res, statusCode.DUPLICATED)
    }
  } catch (e) {
    response.respondOnError(e.message, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}
