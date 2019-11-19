const burgerButton = document.querySelector("#mainMenuBurgerIcon");
const profileButton = document.querySelector("#authProfile");
const mainMenu = document.querySelector(".main-menu");
const authList = document.querySelector(".page-header__auth-list");
let isProfileActive = false;

burgerButton.addEventListener("click", evt => {
  evt.preventDefault();
  if (isProfileActive) {
    authList.classList.remove("page-header__auth-list--active");
    isProfileActive = false;
  } else {
    mainMenu.classList.toggle("main-menu--active");
  }
  burgerButton.classList.toggle("main-menu__burger-icon--active");
  profileButton.classList.toggle("page-header__auth-profile--hide");
});

profileButton.addEventListener("click", evt => {
  evt.preventDefault();
  if (!isProfileActive) {
    authList.classList.add("page-header__auth-list--active");
    burgerButton.classList.add("main-menu__burger-icon--active");
    isProfileActive = true;
    profileButton.classList.add("page-header__auth-profile--hide");
  }
});
