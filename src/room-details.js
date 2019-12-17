import "./style/main.scss";
import Chart from "chart.js";

new Chart(document.getElementById("doughnut-chart"), {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [25, 25, 50],
        borderWidth: 3,
        hoverBorderWidth: 0,
        backgroundColor: ["#bc9cff", "#6fcf97", "#ffe39c"]
      }
    ]
  },
  options: {
    animation: {
      animateScale: false,
      animateRotate: false
    },
    cutoutPercentage: 85,
    legend: false,
    tooltips: {
      enabled: false
    }
  } 
});
