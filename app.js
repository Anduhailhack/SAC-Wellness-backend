const express = require('express')
const process = require('process')

const user = require('./routes/User')
const admin = require('./routes/Admin')
const serviceProvider = require('./routes/ServiceProvider')

const {serviceProviderAuth} = require('./auth/ServiceProvidersAuth')
const {adminAuth} = require('./auth/AdminAuth')
const {userAuth} = require('./auth/UserAuth')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/user', userAuth, user)
app.use('/admin', adminAuth, admin)
app.use('/service-provider', serviceProviderAuth, serviceProvider)

const ADDR = process.env.ADDR || '127.0.0.1'
const PORT = process.env.PORT || 5000

app.listen(PORT, ADDR, ()=>{
    console.log(`Server started ${ADDR}:${PORT}`)
})