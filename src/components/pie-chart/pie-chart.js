import Chart from 'chart.js';

const ctx = document.getElementById('doughnut-chart').getContext('2d');

const yellowGradient = ctx.createLinearGradient(0, 0, 0, 120);
yellowGradient.addColorStop(0, '#FFE39C');
yellowGradient.addColorStop(1, '#FFBA9C');

const purpleGradient = ctx.createLinearGradient(0, 0, 0, 60);
purpleGradient.addColorStop(0, '#BC9CFF');
purpleGradient.addColorStop(1, '#8BA4F9');

const greenGradient = ctx.createLinearGradient(0, 60, 0, 120);
greenGradient.addColorStop(0, '#6FCF97');
greenGradient.addColorStop(1, '#66D2EA');

new Chart(document.getElementById('doughnut-chart'), {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: [25, 25, 50],
        borderWidth: 3,
        hoverBorderWidth: 0,
        backgroundColor: [purpleGradient, greenGradient, yellowGradient],
      },
    ],
  },
  options: {
    animation: {
      animateScale: false,
      animateRotate: false,
    },
    cutoutPercentage: 85,
    legend: false,
    tooltips: {
      enabled: false,
    },
  },
});