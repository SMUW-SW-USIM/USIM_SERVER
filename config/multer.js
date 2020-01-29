const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3-transform')
const shortid = require('shortid')
const moment = require('moment')
const _ = require('lodash')
const sharp = require('sharp')

const awsConfig = './config/aws_config.json'

aws.config.loadFromPath(awsConfig)
const s3 = new aws.S3()


module.exports = {
    multer: (which, options = {}) => {
        let opt = {
            // 기본 옵션
            s3,
            bucket: 'care-direction',
            CacheControl: 'max-age = 31536000',
            acl: 'public-read-write',
            key(req, file, cb) {
                cb(null, `${which}/origin/${shortid.generate()}.${Date.now()}.${file.originalname.split('.').pop()}`)
            },
        }
        if (which === 'product') {
            opt = _.defaultsDeep({
                ...options,
                acl: 'public-read',
                shouldTransform: (req, file, cb) => {
                    cb(null, /^image/i.test(file.mimetype))
                },
                transforms: [{
                    id: 'original',
                    key: (req, file, cb) => {
                        cb(null, `${which}/origin/${shortid.generate()}.${Date.now()}.${file.originalname.split('.').pop()}`)
                    },
                    transform: (req, file, cb) => {
                        cb(null, sharp().png())
                    },
                    originalname: (req, file, cb) => {
                        cb(null, `${file.originalname}`)
                    },
                }],
            }, opt)
        } else if (which === 'article/main') {
            opt = _.defaultsDeep({
                ...options,
                acl: 'public-read',
                shouldTransform: (req, file, cb) => {
                    cb(null, /^image/i.test(file.mimetype))
                },
                transforms: [{
                    id: 'original',
                    key: (req, file, cb) => {
                        cb(null, `${which}/origin/${shortid.generate()}.${Date.now()}.${file.originalname.split('.').pop()}`)
                    },
                    transform: (req, file, cb) => {
                        cb(null, sharp().png())
                    },
                    originalname: (req, file, cb) => {
                        cb(null, `${file.originalname}`)
                    },
                }],
            }, opt)
        } else if (which === 'article/sub') {
            opt = _.defaultsDeep({
                ...options,
                acl: 'public-read',
                shouldTransform: (req, file, cb) => {
                    cb(null, /^image/i.test(file.mimetype))
                },
                transforms: [{
                    id: 'original',
                    key: (req, file, cb) => {
                        cb(null, `${which}/origin/${shortid.generate()}.${Date.now()}.${file.originalname.split('.').pop()}`)
                    },
                    transform: (req, file, cb) => {
                        cb(null, sharp().png())
                    },
                    originalname: (req, file, cb) => {
                        cb(null, `${file.originalname}`)
                    },
                }],
            }, opt)
        } else if (which === 'ect'){
            opt = _.defaultsDeep({
                ...options,
                acl: 'public-read',
                shouldTransform: (req, file, cb) => {
                    cb(null, /^image/i.test(file.mimetype))
                },
                transforms: [{
                    id: 'original',
                    key: (req, file, cb) => {
                        cb(null, `${which}/origin/${shortid.generate()}.${Date.now()}.${file.originalname.split('.').pop()}`)
                    },
                    transform: (req, file, cb) => {
                        cb(null, sharp().png())
                    },
                    originalname: (req, file, cb) => {
                        cb(null, `${file.originalname}`)
                    },
                }],
            }, opt)
        }  else {
            throw new Error('S3 Image Associate Error')
        }
        return multer({ storage: multerS3(opt) })
    },
}
