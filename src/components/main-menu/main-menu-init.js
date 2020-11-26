import MainMenu from './main-menu';

class MainMenuInit {
  static init() {
    const elements = this.getElements();
    elements.forEach(this.createInstance);
  }

  static createInstance(parentDom) {
    const mainMenu = new MainMenu(parentDom);
    mainMenu.init();
  }

  static getElements() {
    return document.querySelectorAll('.js-main-menu');
  }
}

MainMenuInit.init();
