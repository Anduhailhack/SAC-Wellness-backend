// Implement interfaces defined in IDatabase file, specific to mongo db
const mongoose = require('mongoose')

const {APISearchFeatures} = require('./APISearchFeatures')
const {Admin, Student, Physician, Requests} = require('./SchemaModels')

const MongoDb = function (connection) {
    //TODO: initiating the connection with database here
        mongoose
            .connect(connection)
            .then(() => console.log("Database Connection Successful"));
    
    //TODO: database URI can be taken from .env or can be set as a constant here

}

        // POST Requests

MongoDb.prototype.addAdmin =  async function(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no) {
    //TODO: putting admin information in a mongo database

    try {
        const newAdmin = await Admin.create({
            f_name,
            m_name, 
            l_name, 
            email, 
            speciality, 
            working_hour, 
            communication, 
            phone_no
        })
        console.log("User created successfully");

    } catch (error) {
        console.log("Error Creating a user");
    }
}

        // Why don't we pass the req.body object as an argument? It will be better handling the respone here?
MongoDb.prototype.addStudent = async function(f_name, m_name, l_name, email, ed_info, diagnosis) {
    const {batch, department} = ed_info
    const {} = diagnosis

    try {
        const newStudent = await Student.create({
            f_name, 
            m_name, 
            l_name, 
            email,
            ed_info, 
            diagnosis
        })
        console.log("User created successfully");

    } catch (error) {
        console.log("Error Creating a User");
    } 
}

MongoDb.prototype.addServiceProvider = async function(f_name, m_name, l_name, email) {
    const {batch, department} = ed_info
    const {} = diagnosis

    try {
        const newPhysician = await Physician.create({
            f_name, 
            m_name, 
            l_name, 
            email,
            ed_info, 
            diagnosis
        })
        console.log("User created successfully");

    } catch (error) {
        console.log("Error Creating a User");
    } 

}

MongoDb.prototype.addRequest = async function(stud_id, req_team_id, service_provider_id, urgency){f
    try {
            const newRequest = await Requests.create({
                stud_id,
                req_team_id, 
                service_provider_id, 
                urgency
            })

            console.log("Request created");
    } catch (error) {
            console.log("Error: Request not created.");
    }
}
        // GET Requests


MongoDb.prototype.getAdmins = async function(queryStr, callback){        // needs the "Model.find()" query string and the "req.query" parameter
            const adminAPI = new APISearchFeatures(Admin.find(), queryStr).filter().sort().fields().page()
            const gettedAdmins = await adminAPI.query
        
            callback(gettedAdmins)
        }

MongoDb.prototype.getStudents = async function(queryStr, callback){        // needs the "Model.find()" query string and the "req.query" parameter
    
    const studAPI = new APISearchFeatures(Student.find(), queryStr).filter().sort().fields().page()
    const gettedStuds = await studAPI.query

    callback(gettedStuds)
}


//Get Mental Health Team  => getPhysicial as all are mental doctors
MongoDb.prototype.getMentalHealthTeam = async function(queryStr, callback){
    const mentalPhysicians = new APISearchFeatures(Physician.find(), queryStr).filter().sort().fields().page()
    const gettedPhys = await mentalPhysicians.query

    callback(gettedPhys)
} 

MongoDb.prototype.getAvailableMentalHealthTeam = async function(callback){
    const mentalPhysicians = new APISearchFeatures(Physician.find({available : true})).sort().fields().page()
    const gettedPhys = await mentalPhysicians.query

    callback(gettedPhys)
} 


module.exports = {MongoDb}


