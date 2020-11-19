import '../../style/main.scss';
import './headers-and-footers.scss';
import MainMenu from '../../components/main-menu/main-menu';

const firstMainMenuHtmlNode = {
  mainMenu: document.querySelector('.js-main-menu'),
  burgerButton: document.querySelector('.js-main-menu-burger-btn'),
  authList: document.querySelector('.js-auth-list'),
  profileButton: document.querySelector('.js-profile-btn'),
};

const secondMainMenuHtmlNode = {
  mainMenu: document.querySelector('.js-second-main-menu'),
  burgerButton: document.querySelector('.js-second-main-menu-burger-btn'),
};

new MainMenu(firstMainMenuHtmlNode);
new MainMenu(secondMainMenuHtmlNode);