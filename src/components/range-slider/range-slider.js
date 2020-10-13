import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

var stepsSlider = document.getElementById('range-slider');
const lowerViewPrice = document.querySelector('#lower-value');
const upperViewPrice = document.querySelector('#upper-value');
const viewNodes = [lowerViewPrice, upperViewPrice];

noUiSlider.create(stepsSlider, {
  start: [5000, 10000],
  connect: true,
  format: wNumb({decimals: 0}),
  step: 100,
  range: {
    min: [300],
    max: 15700,
  },
});

stepsSlider.noUiSlider.on('update', function(values, handle) {
  let viewPrice = values[handle].replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
  viewPrice += '₽';
  viewNodes[handle].textContent = viewPrice;
});
