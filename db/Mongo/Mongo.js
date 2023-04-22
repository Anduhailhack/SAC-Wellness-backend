// Implement interfaces defined in IDatabase file, specific to mongo db
const mongoose = require('mongoose')

const {APISearchFeatures} = require('./APISearchFeatures')
const {Admin, Student, Physician} = require('./SchemaModels')

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

        // res.status(200).json({
        //     status: "success",
        //     data: {
        //         newAdmin
        //     }
        // })
    } catch (error) {
        // res.status(401).json({
        //     status: "failue"
        // })
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
        // res.status(200).json({
        //     status: "success",
        //     data: {
        //         newStudent
        //     }
        // })
    } catch (error) {
        // res.status(401).json({
        //     status: "failue"
        // })
        console.log("Error Creating a User");
    } 
}

MongoDb.prototype.addPhysician = async function(f_name, m_name, l_name, email) {
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
        // res.status(200).json({
        //     status: "success",
        //     data: {
        //         newPhysician
        //     }
        // })
    } catch (error) {
        // res.status(401).json({
        //     status: "failue"
        // })
        console.log("Error Creating a User");

    } 

}

        // GET Requests

MongoDb.prototype.getStudents = async function(queryString, reqQuery){        // needs the "Model.find()" query string and the "req.query" parameter
    
    const studAPI = new APISearchFeatures(queryString, reqQuery).filter().sort().fields().page()
    const gettedStuds = await studAPI.query

    return gettedStuds;
}

module.exports = {MongoDb}


