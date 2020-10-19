import Glide from '@glidejs/glide';

const allSlider = document.querySelectorAll('.glide');
allSlider.forEach(item =>
  new Glide(item, {type: 'carousel', classes: {activeNav: 'hotel-card__bullet-active'}}).mount()
);
