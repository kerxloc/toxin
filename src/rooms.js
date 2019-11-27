import "./style/main.scss";
import DropDown from "./components/drop-down/drop-down";

const dropDownContainer = document.querySelector("#drop-down-container");
const inputDropDown = document.querySelector("#number-bed");

const dropDownOptions = {
  container: dropDownContainer,
  input: inputDropDown,
  countElements: [
    { name: "Спальни", countGroupName: "bedrooms", startValue: 2 },
    { name: "Кровати", countGroupName: "bed", startValue: 2 },
    { name: "Ванные комнаты", countGroupName: "bath", startValue: 0 }
  ],
  countGroupView: {
    bedrooms: { counter: 2, views: ["спальня", "спальни", "спален"] },
    bed: { counter: 2, views: ["кровать", "кровати", "кроватей"] },
    bath: {
      counter: 0,
      views: ["ванная комната", "ванные комнаты", "ванных комнат"]
    }
  },
  placeholder: "Удобства номера"
};

const dropDown = new DropDown(dropDownOptions);
dropDown.init();
