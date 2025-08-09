
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

    async get(id,transaction){
        return await Booking.findByPk(id,{transaction});
    }
    
    async getAll(condition,transaction){
        return await Booking.findAll(condition,{transaction})
    }

    async update (bookingId , data , transaction){
       return await Booking.update( data,{
            where:{
                id:bookingId
            }},{transaction})
    }
}
module.exports = BookingRepository