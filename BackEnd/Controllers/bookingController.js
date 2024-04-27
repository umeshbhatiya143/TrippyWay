const Booking = require("../models/booking");

// POST: Create a new hotel
exports.createBooking = async (req, res, next) => {
    try {

        const booking = new Booking(req.body);

        await booking.save();

        res.status(201).json({ message: 'Package booked successfully.', bookingId: booking._id });
    } catch (error) {
        res.status(500).json({ message: 'error in booking package.', error });
    }
};

// GET: Retrieve a single hotel by ID
exports.getBookingbyId = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking)
            return res.status(404).send({ message: "No Booking Found." });
        res.status(200).send(booking);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

// GET: Retrieve all hotels
exports.getAllBookings = async (req, res, next) => {
    try {
        console.log("hello")
        const bookings = await Booking.find();
        if (!bookings)
            return res.status(404).send({ message: "No Bookings Found." });
        res.status(200).send(bookings);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

// DELETE: Delete a hotel by ID
// exports.deleteHotel = async (req, res, next) => {
//     try{
//         const hotel = await Hotel.findByIdAndDelete(req.params.id);
//         if(!hotel)
//             return res.status(404).send({ message: "No hotels Found."});
//         res.status(200).send(hotel);
//     }catch(err){
//         res.status(500).send(err.message)
//     }
// };