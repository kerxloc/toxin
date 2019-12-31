import "../../style/index.scss";
import "./headers-and-footers.scss";
import MainMenu from "../../components/main-menu/main-menu";

const firstMainMenuHtmlNode = {
  mainMenu: document.querySelector("#firstMainMenu"),
  burgerButton: document.querySelector("#firstBurgerBtn"),
  authList: document.querySelector("#firstAuthList"),
  profileButton: document.querySelector("#firstProfileBtn")
};

const secondMainMenuHtmlNode = {
  mainMenu: document.querySelector("#secondMainMenu"),
  burgerButton: document.querySelector("#secondBurgerBtn")
};

new MainMenu(firstMainMenuHtmlNode);
new MainMenu(secondMainMenuHtmlNode);
