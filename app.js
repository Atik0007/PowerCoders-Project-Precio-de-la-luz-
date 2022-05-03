`use strict`;

//SACAR LA INFORMACION DE LA API
const url = `https://api.allorigins.win/get?url=https://api.preciodelaluz.org/v1/prices/all?zone=PCB`;
function getData() {
  try {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        let { contents } = response;
        const date = new Date();
        localStorage.setItem('contents', contents);
        localStorage.setItem('time', date.getTime());
        return { contents, date };
      });
  } catch (error) {
    console.log(error);
  }
}
getData();

// function to get data evry 5 min and save it in local storage
function getDataEvery5Min() {
  setInterval(() => {
    getData();
  }, 300000);
}
getDataEvery5Min();

// function to get data from local storage
function getDataFromLocalStorage() {
  const data = localStorage.getItem('contents');
  const dataPrse = JSON.parse(data);
  return dataPrse;
}
getDataFromLocalStorage();

// // GET THE INFORMATION OF THE TIME IN WHICH WE ARE

function getTimeInfo() {
  const hours = new Date().getHours();
  let textHours = hours;
  let secendTextHours = hours + 1;
  if (hours < 10) {
    textHours = `0${hours}`;
    secendTextHours = `0${hours + 1}`;
  }
  const AllHours = [`${textHours}-${secendTextHours}`];
  return AllHours;
}
getTimeInfo();

// map the hour to get the information of the time
function filterDataActual() {
  const AllHours = getTimeInfo();
  const data = getDataFromLocalStorage();
  // for in
  for (let i in data) {
    for (let j in AllHours) {
      if (data[i].hour === AllHours[j]) {
        return data[i];
      }
    }
  }
}
filterDataActual();

// type the price of the hour
function typePrice() {
  const data = filterDataActual();
  const price = document.querySelector('.Price');
  price.innerHTML = `${data.price}`;
}
typePrice();

// get the higtest price
function getHighestPrice() {
  const data = getDataFromLocalStorage();
  let highestPrice = 0;
  for (let i in data) {
    if (data[i].price > highestPrice) {
      highestPrice = data[i].price;
      const highestPriceElement = document.querySelector('.priceHigh');
      highestPriceElement.innerHTML = `${highestPrice}`;
    }
  }
  // het the hour of the highest price
  for (let i in data) {
    if (data[i].price === highestPrice) {
      const highestPriceElement = document.querySelector('.highDay');
      highestPriceElement.innerHTML = `${hAdd(data[i].hour)}`;
    }
  }
}
getHighestPrice();

// get the lowest price
function getLowestPrice() {
  const data = getDataFromLocalStorage();
  let lowestPrice = 0;
  for (let i in data) {
    for (let j in data) {
      if (data[i].price < data[j].price) {
        lowestPrice = data[i].price;
        const lowestPriceElement = document.querySelector('.priceLow');
        lowestPriceElement.innerHTML = `${lowestPrice}`;
      }
    }
  }
  // het the hour of the lowest price
  for (let i in data) {
    if (data[i].price === lowestPrice) {
      const lowestPriceElement = document.querySelector('.lowDay');
      lowestPriceElement.innerHTML = `${hAdd(data[i].hour)}`;
    }
  }
}
getLowestPrice();

// get the average price
function getAveragePrice() {
  const data = getDataFromLocalStorage();
  let averagePrice = [];
  for (let i in data) {
    averagePrice.push(data[i].price);
  }
  const averagePriceSum =
    averagePrice.reduce((a, b) => a + b, 0) / averagePrice.length;
  // type in the average price
  const averagePriceElement = document.querySelector('.priceAverage');
  averagePriceElement.innerHTML = `${averagePriceSum.toFixed(2)}`;
}
getAveragePrice();

// type in evry hour the price
function typePriceEveryHour() {
  const data = getDataFromLocalStorage();
  for (let i in data) {
    const price = data[i].price / 1000;
    const hour = data[i].hour;
    const hourType = hAdd(hour);
    const priceHour = document.createElement('p');
    priceHour.innerHTML = `${hourType} : ${price.toFixed(3)} €/kWh`;
    document.querySelector('.allDay').appendChild(priceHour);
    if (price.toFixed(3) <= 0.26) {
      priceHour.style.backgroundColor = '#67c774c7';
    } else if (price.toFixed(3) < 0.29) {
      priceHour.style.backgroundColor = '#d8df80';
    } else {
      priceHour.style.backgroundColor = '#DA7F8F';
    }
  }
}
typePriceEveryHour();

// calculate the price of w of evry mwh
function getWh() {
  const data = filterDataActual();
  const priceNow = data.price;
  const wh = document.querySelectorAll('.whPrice');
  // take the data and convert it to €/kWh
  wh.forEach((element) => {
    const whnumber = element.innerHTML;
    const price = (priceNow / 1000000) * whnumber;
    element.innerHTML = price.toFixed(3);
  });
}
getWh();

// the current time
function getTime() {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  document.querySelector('.time').innerHTML =
    hours + ':' + minutes + ':' + seconds;

  let day = date.getDay();
  let month = date.getMonth();
  let year = date.getFullYear();
  let dateDay =
    date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  document.querySelector('.date').innerHTML = dateDay;
  let daySpanish = '';
  let monthSpanish = '';
  switch (day) {
    case 0:
      daySpanish = 'Domingo';
      break;
    case 1:
      daySpanish = 'Lunes';
      break;
    case 2:
      daySpanish = 'Martes';
      break;
    case 3:
      daySpanish = 'Miércoles';
      break;
    case 4:
      daySpanish = 'Jueves';
      break;
    case 5:
      daySpanish = 'Viernes';
      break;
    case 6:
      daySpanish = 'Sábado';
      break;
  }
  switch (month) {
    case 0:
      monthSpanish = 'Enero';
      break;
    case 1:
      monthSpanish = 'Febrero';
      break;
    case 2:
      monthSpanish = 'Marzo';
      break;
    case 3:
      monthSpanish = 'Abril';
      break;
    case 4:
      monthSpanish = 'Mayo';
      break;
    case 5:
      monthSpanish = 'Junio';
      break;
    case 6:
      monthSpanish = 'Julio';
      break;
    case 7:
      monthSpanish = 'Agosto';
      break;
    case 8:
      monthSpanish = 'Septiembre';
      break;
    case 9:
      monthSpanish = 'Octubre';
      break;
    case 10:
      monthSpanish = 'Noviembre';
      break;
    case 11:
      monthSpanish = 'Diciembre';
      break;
  }
  document.querySelector('.dayActual').innerHTML =
    daySpanish + ' ' + date.getDate() + '  ' + monthSpanish + '  ' + year;
}
getTime();
// evry second change the time
setInterval(getTime, 1000);

// add h to string of the hour function
function insert(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}
insert();
function hAdd(str) {
  let h = insert(str, 2, 'h'); // Output '00h-00'
  let hh = insert(h, 6, 'h'); // Output '00h-00h'
  let spaceOne = insert(hh, 3, ' '); // Output '00h -00h'
  let spaceTwo = insert(spaceOne, 5, ' '); // Output '00h - 00h'
  return spaceTwo;
}
hAdd();
