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
    this.burgerBtnToggleClass();

    if (!this.isAuthorized) {
      this.authBtnToggleClass();
      const authList = this.parentDom.parentNode.querySelector('.js-auth-list');
      const isAuthListActive = authList.classList.contains('page-header__auth-list_active');

      if (!isAuthListActive) {
        this.mainMenuToggleClass();
      }

      if (isAuthListActive) {
        this.authListToggleClass();
      }
    } else {
      this.mainMenuToggleClass();
    }
  };

  setAuthListener() {
    const authBtn = this.parentDom.parentNode.querySelector('.js-profile-btn');
    authBtn.addEventListener('click', this.handleAuthBtnClick);
  }

  handleAuthBtnClick = () => {
    this.burgerBtnToggleClass();
    this.authBtnToggleClass();
    this.authListToggleClass();
  }

  addSubMenuItemListener = subMenuItem => {
    const subMenuLink = subMenuItem.firstChild;
    const subMenu = subMenuLink.nextSibling;
    subMenuItem.addEventListener('mouseover', () => this.subMenuAddClass(subMenu));
    subMenuItem.addEventListener('mouseleave', () => this.subMenuRemoveClass(subMenu));
  };

  subMenuAddClass(subMenu) {
    subMenu.classList.add('main-menu__sub-menu_opened');
  }

  subMenuRemoveClass(subMenu) {
    subMenu.classList.remove('main-menu__sub-menu_opened');
  }

  burgerBtnToggleClass() {
    const burgerBtn = this.parentDom.querySelector('.js-main-menu-burger-btn');
    burgerBtn.classList.toggle('main-menu__burger-icon_active');
  }

  mainMenuToggleClass() {
    this.parentDom.classList.toggle('main-menu_active');
  }

  authBtnToggleClass() {
    const authBtn = this.parentDom.parentNode.querySelector('.js-profile-btn');
    authBtn.classList.toggle('page-header__auth-profile_hidden');
  }

  authListToggleClass() {
    const authList = this.parentDom.parentNode.querySelector('.js-auth-list');
    authList.classList.toggle('page-header__auth-list_active');
  }
}

export default MainMenu;
