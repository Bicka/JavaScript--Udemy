'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//#region  Course
const countries = ['germany', 'usa', 'italy', 'romania', "france", 'japan']
///////////////////////////////////////
//https://restcountries.com/v2/
const baseUrl = `https://restcountries.com/v2/`;

function requestCountry(countryName) {
    const req = new XMLHttpRequest();
    req.open("GET", baseUrl + "name/" + countryName);
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
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

        countriesContainer.insertAdjacentHTML('beforeend', el)



    });
}

//countries.forEach(item=> requestCountry(item));
const renderCountry = function (data, className = "") {
    const el = `<article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', el)

}


const requestCountryCode = function (code) {
    const req2 = new XMLHttpRequest();
    req2.open("GET", baseUrl + "alpha/" + code);
    req2.send();
    req2.addEventListener("load", function () {
        const data = JSON.parse(req2.responseText)
        renderCountry(data, "neighbour");
    })
}


const requestCountry2 = function (countryName) {
    const req = new XMLHttpRequest();
    req.open("GET", baseUrl + "name/" + countryName);
    req.send();
    req.addEventListener("load", function () {

        const [data] = JSON.parse(req.responseText);

        console.log(data);
        renderCountry(data)

        const [neightbour] = data.borders;
        if (!neightbour) return;
        data.borders.forEach(element => {
            requestCountryCode(element)
        });

    });
}


//requestCountry2('ireland')

const renderError = (msg) => {
    countriesContainer.textContent = `${msg}`

}

function fetchCountry(countryName) {

    fetch(baseUrl + "name/" + countryName)
        .then((response) => {
            if (response.ok)
                return response.json();
            else
                throw new Error(`Not found`)
        })
        .then((result) => {
            renderCountry(result[0]);
            return result[0]?.borders
        })
        .then((result) => {
            if (result)
                requestCountryCode(result[0])
        })
        .catch((err) => {
            renderError(`${err.message}`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });

}

// btn.addEventListener('click', () => {
//     fetchCountry('italy')
// });

// fetchCountry('italy')
//#endregion


//#region Chanlange


const whereAmI = function(lat,lng){
    const geoUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    fetch(geoUrl).then((response) => {
        if(response.ok)
            return response.json();
            else throw new Error("Nop")
    })
    .then(data => {
        fetchCountry(data.address.country)
    })
    .catch(err=> console.log(err))

}
btn.addEventListener('click', () => {
    whereAmI(-33.933, 18.474);
});

//#endregion

