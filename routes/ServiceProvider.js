const express = require('express')
const router = express.Router()
const { sendAppointmentRequest, recieveAppointmentRequest, sendBookingConfirmation,
    recieveBookingConfirmation } = require("../utils/AppointmentNotification");


const {db} = require('../Mongo/Mongo')

const {Request} = require('./../Mongo/SchemaModels')

router.get('/', (req, res) => {
    console.log(req)
    res.end('service provider working')
})

router.post('/login', (req, res) => {
    try {
        const {
            email
        } = req.body

        if (!validator.isEmail(email))
        {
            res.status(400).json({status : 'error', result : "Invalid email : email should look like eg. example@example.com"})
            return
        }

        db.checkServiceProvider(email, (result) => {
            if (result.status){
                _sendEmail(result.email, _createToken(result.email, result._id), (isSuccess) => {
                    if (isSuccess)
                        res.status(200).json({status : 'success', result : {
                            msg : 'You should receive an email, with a verification token.'
                        }})
                    else
                        res.status(500).json({status : 'error', result : error})
                })
            }
            else
                res.status(401).json({status : 'unauthorized', result : result})
        })
        
    } catch (error) {
        res.status(400).json({status : 'error', result : {msg : error}})
    }
})

router.post('/verify', (req, res) => {
    try {
        const { token } = req.body

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken.hasOwnProperty('id') 
                    || !decodedToken.hasOwnProperty('email')
                    || !decodedToken.hasOwnProperty('role')
                    || decodedToken.role !== process.env.SP_ROLE){
                res.status(403).json({status : 'error', result : {msg : 'Invalid token, please login again'}})
            }else {
                res.cookie("token", token, {
                    httpOnly : true
                }).json({
                    status : 'success', 
                    result : {
                        msg : 'Authenticated successfully.', 
                        token : token
                    }
                })
            }
        })
    } catch (error) {
        res.status(400).json({status : 'error'})
    }
})

/*
Send confiramtion message to Users
*/
router.post('/setAppointment', (req, res) => {      //Checked
    try {   
        const {
            student_id,
            request_id,
            serviceProvider,
            time,
            remark
        } = req.body

        if (!student_id || !request_id || !serviceProvider || !time || !remark) {
			return res
			  .status(400)
			  .json({ message: "Please provide all required fields" });
		  }
	
		const confirmationMessage = {
			studentId : String(student_id),
			requestTeamId: String(request_id),
			serviceProvider: String(serviceProvider),
			Time: String(time),
			Remark: String(remark)
		}

        
        db.setAppointment(student_id, request_id, serviceProvider, time, remark, (result)=>{
            // TODO: Find the request with its _id and set the status 'updated'
            if (result.status){
                res.status(200).json({status : 'success', result : {msg : 'Appointment set successfully.'}})
            }
            else 
                res.status(501).json({status : 'error', result : {msg : 'Setting appointment was unsuccessful.'}})
        })
        

        //Confirmation Message to queue
		sendBookingConfirmation(confirmationMessage).then(() => {
			console.log("Confirmation message sent to queue");
			res.send({ConfirmationSentToQueue: confirmationMessage});
		  }).catch((err) => {
			console.error(err);
		  });

    } catch (error) {
        res.status(501).json({status : 'error', result : {msg : 'Setting appointment was unsuccessful.'}})
    }
})

router.get('/getAppointments', (req, res)=>{
    try {
            const {service_provider_id} = req.body
        
            db.getAppointments({service_provider_id}, (result)=>{
                if(result.status)
                    res.status(200).json({
                        status: "success",
                        data: result.result
                    })
                else 
                    res.status(400).json({
                        status: "failed",
                        msg: result.msg
                    })
            })
    } catch (error) {
        res.status(404).status({
            status: "failed",
            msg: "Can not Get Appointments"
        })
    }
})

/** 
 * all private properties below this!
 */

let _createToken = (email, user_id) => {
    return jwt.sign({id : user_id, email : email, role : process.env.SP_ROLE}, process.env.JWT_SECRET, {
        expiresIn : '3h'
    })
}

let _sendEmail = (email, verification_code, callback) => {
    //TODO: configure nodemailer properly

    let transporter = nodemailer.createTransport({
        host : 'gmail', //this used to work
        auth : {
            user : 'youremail@gmail.com',
            pass : 'youremailpassword'
        }
    })

    let contact = {
        from : 'SAC wellness program <SAC@SAC.com>',
        to : email,
        text : verification_code
    }
    transporter.sendMail(contact).then(result => callback(true)).catch(error => callback(false))

}

module.exports = router
