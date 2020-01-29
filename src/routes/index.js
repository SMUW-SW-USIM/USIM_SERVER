const { Router } = require('express')
const router = Router()


const users = require('./users')
const visitors = require('./visitors')
const records = require('./records')
const contacts = require('./contacts')

router.use('/users', users)
router.use('/visitors', visitors)
router.use('/records', records)
router.use('/contacts', contacts)

module.exports = router
