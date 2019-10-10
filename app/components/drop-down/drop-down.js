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
      const placeholder = options.placeholder ? options.placeholder : 'Выберите элимент';
      this.input = options.input;
      this.input.textContent = placeholder;
      this.input.addEventListener('click', this.show);
    } else {
      console.error('Expected input(node) inside constructor object but not received');
    }

    if (options.countElements) {
      this.countElements = options.countElements;
    } else {
      console.error('Expected countElements(Array) inside constructor object but not received');
    }

    if (options.countGroupView) {
      this.countGroupView = options.countGroupView;
    } else {
      console.error('Expected countGroupView(Array) inside constructor object but not received');
    }
  }

  getModifiedCountElements = () => {
    const modifiedCountElements = this.countElements.map((item, index) => {
      const minValue = item.minValue ? item.minValue : 0;
      const counter = minValue;
      item.id = `${index}${getRandomNumber(1, 10000)}`;
      item.counter = counter;
      item.minValue = minValue;
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

  onClickClear = evt => {
    evt.preventDefault();
    this.discardCounter();
  };

  discardCounter = () => {
    this.countElements.forEach(item => {
      const viewCounter = this.dropDownParent.querySelector(`#view-${item.id}`);
      viewCounter.textContent = item.minValue;
      item.counter = item.minValue;
    });

    const minusButtons = this.dropDownParent.querySelectorAll('.drop-down__counter-btn--minus');
    minusButtons.forEach(item => {
      item.classList.add('drop-down__counter-btn--disabled');
      item.setAttribute('disabled', 'true');
    });
  };

  getCountItem = element => {
    const countItem = getHtmlElement('li', 'drop-down__count-item');
    const countItemName = getHtmlElement('p', 'drop-down__count-item-name', element.name);
    const counterMenu = getHtmlElement('div', 'drop-down__counter-menu');
    const countItemMinus = getHtmlElement('button', 'drop-down__counter-btn');
    countItemMinus.classList.add('drop-down__counter-btn--minus');
    countItemMinus.classList.add('drop-down__counter-btn--disabled');
    countItemMinus.setAttribute('disabled', 'true');
    countItemMinus.type = 'button';
    const countItemView = getHtmlElement('p', 'drop-down__select-view');
    countItemView.textContent = element.counter;
    countItemView.id = `view-${element.id}`;
    const countItemPlus = getHtmlElement('button', 'drop-down__counter-btn');
    countItemPlus.classList.add('drop-down__counter-btn--plus');
    countItemPlus.type = 'button';

    countItemPlus.addEventListener('click', () => {
      element.counter++;
      countItemView.textContent = element.counter;
      const isMinusDisabled = countItemMinus.classList.contains('drop-down__counter-btn--disabled');
      if (isMinusDisabled) {
        countItemMinus.classList.remove('drop-down__counter-btn--disabled');
        countItemMinus.removeAttribute('disabled');
      }
    });

    countItemMinus.addEventListener('click', () => {
      element.counter--;
      countItemView.textContent = element.counter;
      const nextDecrimentCounter = element.counter - 1;
      if (nextDecrimentCounter < element.minValue) {
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
    clearBtn.addEventListener('click', this.onClickClear);
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
