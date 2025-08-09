const {Inngest} =  require("inngest");

const inngestClient = new Inngest({
    id:"Airline-Booking-Service",
    name:"Airline-Booking-Servies"
});

module.exports = inngestClient;