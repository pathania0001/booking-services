
const {Booking} = require("../models");
const CrudRepositories = require("./crud.repo");

// console.log("inside-airplane-repo")
class BookingRepository extends CrudRepositories{  
    constructor() {
        super(Booking)
    }
    async create(data,transaction){
       return await Booking.create(data,{transaction})
    }
}
module.exports = BookingRepository