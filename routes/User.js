const express = require('express')
const {addStudent, getStudents} = require('./../db/Mongo/Mongo')

const router = express.Router()


router.get('/', (req, res) => {
    console.log(req)
    res.end('user working')
})

<<<<<<< HEAD
=======
router.post('/addStudent', (req, res) => {
    try {
        const {
            f_name, 
            m_name,
            l_name,
            email,
            department,
            diagnosis,
        } = req.body
        const db = new Database('mongo')
        db.addStudent(f_name, m_name, l_name, email, department, diagnosis)
        res.status(200).send({status : 'success'})
    } catch (error) {
        res.status(400).end({status : 'error'})
    }
})

router.post('/addRequest', (req, res) => {
    try {
        const {
            stud_id, 
            req_team_id,
            service_provider_id,
            urgency
        } = req.body
        const db = new Database('mongo')
        db.addRequest(stud_id, req_team_id, service_provider_id, urgency)
        res.status(200).send({status : 'success'})
    } catch (error) {
        res.status(400).end({status : 'error', result : error})
    }
})

router.get('/getAppointment', async (req, res) => {
    const {stud_id} = req.params;
    const db = new Database('mongo')

    db.getAppointment(stud_id, (appointment)=> {
        res.status(200).send({status : 'success', 'result' : appointment})
    })
})

router.get('/getMedicalHealthTeam', async (req, res) => {
    const db = new Database('mongo')

    db.getMedicalHealthTeam((medicalHealthTeam)=> {
        res.status(200).send({status : 'success', 'result' : medicalHealthTeam})
    })
})

router.get('/getMentalHealthTeam', async (req, res) => {
    const db = new Database('mongo')

    db.getMentalHealthTeam((mentalHealthTeam)=> {
        res.status(200).send({status : 'success', 'result' : mentalHealthTeam})
    })
})

router.get('/getAvailableMedicalHealthTeam', async (req, res) => {
    const db = new Database('mongo')

    db.getAvailableMedicalHealthTeam((availableMedicalHealthTeam)=> {
        res.status(200).send({status : 'success', 'result' : availableMedicalHealthTeam})
    })
})

router.get('/getAvailableMentalHealthTeam', async (req, res) => {
    const db = new Database('mongo')

    db.getAvailableMentalHealthTeam((availableMentalHealthTeam)=> {
        res.status(200).send({status : 'success', 'result' : availableMentalHealthTeam})
    })
})
>>>>>>> 6436e761969b6e45be44b1ae36ba25e10454dd82

module.exports = router