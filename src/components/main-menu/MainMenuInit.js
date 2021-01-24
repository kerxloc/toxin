import MainMenu from './MainMenu';

class MainMenuInit {
  static _createInstance(parentDom) {
    const mainMenu = new MainMenu(parentDom);
    mainMenu.init();
  }

  static _getElements() {
    return document.querySelectorAll('.js-main-menu');
  }

  static init() {
    const elements = this._getElements();
    elements.forEach(this._createInstance);
  }
}

MainMenuInit.init();
