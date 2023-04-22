<<<<<<< HEAD
const MongoDb = require('./Mongo/Mongo') //Intellisense shows error on windows but it should work
    .default //Intellisense shows error on windows but it should work
const {MySQL} = require('./MySQL') //Intellisense shows error on windows but it should work

const Database = function(dbms) {
    if (!dbms || dbms == 'mongo')
        this.dbms = new MongoDb(process.env.MONGO_CONNECTION)
=======
const process = require('process')

const {MongoDb} = require('./Mongo') //Intellisense shows error on windows but it should work
const {MySQL} = require('./MySQL') //Intellisense shows error on windows because windows is case insensitive but it should work
const { error } = require('console')

const Database = function(dbms) {
    if (!dbms || dbms == 'mongo')
        this.dbms = new MongoDb(process.env.MONGO_CONF || '')
>>>>>>> 6436e761969b6e45be44b1ae36ba25e10454dd82
    else if (dbms == 'mysql')
        this.dbms = new MySQL(process.env.MYSQL_CONF || {})
}

Database.prototype.addAdmin = function(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no) { 
    this.dbms.addAdmin(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no)
} 

Database.prototype.addStudent = function(f_name, m_name, l_name, email, department, diagnosis) {
    this.dbms.addStudent(f_name, m_name, l_name, email, department, diagnosis)
}

Database.prototype.addRequest = function(stud_id, req_team_id, service_provider_id, urgency){
    this.dbms.addRequest(stud_id, req_team_id, service_provider_id, urgency)
}

Database.prototype.getClientRequests = function(callback){
    this.dbms.getClientRequests(callback)
}

Database.prototype.getAppointment = function(stud_id, callback){
    this.dbms.getAppointment(stud_id, callback)
}

Database.prototype.getMedicalHealthTeam = function(callback){
    this.dbms.getMedicalHealthTeam(callback)
}

Database.prototype.getMentalHealthTeam = function(callback){
    this.dbms.getMentalHealthTeam(callback)
}

Database.prototype.getAvailableMedicalHealthTeam = function(callback){
    this.dbms.getAvailableMedicalHealthTeam(callback)
}

Database.prototype.getAvailableMentalHealthTeam = function(callback){
    this.dbms.getAvailableMentalHealthTeam(callback)
}

module.exports = {Database}