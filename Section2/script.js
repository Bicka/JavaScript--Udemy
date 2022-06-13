/*//#region LECTURE: Values and Variables
const country = 'Romania'
const continent = "Europe"
let population = 21

console.log(`${continent}-${country} : ${population} milion people`)

//#endregion

//#region LECTURE: Data Types
const isIsland = false;
let language;

console.log(typeof (isIsland), typeof (language), typeof (population), typeof (country));

//#endregion

//#region LECTURE:  let, const and var
language = 'Romanian'

//#endregion

//#region LECTURE: Basic Operators
//1 
console.log(population / 2)
console.log(++population);
let description = `Portugal is in Europe, and its 11 million people speak portuguese`;

//#endregion

//#region LECTURE:  Strings and Template Literals
description = `${country} is in ${continent}, and its ${population} million people speak ${language}`
//#endregion

//#region LECTURE: : if / else
if (population > 33) {
    console.log(`${country}'s population is above average`);
} else {
    console.log(
        `${country}'s population is ${33 - population} million
    below average`,
    );
}
//#endregion

//#region LECTURE: Type Conversion and Coercion
//#endregion

//#region LECTURE: == vs. ===

//#endregion

//#region LECTURE: Logical Operators
//#endregion

//#region LECTURE: The switch Statement
//#endregion

//#region LECTURE: The Conditional (Ternary) Operator
//#endregion*/

