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

function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
  ];
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
      this.placeholder = placeholder;
      this.input = options.input;
      this.input.textContent = placeholder;
      this.input.addEventListener('click', this.show);
    } else {
      console.error('Expected input(node) inside constructor object but not received');
    }

    if (options.countElements) {
      this.countElements = options.countElements;
      this.inputViews = [];
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
    this.discardViewCounter();
    this.input.textContent = this.placeholder;
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

  discardViewCounter = () => {
    Object.keys(this.countGroupView).forEach(item => {
      this.countGroupView[item].counter = 0;
    });
  };

  renderViewCount = countGroupName => {
    const isWordMulty = Object.keys(this.countGroupView).every(item => {
      return this.countGroupView[item].counter > 0;
    });
    if (isWordMulty) {
      let wordOfNum = '';
      Object.keys(this.countGroupView).forEach((item, index) => {
        const currentCounterGroup = this.countGroupView[item];
        const currentCounter = currentCounterGroup.counter;
        const currentWord = declOfNum(currentCounter, currentCounterGroup.views);
        if (index > 0) {
          wordOfNum += ', ';
        }
        wordOfNum += `${currentCounter} ${currentWord}`;
      });
      this.input.textContent = wordOfNum;
    } else {
      const groupView = this.countGroupView[countGroupName];
      const wordOfNum = declOfNum(groupView.counter, groupView.views);
      this.input.textContent = `${groupView.counter} ${wordOfNum}`;
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
    countItemMinus.type = 'button';
    const countItemView = getHtmlElement('p', 'drop-down__select-view');
    countItemView.textContent = element.counter;
    countItemView.id = `view-${element.id}`;
    const countItemPlus = getHtmlElement('button', 'drop-down__counter-btn');
    countItemPlus.classList.add('drop-down__counter-btn--plus');
    countItemPlus.type = 'button';

    countItemPlus.addEventListener('click', () => {
      const groupView = this.countGroupView[element.countGroupName];
      element.counter++;
      groupView.counter++;
      countItemView.textContent = element.counter;
      this.renderViewCount(element.countGroupName);
      const isMinusDisabled = countItemMinus.classList.contains('drop-down__counter-btn--disabled');
      if (isMinusDisabled) {
        countItemMinus.classList.remove('drop-down__counter-btn--disabled');
        countItemMinus.removeAttribute('disabled');
      }
    });

    countItemMinus.addEventListener('click', () => {
      const groupView = this.countGroupView[element.countGroupName];
      element.counter--;
      groupView.counter--;
      countItemView.textContent = element.counter;
      const nextDecrimentCounter = element.counter - 1;
      if (nextDecrimentCounter < element.minValue) {
        countItemMinus.classList.add('drop-down__counter-btn--disabled');
        countItemMinus.setAttribute('disabled', 'true');
      } else {
        this.renderViewCount(element.countGroupName);
      }

      if (groupView.counter === 0) {
        const isCounterGroupClear = Object.keys(this.countGroupView).every(item => {
          return this.countGroupView[item].counter === 0;
        });
        if (isCounterGroupClear) {
          this.input.textContent = this.placeholder;
        } else {
          const wordOfNum = declOfNum(groupView.counter + 1, groupView.views);
          const inputWord = `${groupView.counter + 1} ${wordOfNum}`;
          const newInputWord = this.input.textContent.replace(inputWord, '');
          this.input.textContent = newInputWord;
        }
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
