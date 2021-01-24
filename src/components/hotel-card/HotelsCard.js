import Glide from '@glidejs/glide';

class HotelsCard {
  static init() {
    const elements = this.getElements();
    elements.forEach(this.createSlider);
  }

  static createSlider(item) {
    new Glide(item, {type: 'carousel', classes: {activeNav: 'hotel-card__bullet-active'}}).mount()
  }

  static getElements() {
    return document.querySelectorAll('.js-hotel-card-glide');
  }
}

HotelsCard.init();
