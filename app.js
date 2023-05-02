const express = require('express')
const process = require('process')
const cookieParser = require('cookie-parser')
const {Database} = require('./db/IDatabase')
require('dotenv').config()

const user = require('./routes/User')
const admin = require('./routes/Admin')
const serviceProvider = require('./routes/ServiceProvider')

const {serviceProviderAuth} = require('./auth/ServiceProvidersAuth')
const {adminAuth} = require('./auth/AdminAuth')
const {userAuth} = require('./auth/UserAuth')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use('/user', userAuth, user)
app.use('/admin', adminAuth, admin)
app.use('/service-provider', serviceProviderAuth, serviceProvider)

const db = new Database('mongo')

app.post('/setWebhookClientRequests', async (req, res) => {
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

const ADDR = process.env.ADDR || '127.0.0.1'
const PORT = process.env.PORT || 5000

app.listen(PORT, ADDR, ()=>{
    console.log(`Server started ${ADDR}:${PORT}`)
})
