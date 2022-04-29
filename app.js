`use strict`;

//  precio en el momento de la consulta

async function getNow() {
  try {
    const response = await fetch(
      'https://api.preciodelaluz.org/v1/prices/now?zone=PCB'
    );
    const data = await response.json();
    // save the data in the local storage
    localStorage.setItem('now', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
  }
}
getNow();
// get the data from the local storage
const dataNow = JSON.parse(localStorage.getItem('now'));
let now = dataNow.price / 1000; // change the price of €/Mwh to €/kWh
// show the price in the page
document.querySelector('.Price').innerHTML = now.toFixed(3);

// get data evry 5 minutes
setInterval(getNow, 300000);

// AVERAGE PRICE OF THE DAY

async function getAvg() {
  try {
    const response = await fetch(
      'https://api.preciodelaluz.org/v1/prices/avg?zone=PCB'
    );
    const data = await response.json();
    // save the data in the local storage
    localStorage.setItem('avg', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
  }
}
getAvg();
// get the data from the local storage
const dataAvg = JSON.parse(localStorage.getItem('avg'));
let avg = dataAvg.price / 1000; // change the price of €/Mwh to €/kWh
document.querySelector('.priceMedio').innerHTML = avg.toFixed(3);
// get data evry 5 minutes
setInterval(getAvg, 300000);

// LOWEST PRICE OF THE DAY

async function getMin() {
  try {
    const response = await fetch(
      'https://api.preciodelaluz.org/v1/prices/min?zone=PCB'
    );
    const data = await response.json();
    // save the data in the local storage
    localStorage.setItem('min', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
  }
}
getMin();
// get the data from the local storage
const dataMin = JSON.parse(localStorage.getItem('min'));
let min = dataMin.price / 1000; // change the price of €/Mwh to €/kWh
let minHour = hAdd(dataMin.hour);

document.querySelector('.priceLow').innerHTML = min.toFixed(3);
document.querySelector('.lowDay').innerHTML = minHour;
// get data evry 5 minutes
setInterval(getMin, 300000);
// HIGHEST PRICE OF THE DAY

async function getMax() {
  try {
    const response = await fetch(
      'https://api.preciodelaluz.org/v1/prices/max?zone=PCB'
    );
    const data = await response.json();
    // save the data in the local storage
    localStorage.setItem('max', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
  }
}
getMax();

// get the data from the local storage
const dataMax = JSON.parse(localStorage.getItem('max'));
let max = dataMax.price / 1000; // change the price of €/Mwh to €/kWh
let maxHour = hAdd(dataMax.hour);
document.querySelector('.priceHigh').innerHTML = max.toFixed(3);
document.querySelector('.highDay').innerHTML = maxHour;
// get data evry 5 minutes
setInterval(getMax, 300000);
// price of electric appliances in the moment of the consult
function getWh() {
  const wh = document.querySelectorAll('.whPrice');
  wh.forEach((element) => {
    const whnumber = element.innerHTML;
    const price = ((now / 1000) * whnumber).toFixed(3);
    element.innerHTML = price;
  });
}
getWh();

// get the current time javascript
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
  let h = insert(str, 2, 'h');
  let hh = insert(h, 6, 'h');
  let spaceOne = insert(hh, 3, ' ');
  let spaceTwo = insert(spaceOne, 5, ' ');
  return spaceTwo;
}
hAdd();
