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
//
// ///////////////////////////////////////
// //get neighbour of country
///////////////////////////////////////
///////////////////////////////////////
//get country
const renderCountry = function(data, className = '') {
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

const renderError = function(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
//First Method

// const getCountryAndNeighbour = function(country) {
//   //********************
//   //AJAX call country 1
//   //********************
//   //XML HTTP Request
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// //we basically send off the request.And then once that is done,
//   request.send();
// //the request then fetches the data in the background. it will emit the load event.
// //when data arrives this callback function here will be called.
//
//   request.addEventListener('load', function() {
//     //it is a JSON , the big string of text
//     console.log(this.responseText);
//     //convert JSON to JS
//     //with putting [] we destructure the array we have object
//     const [data] = JSON.parse(this.responseText);
//
//     // if (!data) return;
//     console.log(data);
//     //********************
//     //Render country 1
//     //********************
//     renderCountry(data);
//     //********************
//     //Get neighbour- country2
//     //********************
//     //some country has several neighbours, so we destructure the neighbour and choose one element
//     const [neighbour] = data.borders;
//     //some country doesnt have neibour
//     if (!neighbour) return;
//     //********************
//     //AJAX call country 2
//     //********************
//     const request2 = new XMLHttpRequest();
//     //in the requestcountry the border specify with code so according to site with alpha >>https://restcountries.eu/
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     request2.send();
//
//     //callback function in the callback function(nested)
//     //callback hell
//     request2.addEventListener('load', function() {
//       console.log(this.responseText);
//       //here we dont need [data2] destructuring...because the data code is quince so not array return
//       const data2 = JSON.parse(this.responseText);
//
//       renderCountry(data2, "neighbour");
//     });
//   });
// };
// // getCountryAndNeighbour('iran');
// getCountryAndNeighbour('Afghanistan');

//Second Method
////////////////////////////////////////////////////////////////////////////
//Promise
// const request3 = fetch(`https://restcountries.eu/rest/v2/name/iran`)
// console.log(request3);

// const getCountryData2 = function(country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(function(response) {
//     console.log(response);
//     return response.json();
//   }).then(function (data) {
//     console.log(data);
//     renderCountry(data[0]);
//   });
// };

//simplify the up code
//
// const getCountryData2 = function(country) {
//   //country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     // .then(response => response.json(), err => alert(err))
//     .then(response => {
//       console.log(response);
//
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//
//       if (!neighbour) return;
//
//       //country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       console.log(response);
//
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     }).then(data => renderCountry(data, 'neighbour'))
//     //instead of >>> err => alert(err)
//     .catch(err => {
//       console.log(`${err} ***`);
//       renderError(`Something went wrong... ${err.message}. Try again!`);
//     }).finally(() => {
//     countriesContainer.style.opacity = 1;
//   });
// };

//simplify the up code

const getJSON = function(url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(`Country not found (${response.status})`);

    return response.json();
  });
};

const getCountryData2 = function(country) {
  //country 1
  getJSON(`https://restcountries.eu/rest/v2/name/${country}`, 'Country not found.')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      // const neighbour = "fdfdf"

      if (!neighbour) throw new Error('No neighbour found!');

      //country 2
      return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, 'Country not found');
    })
    .then(data => renderCountry(data, 'neighbour'))
    //instead of >>> err => alert(err)
    .catch(err => {
      console.log(`${err} ***`);
      renderError(`Something went wrong... ${err.message}. Try again!`);
    }).finally(() => {
    countriesContainer.style.opacity = 1;
  });
};

// btn.addEventListener('click', function() {
//   getCountryData2('Iran');
// });
// getCountryData2('fdsfg');

//Challenge

// const whereAmI = function(lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     }).then(data => {
//     console.log(data);
//     console.log(`we are in ${data.city}, ${data.country} country`);
//
//     return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`)
//   }).then(res => {
//     console.log(res);
//     if (!res.ok)
//       throw new Error(`Country not found (${response.status})`);
//     return res.json();
//   }).then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message}!!`));
// };
//
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);

//Which code execute at first.
console.log('Test start');
setTimeout(() => console.log('0 sec tmer'), 0);
Promise.resolve('Resolve promise 1').then(res => console.log(res));
// Promise.resolve("resolve promise 2").then(res => {
//   for (let i=0; i < 1000000000; i++) {}
//   console.log(res);
// })
console.log('Test end');

//////////////////////////////////////
//Building a simple promise
const lotteryPromise = new Promise(function(resolve, reject) {
  console.log('Lottery draw is happening...');
  setTimeout(function() {
    if (Math.random() >= 0.5) {
      resolve('You win***');
    } else {
      reject('You lost your money:((');
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//////////////////////////////
//Promisifying setTimeout
const wait = function(seconds) {
  return new Promise(function(resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  }).then(() => {
  console.log('2 seconds passed');
  return wait(1);
})
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() =>
    console.log('4 second passed'));

/////////////////////////////////
//Static method on the promise constructor
//for resolve emidatlly
Promise.resolve('abx').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

///////////////////////////////
//make promise
const getPosition = function() {
  return new Promise(function(resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos))
//Other way for writing when am I

const whereAmI = function() {
  getPosition().then(pos => {
    const { latiyude: lat, longitude: lng } = pos.coords;

    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    }).then(data => {
    console.log(data);
    console.log(`we are in ${data.city}, ${data.country} country`);

    return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
  }).then(res => {
    console.log(res);
    if (!res.ok)
      throw new Error(`Country not found (${response.status})`);
    return res.json();
  }).then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}!!`));
};

// whereAmI();


/////////////////////////////////////////////////////////////
//Challenge2

const imgContainer = document.querySelector('.images');
const createImage = (imgPath) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function() {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function() {
      reject(new Error('Image not found'));
    });
  });
};

//the img in the first then just define in it, but for second then we need a global variable
// let currentImg;
// createImage('img/img-1.jpg').then(img => {
//   console.log('img 1 loaded.');
//   currentImg = img;
//   return wait(2);
// }).then(() => {
//   currentImg.style.display = 'none';
//   return createImage('img/img-2.jpg');
// }).then(img => {
//   console.log('img 2 loaded.');
//   currentImg = img;
//   return wait(2);
// }).then(() => {
//   currentImg.style.display = 'none';
// })
//   .catch(err => console.error(err));


////////////////////////////////////////////////////
//Async/await

const whereAmI2 = async function() {
  try {
    //Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problems getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    //Country data
    //fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => console.log(res))
    //using async/await function
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}`);
    if (!res.ok) throw new Error('Problems getting location data');
    // console.log(res);
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    console.log(`${err}!!!!!!!`);
    renderError(`Something went wrong :O!!!! ${err.message}`);

    //Reject promise returned from async function
    throw err;
  }
};

// whereAmI2()
// console.log("First");
// const city = whereAmI2();
// console.log("Second");

// whereAmI2().then(city => console.log(`2: ${city}`))
//   .catch(err => console.error( `2:${err.message}`))
//   .finally(() => console.log(`3: finished getting location`))

//IIFE
(async function() {
  try {
    const city = await whereAmI2();
    console.log(`1: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log(`3: Finishing getting location`);
});

///////////////////////////////////////////////
//running promises in parallel
const get3Countries = async function(c1, c2, c3) {
  //first way without parallel
  try {
    //   const [data1] = await getJSON(`https://restcountries.eu/rest/v2/name/${c1}`);
    //   const [data2] = await getJSON(`https://restcountries.eu/rest/v2/name/${c2}`);
    //   const [data3] = await getJSON(`https://restcountries.eu/rest/v2/name/${c3}`);
    //
    //   console.log([data1.capital, data2.capital, data3.capital]);
    // } catch (err) {
    //   console.error(err);
    // }

    //Second way
    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`)
    ]);
    console.log(data.map(d => d[0].capital));

  } catch (err) {
    console.error(err);
  }
};
get3Countries('Iran', 'Canada', 'Tanzania');

/////////////////////////////////////////////////////
//Other Promise combinators: race, allSettled, any
//1.Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
      getJSON(`https://restcountries.eu/rest/v2/name/iran`),
      getJSON(`https://restcountries.eu/rest/v2/name/jermany`)
  ]);
  console.log(res[0]);
})

const timeOut = (sec) => {
  return new Promise(function(_, reject) {
    setTimeout(function () {
      reject(new Error("Request took too long!") )
    }, sec * 1000)
  })
}

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/Iran`),
  timeOut(5)
]).then(res => console.log(res[0])).catch(err => console.error(err))

//Promise.allSettled
Promise.allSettled ([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another success")
]).then(res => console.log(res))
//promise.all
Promise.all ([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another success")
]).then(res => console.log(res)).catch(err => console.error(err));

// Promise.any [ES2021]
Promise.any ([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another success")
]).then(res => console.log(res)).catch(err => console.error(err));


////////////////////////////////////////////////
//Challenge 3:

//1
const loadNPause = async function () {
  try {
    //in challenge 2 we use then and img as a parameter for then() method
    //Load img 1
    let img = await createImage('img/img-1.jpg');
    console.log('img 1 loaded.');
    await wait(2);
    img.style.display = "none"

    img = await createImg('img/img-2.jpg');
    console.log('img 2 loaded.');
    await wait(2);
    img.style.display = "none"

  } catch (err) {
    console.error(err)
  }
}
loadNPause()

//2
const loadAll = async function(imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classlist.add("parallel"))
  } catch (err) {
    console.error(err)
  }
}
loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"])