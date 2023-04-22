const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log(req)
    res.end('service provider working')
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