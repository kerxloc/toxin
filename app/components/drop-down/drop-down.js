function getHtmlElement(tagName, className, text) {
  const element = document.createElement(tagName);

  if (className) {
    element.classList.add(className);
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}

function getRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (+max - +min)) + +min;
  return randomNumber;
}

class DropDown {
  constructor(options) {
    if (options.container) {
      this.container = options.container;
      const dropDownParent = getHtmlElement('section', 'drop-down');
      this.dropDownParent = dropDownParent;
    } else {
      console.error('Expected container(node) inside constructor object but not received');
    }

    if (options.input) {
      this.input = options.input;
      this.input.addEventListener('click', this.show);
    } else {
      console.error('Expected input(node) inside constructor object but not received');
    }

    if (options.countElements) {
      this.countElements = options.countElements;
    } else {
      console.error('Expected countElements(Array) inside constructor object but not received');
    }
  }

  getModifiedCountElements = () => {
    const modifiedCountElements = this.countElements.map((item, index) => {
      const counter = item.minValue ? item.minValue : 0;
      item.id = `${index}${getRandomNumber(1, 10000)}`;
      item.counter = counter;
      return item;
    });

    return modifiedCountElements;
  };

  show = () => {
    const isHaveClass = this.dropDownParent.classList.contains('drop-down--show');
    if (!isHaveClass) {
      this.dropDownParent.classList.add('drop-down--show');
      window.addEventListener('mouseup', this.onClickHide);
      window.addEventListener('keyup', this.onPressHide);
    }
  };

  hide = () => {
    const isHaveClass = this.dropDownParent.classList.contains('drop-down--show');
    if (isHaveClass) {
      this.dropDownParent.classList.remove('drop-down--show');
      window.removeEventListener('mouseup', this.onClickHide);
      window.removeEventListener('keyup', this.onPressHide);
    }
  };

  onClickHide = evt => {
    const isInputClick = evt.target === this.input;
    const isCalendarClick = this.dropDownParent.contains(evt.target);
    const isOutsideClick = !isInputClick && !isCalendarClick;
    if (isOutsideClick) {
      this.hide();
    }
  };

  onPressHide = evt => {
    const isEscPress = evt.keyCode === 27;
    if (isEscPress) {
      this.hide();
    }
  };

  getCountItem = element => {
    const countItem = getHtmlElement('li', 'drop-down__count-item');
    const countItemName = getHtmlElement('p', 'drop-down__count-item-name', element.name);
    const counterMenu = getHtmlElement('div', 'drop-down__counter-menu');
    const countItemMinus = getHtmlElement('button', 'drop-down__counter-btn');
    countItemMinus.classList.add('drop-down__counter-btn--minus');
    countItemMinus.classList.add('drop-down__counter-btn--disabled');
    countItemMinus.setAttribute('disabled', 'true');
    const countItemView = getHtmlElement('p', 'drop-down__select-view', '0');
    const countItemPlus = getHtmlElement('button', 'drop-down__counter-btn');
    countItemPlus.classList.add('drop-down__counter-btn--plus');
    countItemMinus.type = 'button';
    countItemPlus.type = 'button';
    let counter = 0;

    if (element.minValue) {
      counter = element.minValue;
      countItemView.textContent = element.minValue;
    }

    countItemPlus.addEventListener('click', () => {
      counter++;
      countItemView.textContent = counter;
      if (countItemMinus.classList.contains('drop-down__counter-btn--disabled')) {
        countItemMinus.classList.remove('drop-down__counter-btn--disabled');
        countItemMinus.removeAttribute('disabled');
      }
    });

    countItemMinus.addEventListener('click', () => {
      const minValue = element.minValue ? element.minValue : 0;
      counter--;
      countItemView.textContent = counter;
      const nextDecrimentCounter = counter - 1;
      if (nextDecrimentCounter < minValue) {
        countItemMinus.classList.add('drop-down__counter-btn--disabled');
        countItemMinus.setAttribute('disabled', 'true');
      }
    });

    counterMenu.appendChild(countItemMinus);
    counterMenu.appendChild(countItemView);
    counterMenu.appendChild(countItemPlus);
    countItem.appendChild(countItemName);
    countItem.appendChild(counterMenu);
    return countItem;
  };

  init = () => {
    const modifiedCountElements = this.getModifiedCountElements();
    this.countElements = modifiedCountElements;
    const dropDownParentWrap = getHtmlElement('div', 'drop-down__wrap');
    const countList = getHtmlElement('ul', 'drop-down__count-list');
    const dropDownControl = getHtmlElement('div', 'drop-down__control');
    const clearBtn = getHtmlElement('button', 'drop-down__button', 'Очистить');
    clearBtn.type = 'button';
    const acceptBtn = getHtmlElement('button', 'drop-down__button', 'Применить');
    acceptBtn.type = 'button';
    acceptBtn.classList.add('drop-down__button--accent');
    const countListFragment = document.createDocumentFragment();

    this.countElements.forEach(element => {
      const countItem = this.getCountItem(element);
      countListFragment.appendChild(countItem);
    });

    countList.appendChild(countListFragment);
    dropDownControl.appendChild(clearBtn);
    dropDownControl.appendChild(acceptBtn);
    dropDownParentWrap.appendChild(countList);
    dropDownParentWrap.appendChild(dropDownControl);
    this.dropDownParent.appendChild(dropDownParentWrap);
    this.container.appendChild(this.dropDownParent);
  };
}

export default DropDown;
