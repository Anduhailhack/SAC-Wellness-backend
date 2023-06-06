require("dotenv").config();

const amqp = require("amqplib");

//Add this to .env file later
const appointmentBookingQueue = "appointmentQueue";
const appointmentRequestQueue = "requestQueue";
//const emergencyQueue = "emergencyQueue";


/**
 * Send Request to appointmentRequestQueue
 */
const sendAppointmentRequest = async (data) => {
    const connect = await amqp.connect(process.env.rabbitMqUrl)
    const channel = await connect.createChannel()
    
  
    await channel.assertQueue(appointmentRequestQueue, { durable: true })
    await channel.sendToQueue(
      appointmentRequestQueue,
      Buffer.from(JSON.stringify(data)),
      { persistent: true }
    )
  
    console.log('Message produced: ', appointmentRequestQueue, data)
}


/**
 * Recieve Request Messages from appointmentRequestQueue as object 
 */
const recieveAppointmentRequest = async () => {
    const connect = await amqp.connect(process.env.rabbitMqUrl)
    const channel = await connect.createChannel()
    const messages = []; // Initialize array to store messages
  
    await channel.assertQueue(appointmentRequestQueue, { durable: true })
    await channel.consume(appointmentRequestQueue, (message) => {
        const request = JSON.parse(message.content.toString());
      console.log('Message consumed: ', appointmentRequestQueue, message.content.toString())
      messages.push(request); // Add message to array  
    }
    )
    return { appointmentRequests: messages }; // Return object containing array of messages
}

/**
 * Send Booking confiramtion to appointmentBookingQueue
 */
const sendBookingConfirmation = async (data) => {    
    const connect = await amqp.connect(process.env.rabbitMqUrl)
    const channel = await connect.createChannel()
    
  
    await channel.assertQueue(appointmentBookingQueue, { durable: true })
    await channel.sendToQueue(
      appointmentBookingQueue,
      Buffer.from(JSON.stringify(data)),
      { persistent: true }
    )
  
    console.log('Message produced: ', appointmentBookingQueue, data)
}

/**
 * Recieve confirmation Messages from appointmentBookingQueue
 */
const recieveBookingConfirmation = async () => {  
    const connect = await amqp.connect(process.env.rabbitMqUrl)
    const channel = await connect.createChannel()
    const messages = []; // Initialize array to store messages
    
    await channel.assertQueue(appointmentBookingQueue, { durable: true })
    await channel.consume(appointmentBookingQueue, (message) => {
        const confirmation = JSON.parse(message.content.toString());
      console.log('Message consumed: ', appointmentBookingQueue, message.content.toString())

      messages.push(confirmation); // Add message to array  
    },
    {NoAck: true } //Acknowledge message 
    );

    return { appointmentConfirmation: messages }; // Return object containing array of messages
  
}


module.exports = {
    sendAppointmentRequest,
    recieveAppointmentRequest,
    sendBookingConfirmation,
    recieveBookingConfirmation
  };