const burgerButton = document.querySelector('#mainMenuBurgerIcon');

burgerButton.addEventListener('click', evt => {
  evt.preventDefault();
  burgerButton.classList.toggle('main-menu__burger-icon--active');
});
