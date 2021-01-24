class MainMenu {
  constructor(parentDom) {
    this.parentDom = parentDom;
  }

  init() {
    this.setSubMenuListener();
    this.setBurgerListener();
    this.isAuthorized = !this.parentDom.parentNode.querySelector('.js-profile-btn');
    if (!this.isAuthorized) {
      this.setAuthListener();
    }
  }

  setSubMenuListener() {
    const subMenuItems = this.parentDom.querySelectorAll('.js-main-menu-item-sub-menu');
    subMenuItems.forEach(this.addSubMenuItemListener);
  }

  setBurgerListener() {
    const burgerBtn = this.parentDom.querySelector('.js-main-menu-burger-btn');
    burgerBtn.addEventListener('click', this.handleBurgerBtnClick);
  }

  handleBurgerBtnClick = () => {
    this.toggleBurgerBtnClass();

    if (!this.isAuthorized) {
      this.toggleAuthBtnClass();
      const authList = this.parentDom.parentNode.querySelector('.js-auth-list');
      const isAuthListActive = authList.classList.contains('page-header__auth-list_active');

      if (!isAuthListActive) {
        this.toggleMainMenuClass();
      }

      if (isAuthListActive) {
        this.toggleAuthListClass();
      }
    } else {
      this.toggleMainMenuClass();
    }
  };

  setAuthListener() {
    const authBtn = this.parentDom.parentNode.querySelector('.js-profile-btn');
    authBtn.addEventListener('click', this.handleAuthBtnClick);
  }

  handleAuthBtnClick = () => {
    this.toggleBurgerBtnClass();
    this.toggleAuthBtnClass();
    this.toggleAuthListClass();
  }

  addSubMenuItemListener = subMenuItem => {
    const subMenuLink = subMenuItem.firstChild;
    const subMenu = subMenuLink.nextSibling;
    subMenuItem.addEventListener('mouseover', () => this.addSubMenuClass(subMenu));
    subMenuItem.addEventListener('mouseleave', () => this.removeSubMenuClass(subMenu));
  };

  addSubMenuClass(subMenu) {
    subMenu.classList.add('main-menu__sub-menu_opened');
  }

  removeSubMenuClass(subMenu) {
    subMenu.classList.remove('main-menu__sub-menu_opened');
  }

  toggleBurgerBtnClass() {
    const burgerBtn = this.parentDom.querySelector('.js-main-menu-burger-btn');
    burgerBtn.classList.toggle('main-menu__burger-icon_active');
  }

  toggleMainMenuClass() {
    this.parentDom.classList.toggle('main-menu_active');
  }

  toggleAuthBtnClass() {
    const authBtn = this.parentDom.parentNode.querySelector('.js-profile-btn');
    authBtn.classList.toggle('page-header__auth-profile_hidden');
  }

  toggleAuthListClass() {
    const authList = this.parentDom.parentNode.querySelector('.js-auth-list');
    authList.classList.toggle('page-header__auth-list_active');
  }
}

export default MainMenu;
