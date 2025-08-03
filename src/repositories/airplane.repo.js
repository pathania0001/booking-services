const { Airplane } = require("../models");
const CrudRepositories = require("./crud.repo");

// console.log("inside-airplane-repo")
class AirplaneRepository extends CrudRepositories{  
    constructor() {
        super(Airplane)
    }
}
module.exports = AirplaneRepository