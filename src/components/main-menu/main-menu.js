class MainMenu {
  constructor(options) {
    if (options.mainMenu) {
      this.mainMenu = options.mainMenu;
    } else {
      console.error(
        "Expected burgerButton(node) inside constructor object but not received"
      );
    }

    if (options.burgerButton) {
      this.burgerButton = options.burgerButton;
      this.burgerButton.addEventListener("click", this.onBurgerButtonClick);
    } else {
      console.error(
        "Expected burgerButton(node) inside constructor object but not received"
      );
    }

    if (options.profileButton) {
      this.profileButton = options.profileButton;
      this.profileButton.addEventListener("click", this.onProfileButtonClick);
    } else {
      this.profileButton = undefined;
    }

    this.isProfileActive = false;
    this.authList = options.authList;
  }

  onBurgerButtonClick = evt => {
    evt.preventDefault();

    if (this.isProfileActive) {
      this.authList.classList.remove("page-header__auth-list_active");
      this.isProfileActive = false;
    } else {
      this.mainMenu.classList.toggle("main-menu_active");
    }

    this.burgerButton.classList.toggle("main-menu__burger-icon_active");
    if (this.profileButton) {
      this.profileButton.classList.toggle("page-header__auth-profile_hiden");
    }
  };

  onProfileButtonClick = evt => {
    evt.preventDefault();
    if (!this.isProfileActive) {
      this.authList.classList.add("page-header__auth-list_active");
      this.burgerButton.classList.add("main-menu__burger-icon_active");
      this.isProfileActive = true;
      this.profileButton.classList.add("page-header__auth-profile_hiden");
    }
  };
}

export default MainMenu;
