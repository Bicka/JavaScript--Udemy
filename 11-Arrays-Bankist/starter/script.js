'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
let activeUser = {};

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = [ 'a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2))
// console.log(arr, arr.splice(-1))

const displayMovements = function(movements) {
    containerMovements.innerHTML = '';
    for (const [i, mov] of movements.entries()) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html =`<div class="movements__row">
                        <div class="movements__type movements__type--${type}">
                            ${i + 1} ${type}
                        </div>
                        <div class="movements__date">3 days ago</div>
                        <div class="movements__value">${mov} EUR</div>
                    </div>`;
        
        containerMovements.insertAdjacentHTML('afterbegin', html);
    }
};

const displayBalance = function(acc) {
    labelBalance.textContent = `${acc.total} EUR`;
    labelSumIn.textContent = `${acc.deposit} EUR`;
    labelSumOut.textContent = `${acc.withdrawal} EUR`;
    labelSumInterest.textContent = `${acc.interest} EUR`;
}

const eurToUsd = 1.1;

Array.prototype.convertCurrency = function(ratio) {
    return this.map(el => el * ratio);
};

Array.prototype.sortTransactions = function(type) {
    return type ? this.filter(el => el > 0) :  this.filter(el => el < 0);
};

Array.prototype.calculateTotal = function() {
    return this.reduce((acc, current) => acc + current, 0);
};

Array.prototype.maxVal = function() {
    return this.reduce((acc, current) => acc > current ? acc : current, this[0]);
};

const calcUsers = function (acc) {
    const deposits = acc.movements.sortTransactions(true);
    acc.deposit = deposits.calculateTotal();
    acc.withdrawal = acc.movements.sortTransactions(false).calculateTotal();
    acc.total = acc.movements.calculateTotal();
    acc.interest = deposits.convertCurrency(acc.interestRate/100).filter(el => el > 1).calculateTotal();
}


const createUsers = function() {
    for (const acc of accounts) {
        acc.user = acc.owner.toLocaleLowerCase().split(' ').map(w => w[0]).join('');
    }
    console.log(accounts);
};
createUsers();


const initApp = function () {
    labelWelcome.textContent = `Welcome ${activeUser.owner.split(' ')[0]}`;
    calcUsers(activeUser);
    displayMovements(activeUser.movements);
    displayBalance(activeUser);
    console.log(activeUser.movements.maxVal());
    containerApp.style.opacity = 100;
}

const logIn = function(event) {
    event.preventDefault();
    const user = inputLoginUsername.value;
    const pin = inputLoginPin.value;
    inputLoginUsername.value = inputLoginPin.value = '';
    activeUser = accounts.find(acc => acc.user === user && acc.pin === +pin);
    if (activeUser) {
        initApp();
    } else {
        console.log('Wrong credentials');
    }
}

const transferFunction = function(event) {
    event.preventDefault();
    const to = accounts.find(acc => acc.user === inputTransferTo.value);
    const ammount = +inputTransferAmount.value;
    if (activeUser && to && ammount > 0 && to.user !== activeUser.user && activeUser.total >= ammount) {
        to.movements.push(Math.abs(ammount));
        activeUser.movements.push(-ammount);
        initApp();
        inputTransferTo.value = inputTransferAmount.value = '';
    } else {
        console.log('Wrong account')
    }
};

const requestLoan = function(event) {
    event.preventDefault();
    const ammount = +inputLoanAmount.value;
    if(activeUser && ammount > 0) {
        activeUser.movements.push(ammount);
        initApp();
        inputLoanAmount.value = '';
    }
};

const closeAccount = function(event) {
    event.preventDefault();
    const account = inputCloseUsername.value;
    const pin = +inputClosePin.value;
    if (activeUser.user === account && activeUser.pin === pin) {
        const accIndex = accounts.findIndex(acc => acc.user === account);
        accounts.splice(accIndex, 1);
        containerApp.style.opacity = 0;
    }
};

const ascSort = function (a, b) {
    if (a > b) {
        return 1;
    } else {
        return -1;
    }
}

const descSort = function (a, b) {
    if (a > b) {
        return -1;
    } else {
        return 1;
    }
}

const sortMovents = function(event) {
    event.preventDefault();
    let move;
    if(activeUser.order === 'asc') {
        move = activeUser.movements;
        activeUser.order = 'nop';
    } else {
        move = activeUser.movements.slice().sort((a,b) => a - b);
        activeUser.order = 'asc';
    };
    displayMovements(move);
}

btnLogin.addEventListener('click', logIn);
btnTransfer.addEventListener('click', transferFunction);
btnLoan.addEventListener('click', requestLoan);
btnClose.addEventListener('click', closeAccount);
btnSort.addEventListener('click', sortMovents);



let arr = Array.from({length: 100}, (_, i) => i+1);



console.log(arr)