import '../../style/main.scss';
import './registration.scss';
import MainMenu from '../../components/main-menu/main-menu';

const mainMenuDomNode = {
  mainMenu: document.querySelector('.js-main-menu'),
  burgerButton: document.querySelector('.js-main-menu-burger-btn'),
  authList: document.querySelector('.js-auth-list'),
  profileButton: document.querySelector('.js-profile-btn'),
};

new MainMenu(mainMenuDomNode);