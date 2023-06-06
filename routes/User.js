const router = require("express").Router();
const { sendAppointmentRequest, recieveAppointmentRequest, sendBookingConfirmation,
    recieveBookingConfirmation } = require("../utils/AppointmentNotification");
require("dotenv").config();

const {db} = require('../Mongo/Mongo')

router.get("/", (req, res) => {
	console.log(req);
	res.json("user working");
});


/*
Send appointment request message to Service Provider
*/
router.post("/addRequest", (req, res) => {		//Checked
	try {
		const { stud_id, req_team_id, service_provider_id, issuedAt, urgency } = req.body;

		/*
		if (!stud_id || !req_team_id || !service_provider_id || !urgency || !issuedAt) {
			return res
			  .status(400)
			  .json({ message: "Please provide all required fields" });
		  }
	
		const request = {
			studentId : String(stud_id),
			requestTeamId: String(req_team_id),
			serviceProviderId: String(service_provider_id),
			IssuedAt: String(issuedAt),
			Urgency: String(urgency)
		}
	
		sendAppointmentRequest(request).then(() => {
			console.log("Appointment request sent to queue");
			res.send({RequestSentToQueue: request});
		  }).catch((err) => {
			console.error(err);
		  });
		  */
		
		db.addRequest(stud_id, req_team_id, service_provider_id, issuedAt, urgency, (result)=> {
			if(result.status)
				return res.status(200).json({ status: "success"});
			throw new Error("Request Adding failed")
		});
		
	} catch (error) {
		res.status(400).json({ status: "error", result: error });
	}
});

/*
Get appointment confirmation message from Service Provider
*/
router.get("/getAppointment", async (req, res) => {
	const { stud_id } = req.query;

	recieveBookingConfirmation().then((result) => {
		console.log(stud_id);
		console.log("Appointment confirmation recieved");

		if(stud_id){        
			//result.filter(stud_id);
			const confirmationMessages = result.appointmentConfirmation;
			const filteredResult = confirmationMessages.filter((appointment) => appointment.studentId === stud_id);   
			res.json(filteredResult);
		  }else{
			res.json(result);
		  }

	  }).catch((err) => {
		console.error(err);
	  });

	  /*
	db.getAppointments(stud_id, (appointment) => {
		res.status(200).json({ status: "success", result: appointment });
	});
	*/
});

router.get("/getMedicalHealthTeam", async (req, res) => {

	db.getMedicalHealthTeam((medicalHealthTeam) => {
		res.status(200).json({ status: "success", result: medicalHealthTeam });
	});
});

router.get("/getMentalHealthTeam", async (req, res) => {

	db.getMentalHealthTeam((mentalHealthTeam) => {
		res.status(200).json({ status: "success", result: mentalHealthTeam });
	});
});

router.get("/getAvailableMedicalHealthTeam", async (req, res) => {

	db.getAvailableMedicalHealthTeam((availableMedicalHealthTeam) => {
		res.status(200).json({
			status: "success",
			result: availableMedicalHealthTeam,
		});
	});
});

router.get("/getAvailableMentalHealthTeam", async (req, res) => {

	db.getAvailableMentalHealthTeam((availableMentalHealthTeam) => {
		res.status(200).json({
			status: "success",
			result: availableMentalHealthTeam,
		});
	});
});

/**
 * all private wproperties below this!
 */

let _createToken = (email, user_id) => {
	return jwt.sign(
		{ id: user_id, email: email, role: process.env.USER_ROLE },
		process.env.JWT_SECRET,
		{
			expiresIn: "3h",
		}
	);
};

let _sendEmail = (email, verification_code, callback) => {
	//TODO: configure nodemailer properly

	let transporter = nodemailer.createTransport({
		host: "gmail", //this used to work
		auth: {
			user: "youremail@gmail.com",
			pass: "youremailpassword",
		},
	});

	let contact = {
		from: "SAC wellness program <SAC@SAC.com>",
		to: email,
		text: verification_code,
	};
	transporter
		.sendMail(contact)
		.then((result) => callback(true))
		.catch((error) => callback(false));
};

module.exports = router;