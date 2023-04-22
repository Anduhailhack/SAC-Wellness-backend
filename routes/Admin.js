const express = require('express')
const {Database} = require('../db/IDatabase')
const router = express.Router()

router.get('/', (req, res) => {
    res.end('admin working')
})

router.post('/addAdmin', (req, res)=>{
    try {
        const {
            f_name,
            m_name,
            l_name,
            email,
            speciality,
            working_hour,
            communication,
            phone_no
        } = req.body
        const db = new Database('mongo')
        db.addAdmin(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no)
        res.status(200).send({status : 'success'})
    } catch (error) {
        res.status(400).send({status : 'error', result : error})
    }
})

router.post('/addServiceProvider', (req, res)=>{
    try {
        const {
            f_name,
            m_name,
            l_name,
            email,
            speciality,
            working_hour,
            communication,
            phone_no
        } = req.body
        const db = new Database('mongo')
        db.addServiceProvider(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no)
        res.status(200).send({status : 'success'})
    } catch (error) {
        res.status(400).send({status : 'error', result : error})
    }
})

router.get('/getClientRequests', async (req, res) => {
    const db = new Database('mongo')
    db.getClientRequests((clientRequests)=>{
        res.status(200).send({status : 'success', result : clientRequests})
    })
})

router.post('/setWebhookClientRequests', async (req, res) => {
    try {
        const {
            url
        } = req.body
        const db = new Database('mongo')
        db.setWebhookClientReqests(url)
        res.status(200).send({status : 'success'})
    } catch (error) {
        res.status(400).send({status : 'error', result : error})
        return
    }
})

module.exports = router