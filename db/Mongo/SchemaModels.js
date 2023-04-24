const mongoose = require('mongoose')

// Student's Schema and Model
const studentSchema = new mongoose.Schema({
    stud_id: {
        type: String,
        required: [true, 'Student ID cannot be set empty']
    },
    f_name: String,
    l_name: String,
    email: {
        type: String,
        required: [true, 'Email cannot be empty']
    },
    phone_no: {
        type: String,
        required: [true, 'Phone No cannot be empty']
    },
    telegram_id: String,
    ed_info: {
        batch: {
            type: String,
            // enum: ['PC1', 'PC2', 'C1', 'C2', 'intern']
        },
        department: String
    },
    diagnosis: [{}, {}, {}],
})
module.exports.Student = mongoose.model('Student', studentSchema)


// Admin's Schema and Model
const adminSchema = new mongoose.Schema({
    f_name: {
        type: String,
        required: [true, 'First name cannot be empty']
    }, 
    m_name: String,
    l_name: {
        type: String,
        required: [true, 'Last name cannot be empty']
    }, 
    email: {
        type: String,
        required: [true, 'Email cannot be emoty']
    },
    telegram_id: String,
    speciality: String,
    working_hour: String, 
    communication: String, 
    phone_no: {
        type: String,
        required: [true, "Admin Phone Number missing"]
     }
})
module.exports.Admin = mongoose.model('Admin', adminSchema)





// Physician's Schema and Model
const physicianSchema = new mongoose.Schema({
    stud_id: {
        type: String,
        required: [true, 'Student ID cannot be set empty']

    },
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
    phone_no: {
        type: String,
        required: [true, 'Phone No cannot be empty']
    },
    telegram_id: String,
    educational_bkg: {
        speciallity: {
            type: String
            //
        }
        //
    },
    work_exp:{

    },
    office_location: String, 
    availabile_at: {
        starting_time: {
            type: Date,
            required: [true, "Starting time must be set"]
        },
        ending_time: {
            type: Date,
            required: [true, "ending time must be set"]
        }

    }

})
module.exports.Physician = mongoose.model('Physician', physicianSchema)


// Requests
const requestSchema = new mongoose.Schema({
    studentId : {
        type: String,
        required: [true, 'Request needs to have an ID'],
    }, 
    reqTeamId: {
        type: String,
        required: [true, "Request team need to be stated"]
    },
    service_provider_id: {
        type: String,
        required: [true, 'Service Provider cannot be empty'],
    },
    urgency: String
})
module.exports.Requests = mongoose.model('Requests', requestSchema)


// Client Request

