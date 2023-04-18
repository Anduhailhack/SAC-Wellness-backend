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

export const Admin = mongoose.model('Admin', adminSchema)



// Student's Schema and Model
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
export const Student = mongoose.model('Student', studentSchema)


// Physician's Schema and Model
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
export const Physician = mongoose.model('Physician', physicianSchema)