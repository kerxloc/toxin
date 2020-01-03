import "../../style/index.scss";
import "./auth.scss";
import MainMenu from "../../components/main-menu/main-menu";

const mainMenuDomNode = {
  mainMenu: document.querySelector("#mainMenu"),
  burgerButton: document.querySelector("#mainMenuBurgerIcon"),
  authList: document.querySelector("#authListId"),
  profileButton: document.querySelector("#authButton")
};
new MainMenu(mainMenuDomNode);