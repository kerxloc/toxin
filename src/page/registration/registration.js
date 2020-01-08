import "../../style/index.scss";
import "./registration.scss";
import MainMenu from "../../components/main-menu/main-menu";
import Inputmask from "inputmask";

const mainMenuDomNode = {
  mainMenu: document.querySelector("#mainMenu"),
  burgerButton: document.querySelector("#mainMenuBurgerIcon"),
  authList: document.querySelector("#authListId"),
  profileButton: document.querySelector("#authButton")
};
new MainMenu(mainMenuDomNode);

Inputmask({ mask: "99.99.9999", placeholder: "ДД.ММ.ГГГГ" }).mask(`#dateInput`);
