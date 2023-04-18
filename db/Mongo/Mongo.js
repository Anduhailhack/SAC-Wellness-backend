// Implement interfaces defined in IDatabase file, specific to mongo db
const mongoose = require('mongoose')

const APISearchFeatures = require('./APISearchFeatures')

const MongoDb = function (connection) {
    //TODO: initiating the connection with database here
        mongoose
            .connect(connection)
            .then(() => console.log("Database Connection Successful"));
    
    //TODO: database URI can be taken from .env or can be set as a constant here

    // // query from the request.body
    // this.queryString = queryString
}

MongoDb.prototype.addAdmin =  async function(f_name, m_name, l_name, email, speciality, working_hour, communication, phone_no) {
    //TODO: putting admin information in a mongo database
    const adminSchema = new mongoose.Schema({
        f_name: {
            type: String,
            required: [true, 'First name cannot be empty']
        }, 
        m_name: String,
        l_name: {
            type: String,
            required: [true, 'Last name cannot be empty']
        }, email: {
            type: String,
            required: [true, 'Email cannot be emoty']
        },
         speciality: String,
         working_hour: String, 
         communication: Sting, 
         phone_no: {
            type: String,
            required: [true, "Admin Phone Number missing"]
         }
    })

    const Admin = mongoose.model('Admin', adminSchema)

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

        res.status(200).json({
            status: "success",
            data: {
                newAdmin
            }
        })
    } catch (error) {
        res.status(401).json({
            status: "failue"
        })
    }
}

const studentSchema = new mongoose.Schema({
    f_name: String,
    l_name: String,
    email: {
        type: String,
        required: [true, 'Email cannot be emoty']
    },
    ed_info: {
        batch: String,
        department: String
    },
    diagnosis: {

    }
})
const Student = mongoose.model('Student', studentSchema)

// MongoDb.prototype.addStudent = async function(f_name, m_name, l_name, email, ed_info, diagnosis) {
//     const {batch, department} = ed_info
//     const {} = diagnosis

//     try {
//         const newStudent = await Student.create({
//             f_name, 
//             m_name, 
//             l_name, 
//             email,
//             ed_info, 
//             diagnosis
//         })

//         res.status(200).json({
//             status: "success",
//             data: {
//                 newStudent
//             }
//         })
//     } catch (error) {
//         res.status(401).json({
//             status: "failue"
//         })
//     } 


// }



MongoDb.prototype.addPhysician = async function(f_name, m_name, l_name, email) {
    const {batch, department} = ed_info
    const {} = diagnosis

    const physicianSchema = new mongoose.Schema({
        f_name: {
            type: String,
            required: [true, 'First name cannot be empty'],
        },
        l_name: {
            type: String,
            required: [true, 'Last name cannot be empty'],
        },
        email: {
            type: String,
            required: [true, 'Email cannot be emoty']
        },

    })
    const Physician = mongoose.model('Physician', physicianSchema)


    try {
        const newPhysician = await Physician.create({
            f_name, 
            m_name, 
            l_name, 
            email,
            ed_info, 
            diagnosis
        })

        res.status(200).json({
            status: "success",
            data: {
                newPhysician
            }
        })
    } catch (error) {
        res.status(401).json({
            status: "failue"
        })
    } 

}



        // Get Requests

// MongoDb.prototype.getStudents = async function(queryString, reqQuery){        // needs the Model.find query string and the req.querey parameter
    
//     const studAPI = new APISearchFeatures(queryString, reqQuery).filter().sort().fields().page()
//     const gettedStuds = await studAPI.query

//     return gettedStuds;
// }


exports.addStudent = async function(f_name, m_name, l_name, email, ed_info, diagnosis) {
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

        res.status(200).json({
            status: "success",
            data: {
                newStudent
            }
        })
    } catch (error) {
        res.status(401).json({
            status: "failue"
        })
    } 


}

exports.getStudents = async function(queryString, reqQuery){        // needs the Model.find query string and the req.querey parameter
    
    const studAPI = new APISearchFeatures(queryString, reqQuery).filter().sort().fields().page()
    const gettedStuds = await studAPI.query

    return gettedStuds;
}

// module.exports = {MongoDb}


