const amqplib = require('amqplib')

let channel ;
const queueConnection = async ()=>{

    try {
         const connection = await amqplib.connect('amqp://localhost');
          channel = await connection.createChannel(); 

         await channel.assertQueue('airline-noti-service');
         console.log("queue connection is made");
    } catch (error) {
         console.log("error in connecting queue :",error);
    }
   
}

const sendData = async(data)=>{
    try {
        console.log("data : to send",data)
        await channel.sendToQueue('airline-noti-service',Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.log("queue msg sending error :",error)
    }
}


module.exports = {
    queueConnection,
    sendData,
}