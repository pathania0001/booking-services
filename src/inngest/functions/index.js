
const inngestClient = require('../client')
const {findingExpiredBookings, updateCorrespondingBookingStatus, updateCorrespondingSeats} = require('../../services/booking.service');


const helloWorld = inngestClient.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

const cancelBookings = inngestClient.createFunction(
    {id:"cancel-expire-booking"},
    {cron:'*/10 * * * *'},
    async ({step}) =>{
       const expiredBookings = await step.run("get expired bookings", async () => findingExpiredBookings() );
       if(expiredBookings.length === 0)
        return true;
       for(const booking of expiredBookings){ //each funtion id shoud be diffrent,when ever called ,ehich is usefull for retries

       await step.run(`restoring the seats of id : ${booking.flightId}`,async () => await updateCorrespondingSeats({
        flightId:booking.flightId,
        numberOfSeats:booking.numberOfSeats,
         role:ENUM.USER_ROLE.SYSTEM
      }))
       console.log(`retored the seats of flight of expired booking id : ${booking.id}`)
       await step.run(`updating status of id : ${booking.id}`, async ()=> await updateCorrespondingBookingStatus(booking.id))
       console.log(`updated the status to cancelled of expired booking id : ${booking.id}`)
     }
    }
)

module.exports = [
    helloWorld,
   cancelBookings,
]