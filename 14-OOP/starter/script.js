'use strict';

// const Person = function (firstName, birthYear) {
//     // Instance properties
//     this.firstName = firstName;
//     this.birthYear = birthYear;
  
//     // Never to this!
//     // this.calcAge = function () {
//     //   console.log(2037 - this.birthYear);
//     // };
//   };

//   const jonas = new Person('Jonas', 1991);
// console.log(jonas);

// const matilda = new Person('Matilda', 2017);
// const jack = new Person('Jack', 1975);

// console.log(jonas instanceof Person);

// console.log(Person.prototype);
// Person.prototype.calcAge = function() {
//     console.log(2037 - this.birthYear);
// };

// Person.hey = function () {
//     console.log('Hey');
// }

// console.dir([].__proto__.fill)


const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
};
Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`+ New speed: ${this.speed}Km/H`);
    return this;
};

Car.prototype.break = function () {
    this.speed -= 5;
    console.log(`- New speed: ${this.speed}Km/H`);
    return this;
}

const bmw = new Car('bmw', 120);
//bmw.accelerate().accelerate().break().accelerate().break().break();

class PersonCl {
    constructor(fullName, birthYear) {
        this._fullName = fullName;
        this.birthYear = birthYear;
    }

    calcAge() {
        console.log(2050 - this.birthYear);
    }

    get age() {
        return 2050 - this.birthYear;
    }

    set fullName(name) {
        if(name.includes(' ')) {
            this._fullName = name;
        } else {
            console.log('njjjn')
        }
    }

    get fullName() {
        return this._fullName;
    }
};

PersonCl.prototype.growUp = function() {
    this.birthYear--;
}
const pers1 = new PersonCl('Jes gh', 15);
console.log(pers1); 


class CarCl {

   constructor (make, speed) {
        this.make = make;
        this.speed = speed;
    }
    accelerate() {
        this.speed += 10;
        console.log(`+ New speed: ${this.speed}Km/H`);
        return this;
    };
    
    break () {
        this.speed -= 5;
        console.log(`- New speed: ${this.speed}Km/H`);
        return this;
    }

    get speedUs() {
        return this.speed / 1.6;
    }

    set speedUs(speed) {
        this.speed = speed * 1.6;
    }   
}

const car2 = new CarCl('Ford', 120);
// car2.accelerate().accelerate().break().accelerate().break().break();
console.log(car2.speedUs);

 

const Person = function (firstName, birthYear) {
    // Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
};


const Student = function (firstName, birthYear, course) {
    // Instance properties
    Person.call(this, firstName, birthYear);
    this.course = course;
};
Student.prototype = Object.create(Person);
Student.prototype.constructor = Student;
Student.prototype.introduce = function() {
    console.log(this.firstName + '-' + this.course);
};



const jonas = new Person('Jonas', 1991);
console.log(jonas);

const matilda = new Student('Matilda', 2017, 'CS');
console.log(matilda);

const jack = new Person('Jack', 1975);


const CarEV = function (make, speed, battery) {
    Car.call(this, make, speed);
    this.battery = battery;
};

CarEV.prototype = Object.create(Car.prototype);
CarEV.prototype.constructor = CarEV;

CarEV.prototype.accelerate = function() {
    if (this.battery > 0) {
        this.speed += 20;
        this.battery--;
        console.log(`+ New speed: ${this.speed}Km/H - ${this.battery}%`);
    } else {
        console.log(`+ New speed: 0Km/H - ${this.battery}%`);
    }
    return this;
};

CarEV.prototype.chargeBattery = function(changeTo) {
    if (changeTo > 100 || changeTo < 0) {
        this.battery = 100;
    } else {
        this.battery = changeTo;
    }
    return this;
}



const carEv1 = new CarEV('T', 120, 4);
// carEv1.accelerate().accelerate().accelerate();


class StudentCl extends PersonCl {
    constructor(firstName, birthYear, course) {
        super(firstName, birthYear);
        this.course = course;
    }

    introduce() {
        console.log(this.firstName + '-' + this.course);
    };
}
