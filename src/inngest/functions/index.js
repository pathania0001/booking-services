
const inngestClient = require('../client')
const {cancelExpiredBooking} = require('../../services/booking.service');
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
       await step.run("Cancel expired bookings", async () => {
      await cancelExpiredBooking();
    });
    }
)

module.exports = [
    helloWorld,
   cancelBookings,
]