`use strict`;

//  precio en el momento de la consulta https://api.preciodelaluz.org/v1/prices/now?zone=PCB

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
let now = dataNow.price / 1000;

// show the price in the page
document.querySelector('.Price').innerHTML = now.toFixed(3);
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
}
getTime();

setInterval(getTime, 1000);
// get data evry 5 minutes
setInterval(getNow, 300000);

// AVERAGE PRICE OF THE DAY  https://api.preciodelaluz.org/v1/prices/avg?zone=PCB

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
let avg = dataAvg.price / 1000;

document.querySelector('.priceMedio').innerHTML = avg.toFixed(3);

// LOWEST PRICE OF THE DAY https://api.preciodelaluz.org/v1/prices/min?zone=PCB

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
let min = dataMin.price / 1000;

document.querySelector('.priceLow').innerHTML = min.toFixed(3);

// HIGHEST PRICE OF THE DAY https://api.preciodelaluz.org/v1/prices/max?zone=PCB

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
let max = dataMax.price / 1000;
document.querySelector('.priceHigh').innerHTML = max.toFixed(3);

// get all the wh values and calculate the price let price = ((now / 1000) * whnumber).toFixed(3);

function getWh() {
  const wh = document.querySelectorAll('.whPrice');
  wh.forEach((element) => {
    const whnumber = element.innerHTML;
    const price = ((now / 1000) * whnumber).toFixed(3);
    element.innerHTML = price;
  });
}
getWh();
