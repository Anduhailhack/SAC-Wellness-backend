const process = require('process')
require('dotenv').config()

const {MongoDb} = require('./Mongo/Mongo') //Intellisense shows error on windows but it should work
const {MySQL} = require('./MySQL') //Intellisense shows error on windows because windows is case insensitive but it should work

const Database = function(dbms) {
    if (!dbms || dbms == 'mongo')
        this.dbms = new MongoDb(process.env.MONGO_CONF || '')
    else if (dbms == 'mysql')
        this.dbms = new MySQL(process.env.MYSQL_CONF || {})
    else if (dbms == 'test')
        this.dbms = undefined
}

Database.prototype.addAdmin = function(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no, callback) { 
    this.dbms.addAdmin(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no, callback)
} 

Database.prototype.addStudent = function(f_name, m_name, l_name, email, department, diagnosis, callback) {
    this.dbms.addStudent(f_name, m_name, l_name, email, department, diagnosis, callback)
}

Database.prototype.addServiceProvider = function(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no, callback) {
    this.dbms.addServiceProvider(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no, callback)
}

Database.prototype.addRequest = function(stud_id, req_team_id, service_provider_id, urgency, callback){
    this.dbms.addRequest(stud_id, req_team_id, service_provider_id, urgency, callback)
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

Database.prototype.getSPWorkingHours = function(callback){
    this.dbms.getSPWorkingHours(callback)
}

/**
 * 
 * @param {string} email 
 * @param {string} callback 
 * @returns an object with {_id, email} of the student
 */
Database.prototype.checkStudent = function(email, callback) {
    this.dbms.checkStudent(email, callback)
}

Database.prototype.checkAdmin = function(email, callback){
    this.dbms.checkAdmin(email, callback)
}

Database.prototype.checkServiceProvider = function(email, callback){
    this.dbms.checkServiceProvider(email, callback)
}

module.exports = {Database}
