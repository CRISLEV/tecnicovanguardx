const express = require('express')
const router = express.Router()

router.use('/employees', require('./employees.routes'))

module.exports = router