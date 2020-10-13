class MainMenu {
  constructor(options) {
    if (options.mainMenu) {
      this.mainMenu = options.mainMenu;
      this.mainMenuList = this.mainMenu.querySelectorAll('.main-menu__item');
      this.mainMenuList.forEach(item => {
        if (item.classList.contains('main-menu__item_sub-menu')) {
          item.addEventListener('mouseover', () => {
            const subMenu = item.querySelector('.main-menu__sub-menu');
            subMenu.classList.add('main-menu__sub-menu_opened');
          });

          item.addEventListener('mouseleave', () => {
            const subMenu = item.querySelector('.main-menu__sub-menu');
            subMenu.classList.remove('main-menu__sub-menu_opened');
          });
        }
      });
    } else {
      console.error('Expected burgerButton(node) inside constructor object but not received');
    }

    if (options.burgerButton) {
      this.burgerButton = options.burgerButton;
      this.burgerButton.addEventListener('click', this.onBurgerButtonClick);
    } else {
      console.error('Expected burgerButton(node) inside constructor object but not received');
    }

    if (options.profileButton) {
      this.profileButton = options.profileButton;
      this.profileButton.addEventListener('click', this.onProfileButtonClick);
    } else {
      this.profileButton = undefined;
    }

    this.isProfileActive = false;
    this.authList = options.authList;
  }

  onBurgerButtonClick = evt => {
    evt.preventDefault();

    if (this.isProfileActive) {
      this.authList.classList.remove('page-header__auth-list_active');
      this.isProfileActive = false;
    } else {
      this.mainMenu.classList.toggle('main-menu_active');
    }

    this.burgerButton.classList.toggle('main-menu__burger-icon_active');
    if (this.profileButton) {
      this.profileButton.classList.toggle('page-header__auth-profile_hiden');
    }
  };

  onProfileButtonClick = evt => {
    evt.preventDefault();
    if (!this.isProfileActive) {
      this.authList.classList.add('page-header__auth-list_active');
      this.burgerButton.classList.add('main-menu__burger-icon_active');
      this.isProfileActive = true;
      this.profileButton.classList.add('page-header__auth-profile_hiden');
    }
  };

  onToggleSubMenu = evt => {
    evt.preventDefault();
  };
}

export default MainMenu;
