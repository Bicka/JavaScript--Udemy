'use strict';

const oneWord = function(str) {
    return str.replace(/ /g, ' ').toLowerCase();
}

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function() {}
    book(flightNum, name) {
      console.log(
        `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
      );
      this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
  };

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
  };

const book = lufthansa.book ;

book.call(eurowings, 23, 'bla');


function addTax(rate) {
    return function (value){
        return value + value*rate;
    }
}
const addVAT = addTax(0.23);
console.log(addVAT(15));


const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),

    registerNewAnswer() {
        const msg = `${this.question}\n${this.options.join('\n')}\n(Write Option Number)`;
        const ans = +prompt(msg);
        if (this.answers[ans] !== undefined) {
            this.answers[ans]++;
        }

        this.displayResults();
        this.displayResults('string');
    },

    displayResults(type = 'array') {
        if (type === 'array') {
            console.log(this.answers);
        } else if (type === 'string') {
            console.log(`Ans: ${this.answers.join(',')}`)
        }
    }
};

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });


const secureBooking = function() {
    let passengerCount = 0;

    return function() {
        passengerCount++;
        console.log(passengerCount);
    }
};

secureBooking()();
secureBooking()();

const booker = secureBooking();
booker();
booker();
booker();

