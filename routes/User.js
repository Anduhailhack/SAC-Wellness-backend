const express = require('express')
const {addStudent, getStudents} = require('./../db/Mongo/Mongo')

const router = express.Router()


router.get('/', (req, res) => {
    console.log(req)
    res.end('user working')
})


module.exports = router