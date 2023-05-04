const express = require("express");
const process = require("process");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { Database } = require("./db/IDatabase");
const { createToken } = require("./utils/JWT");
const { sendEmail, validator } = require("./utils/Email");
require("dotenv").config();

const user = require("./routes/User");
const admin = require("./routes/Admin");
const serviceProvider = require("./routes/ServiceProvider");

const { serviceProviderAuth } = require("./auth/ServiceProvidersAuth");
const { adminAuth } = require("./auth/AdminAuth");
const { userAuth } = require("./auth/UserAuth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/********************USER***********************/
app.use("/user/login", (req, res) => {
	try {
		const { email } = req.body;

		const db = new Database("mongo");
		if (!validator.isEmail(email)) {
			res.status(400).json({
				status: "error",
				result: "Invalid email : email should look like eg. example@example.com",
			});
			return;
		}

		db.checkStudent(email, (result) => {
			if (result.status) {
				sendEmail(
					result.email,
					createToken(
						result.email,
						result._id,
						process.env.USER_ROLE
					),
					(isSuccess) => {
						if (isSuccess)
							res.status(200).json({
								status: "success",
								result: {
									msg: "You should receive an email, with a verification token.",
								},
							});
						else
							res.status(500).json({
								status: "error",
								result: {
									msg: "Could not send an email.",
								},
							});
					}
				);
			} else
				res.status(401).json({
					status: "unauthorized",
					result: result,
				});
		});
	} catch (error) {
		res.status(400).json({ status: "error", result: { msg: error } });
	}
});

app.use("/user/signup", (req, res) => {
	try {
		const {
			stud_id,
			f_name,
			l_name,
			email,
			phone_no,
			telegram_id,
			ed_info,
			diagnosis,
		} = req.body;

		if (!validator.isEmail(email)) {
			res.status(400).json({
				status: "error",
				result: "Invalid email : email should look like example@example.com",
			});
			return;
		}

		const db = new Database("mongo");
		db.addStudent(
			stud_id,
			f_name,
			l_name,
			email,
			phone_no,
			telegram_id,
			ed_info,
			diagnosis,
			(result) => {
				if (result.status) {
					db.checkStudent(email, (result) => {
						if (result.status) {
							sendEmail(
								result.email,
								createToken(
									result.email,
									result._id,
									process.env.USER_ROLE
								),
								(isSuccess) => {
									if (isSuccess)
										res.status(200).json({
											status: "success",
											result: {
												msg: "You should receive an email, with a verification token.",
											},
										});
									else
										res.status(500).json({
											status: "error",
											result: error,
										});
								}
							);
						} else
							res.status(401).json({
								status: "error",
								result: result.err,
							});
					});
				} else {
					res.status(400).json({
						status: "error",
						result: {
							msg:
								result.err.code === 11000
									? "Email already exists."
									: "Error in adding a user to database.",
							err: result.err,
						},
					});
				}
			}
		);
	} catch (error) {
		res.status(500).json({
			status: "error",
			result: { msg: "Error in the system." },
		});
	}
});

app.post("/user/verify", (req, res) => {
	try {
		const { token } = req.body;

		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (
				err ||
				!decodedToken.hasOwnProperty("id") ||
				!decodedToken.hasOwnProperty("email") ||
				!decodedToken.hasOwnProperty("role") ||
				decodedToken.role !== process.env.USER_ROLE
			) {
				res.status(403).json({
					status: "unauthorized",
					result: { msg: "Invalid token, please login again" },
				});
			} else {
				res.cookie("token", token, {
					httpOnly: true,
				}).json({
					status: "success",
					result: {
						msg: "Authenticated successfully.",
						token: token,
					},
				});
			}
		});
	} catch (error) {
		res.status(400).json({ status: "error" });
	}
});

app.use("/user", userAuth, user);

/*******************ADMIN***********************/
app.post("/signup", (req, res) => {
	try {
		const {
			f_name,
			l_name,
			email,
			telegram_id,
			speciality,
			working_hour,
			communication,
			phone_no,
		} = req.body;
		const db = new Database("mongo");
		db.addAdmin(
			f_name,
			l_name,
			email,
			telegram_id,
			speciality,
			working_hour,
			communication,
			phone_no,
			(result) => {
				if (result.status) {
					sendEmail(
						result.email,
						createToken(result.email, result._id),
						(isSuccess) => {
							if (isSuccess)
								res.status(200).json({
									status: "success",
									result: {
										msg: "You should receive an email, with a verification token.",
									},
								});
							else
								res.status(400).json({
									status: "error",
									result: {
										msg: "Could not create or check your account.",
										err: result.err,
									},
								});
						}
					);
				} else {
					res.status(400).send({
						status: "error",
						result: {
							msg: "Could not create a new Admin.",
							err: result.err,
						},
					});
				}
			}
		);
	} catch (error) {
		res.status(400).send({ status: "error", result: error });
	}
}); //For API test purposes

app.use("/admin/login", (req, res) => {
	try {
		const { email } = req.body;

		const db = new Database("mongo");
		if (!validator.isEmail(email)) {
			res.status(400).json({
				status: "error",
				result: "Invalid email : email should look like eg. example@example.com",
			});
			return;
		}

		db.checkAdmin(email, (result) => {
			if (result.status) {
				sendEmail(
					result.email,
					createToken(
						result.email,
						result._id,
						process.env.ADMIN_ROLE
					),
					(isSuccess) => {
						if (isSuccess)
							res.status(200).json({
								status: "success",
								result: {
									msg: "You should receive an email, with a verification token.",
								},
							});
						else
							res.status(500).json({
								status: "error",
								result: error,
							});
					}
				);
			} else
				res.status(400).json({
					status: "error",
					result: result.err,
				});
		});
	} catch (error) {
		res.status(400).json({ status: "error", result: { msg: error } });
	}
});

app.post("/admin/verify", (req, res) => {
	try {
		const { token } = req.body;

		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (
				err ||
				!decodedToken.hasOwnProperty("id") ||
				!decodedToken.hasOwnProperty("email") ||
				!decodedToken.hasOwnProperty("role") ||
				decodedToken.role !== process.env.ADMIN_ROLE
			) {
				res.status(403).json({
					status: "error",
					result: { msg: "Invalid token, please login again" },
				});
			} else {
				res.cookie("token", token, {
					httpOnly: true,
				}).json({
					status: "success",
					result: {
						msg: "Authenticated successfully.",
						token: token,
					},
				});
			}
		});
	} catch (error) {
		res.status(400).json({ status: "error" });
	}
});

app.use("/admin", adminAuth, admin);

/*****************SERVICE PROVIDER*************/
app.use("/service-provider/login", (req, res) => {
	res.send("we can handle service-provider login here");
});

app.use("/service-provider/signup", (req, res) => {
	res.send("we can handle service provider signup here");
});
app.use("/service-provider", serviceProviderAuth, serviceProvider);

app.post("/setWebhookClientRequests", async (req, res) => {
	try {
		const { url } = req.body;
		const db = new Database("mongo");
		db.setWebhookClientReqests(url);
		res.status(200).send({ status: "success" });
	} catch (error) {
		res.status(400).send({ status: "error", result: error });
		return;
	}
});

/***************SERVER STARTUP***************/

const ADDR = process.env.ADDR || "127.0.0.1";
const PORT = process.env.PORT || 5000;

app.listen(PORT, ADDR, () => {
	console.log(`Server started ${ADDR}:${PORT}`);
});
