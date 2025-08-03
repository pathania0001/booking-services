
const {Booking} = require("../models");
const CrudRepositories = require("./crud.repo");

// console.log("inside-airplane-repo")
class BookingRepository extends CrudRepositories{  
    constructor() {
        super(Booking)
    }
}
module.exports = BookingRepository