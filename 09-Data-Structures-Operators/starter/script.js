'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
	name: 'Classico Italiano',
	location: 'Via Angelo Tavanti 23, Firenze, Italy',
	categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
	starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
	mainMenu: ['Pizza', 'Pasta', 'Risotto'],

	openingHours: {
		thu: {
			open: 12,
			close: 22,
		},
		fri: {
			open: 11,
			close: 23,
		},
		sat: {
			open: 0, // Open 24 hours
			close: 24,
		},
	},

	order: function(sIndex, mIndex) {
		return [this.starterMenu[sIndex], this.mainMenu[mIndex]];
	}
};

const arr = flights.replaceAll('_', ' ').split('+');

for (const fly of arr ) {
	const flyDetails = fly.split(';');
	const status = flyDetails[0].slice(1);
	let from = flyDetails[1].toUpperCase().replace(/[0-9]/g, '');
	let to = flyDetails[2].toUpperCase().replace(/[0-9]/g, '');
	const time = flyDetails[3].replace(':', 'h');
	const flyDelayed = status.startsWith('Delayed')? ' + ' : '';
	
	const string = `${flyDelayed} ${status} ${from} ${to} ${time}`
	console.log(string);
}
