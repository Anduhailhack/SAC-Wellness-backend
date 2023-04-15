// Implement interfaces defined in IDatabase file, specific to mongo db
const mongoose = require('mongoose')

const MongoDb = function (connection, queryString) {
    //TODO: initiating the connection with database here
        mongoose
            .connect(connection)
            .then(() => console.log("Database Connection Successful"));
    
    //TODO: database URI can be taken from .env or can be set as a constant here

    // query from the request.body
    this.queryString = queryString
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

MongoDb.prototype.addStudent = async function(f_name, m_name, l_name, email, ed_info, diagnosis) {
    const {batch, department} = ed_info
    const {} = diagnosis

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

class APIFeatures {
    constructor(query, queryString){
        this.query = query
        this.queryString = queryString
    }
    
    filter(){
        //Exclude sort...
        // gte
        
        const queryObj = {...this.queryString}
        const exclude = ['sort', 'filter', 'limit', 'page']
        exclude.forEach(el => delete queryObj[el])

        const queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        queryObj = JSON.parse(queryStr)

        this.query = query.find(queryObj)
        
        // queryStr = queryStr.split(',').join(' ')
        return this
    }

    sort(){
        //filter the query
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = query.sort(sortBy)
        } else {
            // this.query = query.sort()                    //default sort type
        }

        return this
    }

    fields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select('-__v')             //default feilds
        }
    }

    page(){
        const limit = this.queryString.limit * 1
        const page = this.queryString.page * 1
        const skip = (page-1)*limit
        if(this.queryString.page){
            this.query = this.query.skip(skip).limit(limit)
        } else {
            this.query = this.query.limit(10)
        }
        
    }
}

MongoDb.prototype.getStudent = async function(queryString, res){        // needs the req.querey parameter
    
    // //Filtering the search req query 
    // const queryStr = {...queryString}
    // const excludeFields = ['sort', 'limit', 'page', 'fields']               

    // excludeFields.forEach(el => delete queryStr[el])                        //removing sort limit page and fields property from the query

    // queryStr = JSON.stringify(queryStr)
    // queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)          // reWriting gte gt lt lte as $gth $gt $lt $lte  -- Mongo command
    // queryStr = JSON.parse(queryStr)

    // const query = Student.find(query)


    // //Sorting the get resutl
    // if(queryStr.sort){
    // const sortString = queryStr.sort
    //     sortString = sortString.split(',').join(' ')

    //     query = query.sort(sortString)
    // } // else statement to add a default sort mechanism


    // //limiting the result to only the required value
    // if(queryStr.fields){
    //         const fiels = queryStr.fields.split(',').join(' ')
    //         query = query.select(fileds)
    //     } else {                // else return only the f_name and the phote_no
    //         query = query.select('f_name phone_no -__v')
    //     }

}


module.exports = {MongoDb}

