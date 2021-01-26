import MainMenu from './MainMenu';

class MainMenuInit {
  static init() {
    const elements = this._getElements();
    elements.forEach(this._createInstance);
  }

  static _createInstance(parentDom) {
    const mainMenu = new MainMenu(parentDom);
    mainMenu.init();
  }

  static _getElements() {
    return document.querySelectorAll('.js-main-menu');
  }
}

MainMenuInit.init();
