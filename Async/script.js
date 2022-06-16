'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const countries = ['germany','usa','italy','romania']
///////////////////////////////////////
//https://restcountries.com/v2/
const baseUrl = `https://restcountries.com/v2/name/`;
function requestCountry(countryName) {
    const req = new XMLHttpRequest();
    req.open("GET", baseUrl+countryName);
    req.send();
    req.addEventListener("load", function () {

        const [data] = JSON.parse(req.responseText);

        //console.log(data);

        const el = `<article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].nativeName}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

        countriesContainer.insertAdjacentHTML('beforeend', el)

        countriesContainer.style.opacity = 1;


    });
}

countries.forEach(item=> requestCountry(item));





