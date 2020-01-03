import "../../style/index.scss";
import "./room-details.scss";
import Chart from "chart.js";
import MainMenu from "../../components/main-menu/main-menu";
import DatePicker from "../../components/date-picker/date-picker";
import DropDown from "../../components/drop-down/drop-down";

const ctx = document.getElementById("doughnut-chart").getContext("2d");

const yellowGradient = ctx.createLinearGradient(0, 0, 0, 120);
yellowGradient.addColorStop(0, "#FFE39C");
yellowGradient.addColorStop(1, "#FFBA9C");

const purpleGradient = ctx.createLinearGradient(0, 0, 0, 60);
purpleGradient.addColorStop(0, "#BC9CFF");
purpleGradient.addColorStop(1, "#8BA4F9");

const greenGradient = ctx.createLinearGradient(0, 60, 0, 120);
greenGradient.addColorStop(0, "#6FCF97");
greenGradient.addColorStop(1, "#66D2EA");

new Chart(document.getElementById("doughnut-chart"), {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [25, 25, 50],
        borderWidth: 3,
        hoverBorderWidth: 0,
        backgroundColor: [purpleGradient, greenGradient, yellowGradient]
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

const mainMenuDomNode = {
  mainMenu: document.querySelector("#mainMenu"),
  burgerButton: document.querySelector("#mainMenuBurgerIcon"),
  authList: document.querySelector("#authListId"),
  profileButton: document.querySelector("#authButton")
};
new MainMenu(mainMenuDomNode);

const dropDownContainer = document.querySelector("#drop-down-total-container");
const inputDropDown = document.querySelector("#number-total-guests-input");

const dropDownOptions = {
  container: dropDownContainer,
  input: inputDropDown,
  countElements: [
    { name: "Взрослые", countGroupName: "guest", startValue: 3 },
    { name: "Дети", countGroupName: "guest", startValue: 0 },
    { name: "Младенцы", countGroupName: "child", startValue: 0 }
  ],
  countGroupView: {
    guest: { counter: 3, views: ["гость", "гостя", "гостей"] },
    child: { counter: 0, views: ["младенец", "младенца", "младенцев"] }
  },
  placeholder: "Cколько гостей"
};

const dropDown = new DropDown(dropDownOptions);
dropDown.init();
