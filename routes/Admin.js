const express = require("express");
const router = express.Router();
const {db} = require('../Mongo/Mongo')

router.get("/", (req, res) => {
	res.end("admin working");
});

router.post("/signup", (req, res) => {
	try {
		const {
			f_name,
			m_name,
			l_name,
			email,
			speciality,
			working_hour,
			communication,
			phone_no,
		} = req.body;

		db.addAdmin(
			f_name,
			m_name,
			l_name,
			email,
			speciality,
			working_hour,
			communication,
			phone_no,
			(result)=> {
				if(result.status){
					return res.status(200).send({ status: "success" });
				} else 
					return res.status(400).send({ status: "error", result: error });
			}
		);
	} catch (error) {
		res.status(400).send({ status: "error", result: error });
	}
});

router.post("/addServiceProvider", (req, res) => {
	try {
		const {
			f_name,
			m_name,
			l_name,
			email,
			speciality,
			working_hour,
			communication,
			phone_no,
		} = req.body;
		db.addServiceProvider(
			f_name,
			m_name,
			l_name,
			email,
			speciality,
			working_hour,
			communication,
			phone_no,
			(result) => {
				if (result.status)
					res.status(200).send({
						status: "success",
						result: {
							msg: "Service provider added successfully.",
						},
					});
				else
					res.status(401).send({
						status: "error",
						result: {
							msg: "Adding service provider unsuccessfully.",
							data: result,
						},
					});
			}
		);
	} catch (error) {
		res.status(400).send({ status: "error", result: error });
	}
});

router.post("/getServiceProvider", (req, res) => {
	try {
		const {email} = req.body

		db.getServiceProviders({email}, (result)=> {
			if(result.status) {
				res.status(200).json({
					status: "success",
					data: result.result
				})
			}
			else
				throw new Error(result.msg)
		})
	} catch (error) {
		res.status(404).json({
			status: failed,
			name: error.name,
			msg: error.message
		})
	}
})

/*
Also add recieveAppointmentRequest for notification 
*/
router.get("/getRequests", (req, res) => {	//Checked
	try {
		const {stud_id, req_team,_id, service_provider_id, issuedAt} = req.body

		/**
			recieveAppointmentRequest().then((result) => {
				console.log("Appointment request recieved from queue");
				res.json(result);
				
			}).catch((err) => {
				console.error(err);
			});		
		 */

		db.getRequests({stud_id, req_team,_id, service_provider_id, issuedAt}, (result)=> {
			if(result.status) {
				res.status(200).json({
					status: "success",
					data: result.result
				})
			}
			else
			res.status(404).json({
				status: "failed",
				msg: result.msg
			})
		})
	} catch (error) {
		console.log(error);
		res.status(404).json({
			status: "failed",
			name: error.name,
			msg: error.message
		})
	}
})

router.get('/getAppointments', (req, res) => {
    try {
        const {
            student_id,
            request_id,
            serviceProvider,
            time,
            remark
        } = req.body

        const reqQueryObj = {student_id, request_id, serviceProvider, time, remark}

        db.getAppointments(reqQueryObj, (result) => {
            if(result.status){
                res.status(200).send({
                    status : 'success', 
                    result : {
                        msg : 'Appointments fetched succefully.',
                        data : result.result
                    }
                })
            } else{
                res.status(404).json({
                    status: 'error',
                    msg: 'No appointment found'
                })
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'error',
            msg: error.message
        })
    }
})

module.exports = router;