import "../../style/index.scss";
import "./rooms.scss";
import DropDown from "../../components/drop-down/drop-down";
import ExpandableCheckbox from "../../components/checkbox/checkbox";
import MainMenu from "../../components/main-menu/main-menu";

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

const dropDownGuestContainer = document.querySelector(
  "#drop-down-guest-container"
);
const inputDropDownGuest = document.querySelector("#number-guest");

const dropDownGuestOptions = {
  container: dropDownGuestContainer,
  input: inputDropDownGuest,
  countElements: [
    { name: "Взрослые", countGroupName: "guest", startValue: 3 },
    { name: "Дети", countGroupName: "guest", startValue: 0 },
    { name: "Младенцы", countGroupName: "child", startValue: 1 }
  ],
  countGroupView: {
    guest: { counter: 3, views: ["гость", "гостя", "гостей"] },
    child: { counter: 1, views: ["младенец", "младенца", "младенцев"] }
  },
  placeholder: "Cколько гостей"
};

const dropDownGuest = new DropDown(dropDownGuestOptions);
dropDownGuest.init();

const expandableBtn = document.querySelector("#checkbox-expandable-btn");
const expandableList = document.querySelector("#checkbox-expandable-list");

const expandableCheckbox = new ExpandableCheckbox({
  expandableBtn,
  expandableList
});
expandableCheckbox.init();

const mainMenuDomNode = {
  mainMenu: document.querySelector("#mainMenu"),
  burgerButton: document.querySelector("#mainMenuBurgerIcon"),
  authList: document.querySelector("#authListId"),
  profileButton: document.querySelector("#authButton")
};
new MainMenu(mainMenuDomNode);
