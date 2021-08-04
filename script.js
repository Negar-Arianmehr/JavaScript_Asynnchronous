'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
///////////////////////////////////////
//get country
const getCountryData = function(country) {
  //XML HTTP Request
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//we basically send off the request.And then once that is done,
  request.send();
//the request then fetches the data in the background. it will emit the load event.
//when data arrives this callback function here will be called.
  request.addEventListener('load', function() {
    //it is a JSON , the big string of text
    console.log(this.responseText);
    //convert JSON to JS
    //with putting [] we destructure the array we have object
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //here we want to make a cart in the html
    const html =
      `<article class='country'>
          <img class='country__img' src='${data.flag}' />
          <div class='country__data'>
            <h3 class='country__name'>${data.name}</h3>
            <h4 class='country__region'>${data.region}</h4>
            <p class='country__row'><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
            <p class='country__row'><span>🗣️</span>${data.languages[0].name}</p>
            <p class='country__row'><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>`;

    //where have to put this html
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// getCountryData("Democratic People's Republic of Korea")

///////////////////////////////////////
//get neighbour of country
///////////////////////////////////////
///////////////////////////////////////
//get country
const renderCountry = function(data, className= "") {
  //here we want to make a cart in the html
  const html =
    `<article class='country ${className}'>
          <img class='country__img' src='${data.flag}' />
          <div class='country__data'>
            <h3 class='country__name'>${data.name}</h3>
            <h4 class='country__region'>${data.region}</h4>
            <p class='country__row'><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
            <p class='country__row'><span>🗣️</span>${data.languages[0].name}</p>
            <p class='country__row'><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>`;

  //where have to put this html
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function(country) {
  //********************
  //AJAX call country 1
  //********************
  //XML HTTP Request
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//we basically send off the request.And then once that is done,
  request.send();
//the request then fetches the data in the background. it will emit the load event.
//when data arrives this callback function here will be called.

  request.addEventListener('load', function() {
    //it is a JSON , the big string of text
    console.log(this.responseText);
    //convert JSON to JS
    //with putting [] we destructure the array we have object
    const [data] = JSON.parse(this.responseText);

    // if (!data) return;
    console.log(data);
    //********************
    //Render country 1
    //********************
    renderCountry(data);
    //********************
    //Get neighbour- country2
    //********************
    //some country has several neighbours, so we destructure the neighbour and choose one element
    const [neighbour] = data.borders;
    //some country doesnt have neibour
    if (!neighbour) return;
    //********************
    //AJAX call country 2
    //********************
    const request2 = new XMLHttpRequest();
    //in the requestcountry the border specify with code so according to site with alpha >>https://restcountries.eu/
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    //callback function in the callback function(nested)
    //callback hell
    request2.addEventListener('load', function() {
      console.log(this.responseText);
      //here we dont need [data2] destructuring...because the data code is quince so not array return
      const data2 = JSON.parse(this.responseText);

      renderCountry(data2, "neighbour");
    });
  });
};
// getCountryAndNeighbour('iran');
getCountryAndNeighbour('Afghanistan');

////////////////////////////////////////////////////////////////////////////
//Promise
const request3 = fetch(`https://restcountries.eu/rest/v2/name/iran}`)
console.log(request3);

const getCountryData2 = function(country) {
  fetch(`https://restcountries.eu/rest/v2/name/iran}`)
}