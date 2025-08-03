
const compareDates = (dateString1,dateString2)=>{
    const date1 = new Date(dateString1).getTime();
    const date2 = new Date(dateString2).getTime();
    console.log("date1 :",date1,"date2 :",date2,date1===date2)
     if( date1 === date2)
        return "equal";

     return date1 > date2 ? "greater" : "smaller";
}

module.exports = {
    compareDates,
}