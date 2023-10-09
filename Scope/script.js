'use strict';
function calcAge (bYear){
    const age = new Date().getFullYear() - bYear;

    function printAge (){
        const output= `${fName}: ${age}, born in ${bYear}`;
        console.log(output);

        if(bYear>=1981 && bYear <=1996){
            const str = `${fName}...`;
            console.log(str);
        }
    }
    printAge();
    return age;
}

const fName = "Marcel";  
calcAge(1996)