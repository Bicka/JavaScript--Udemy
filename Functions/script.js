'use strict';

const bookings = []

const createBooking = function(flightNumber, numPasssagers = 1, price = 199 * numPasssagers){
   
    const booking = {
        flightNumber: flightNumber,
        numPasssagers: numPasssagers,
        price: price
    }
    bookings.push(booking);
}

createBooking("LH123");
createBooking("LH123", 2);
createBooking("LH123", undefined, 800);


console.log( bookings);

const flightNumber = 'LH234';
const person = {
    name: 'Marcel',
    passport: 1234
}

const checkIn = function(fNumber, passager){
    
}
checkIn(flightNumber,person);