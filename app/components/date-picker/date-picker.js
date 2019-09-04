import Inputmask from 'inputmask';
import isNumeric from 'validator/lib/isNumeric';

const monthRusTranslate = {
  0: 'Январь',
  1: 'Февраль',
  2: 'Март',
  3: 'Апрель',
  4: 'Май',
  5: 'Июнь',
  6: 'Июль',
  7: 'Август',
  8: 'Сентябрь',
  9: 'Октябрь',
  10: 'Ноябрь',
  11: 'Декабрь',
};

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

function getTwoDigitNumberString(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return number;
}

class DatePicker {
  constructor(domInfo = {}) {
    if (domInfo.parentNodeId) {
      this.parentNode = document.querySelector(`#${domInfo.parentNodeId}`);
    } else {
      console.error('Expected parentNodeId inside constructor object but not received');
    }

    if (domInfo.arrivalInputId) {
      this.arrivalInput = document.querySelector(`#${domInfo.arrivalInputId}`);
      Inputmask({ mask: '99.99.9999', placeholder: 'ДД.ММ.ГГГГ' }).mask(
        `#${domInfo.arrivalInputId}`,
      );
      this.arrivalInput.addEventListener('blur', this.onInputDateArrival);
    } else {
      console.error('Expected arrivalInputId inside constructor object but not received');
    }

    if (domInfo.departureInputId) {
      this.departureInput = document.querySelector(`#${domInfo.departureInputId}`);
      Inputmask({ mask: '99.99.9999', placeholder: 'ДД.ММ.ГГГГ' }).mask(
        `#${domInfo.departureInputId}`,
      );
    } else {
      console.error('Expected departureInputId inside constructor object but not received');
    }

    this.currentDate = new Date();
    this.arrivalDate = null;
    this.departureDate = null;
    this.arrivalCell = null;
    this.departureCell = null;
    this.isStartSelect = false;
    this.isEndSelect = false;
  }

  hasCurrentMonth = date => {
    return date.getMonth() === this.currentDate.getMonth();
  };

  compaireDate = (firstDate, secondDate) => {
    const firstDay = firstDate.getDate();
    const firstMonth = firstDate.getMonth();
    const firstYear = firstDate.getFullYear();

    const secondDay = secondDate.getDate();
    const secondMonth = secondDate.getMonth();
    const secondYear = secondDate.getFullYear();

    if (firstYear > secondYear) {
      return 1;
    }

    if (firstYear < secondYear) {
      return -1;
    }

    if (firstMonth > secondMonth) {
      return 1;
    }

    if (firstMonth < secondMonth) {
      return -1;
    }

    if (firstDay > secondDay) {
      return 1;
    }

    if (firstDay < secondDay) {
      return -1;
    }

    return 0;
  };

  hasDataFull = textDate => {
    const textDateSplit = textDate.split('.');
    const isDataFullNumber = textDateSplit.every(item => isNumeric(item));
    return isDataFullNumber;
  };

  showErrorAnimation = () => {
    const datePicker = this.parentNode.querySelector('.date-picker');
    datePicker.classList.add('date-picker--error-animation');
    setTimeout(() => {
      datePicker.classList.remove('date-picker--error-animation');
    }, 700);
  };

  getConverteDateByUserInput = userDate => {
    const splitUserDate = userDate.split('.');
    const day = splitUserDate[0];
    const month = splitUserDate[1];
    const year = splitUserDate[2];
    return new Date(year, month - 1, day);
  };

  getCalendarTopControl = () => {
    const datePickerHtmlControl = getHtmlElement('div', 'date-picker__control');
    const datePickerHtmlSliderBtnPrev = getHtmlElement(
      'button',
      'date-picker__slider-btn',
      'Назад',
    );
    datePickerHtmlSliderBtnPrev.classList.add('date-picker__slider-btn--prev');
    datePickerHtmlSliderBtnPrev.type = 'button';

    datePickerHtmlSliderBtnPrev.addEventListener('click', evt => {
      evt.preventDefault();
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const day = 1;
      const prevMonthDate = new Date(year, month - 1, day);
      this.updateCurrentDate(prevMonthDate);
    });

    const datePickerHtmlSliderBtnNext = getHtmlElement(
      'button',
      'date-picker__slider-btn',
      'Вперед',
    );
    datePickerHtmlSliderBtnNext.classList.add('date-picker__slider-btn--next');
    datePickerHtmlSliderBtnNext.type = 'button';

    datePickerHtmlSliderBtnNext.addEventListener('click', evt => {
      evt.preventDefault();
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const day = 1;
      const prevMonthDate = new Date(year, month + 1, day);
      this.updateCurrentDate(prevMonthDate);
    });

    const monthName = monthRusTranslate[this.currentDate.getMonth()];
    const yearName = this.currentDate.getFullYear();

    const datePickerHtmlTitle = getHtmlElement(
      'h2',
      'date-picker__title',
      `${monthName} ${yearName}`,
    );

    datePickerHtmlTitle.id = 'date-picker-main-title';

    datePickerHtmlControl.appendChild(datePickerHtmlSliderBtnPrev);
    datePickerHtmlControl.appendChild(datePickerHtmlTitle);
    datePickerHtmlControl.appendChild(datePickerHtmlSliderBtnNext);

    return datePickerHtmlControl;
  };

  getNumberRow = () => {
    const currentYear = this.currentDate.getFullYear();
    const currentMonth = this.currentDate.getMonth();
    const lastDayCurrentMonth = new Date(currentYear + 1, currentMonth + 1, 0).getDate();
    const lastWeekDayPrevMonth = new Date(currentYear, currentMonth, 0).getDay();
    const isLastWeekDaySuterday = lastWeekDayPrevMonth === 6;
    const isLastWeekDayFriday = lastWeekDayPrevMonth === 5;
    const isLastWeekDaySunday = lastWeekDayPrevMonth === 0;
    let numberRow = 5;

    if (isLastWeekDaySuterday && lastDayCurrentMonth >= 30) {
      numberRow = 6;
    }

    if (isLastWeekDayFriday && lastDayCurrentMonth === 31) {
      numberRow = 6;
    }

    if (isLastWeekDaySunday && lastDayCurrentMonth === 28) {
      numberRow = 4;
    }
    return numberRow;
  };

  getCalendarTableDate = () => {
    const tableFragment = document.createDocumentFragment();
    const nowDate = new Date();
    const currentYear = this.currentDate.getFullYear();
    const currentMonth = this.currentDate.getMonth();
    const lastWeekDayPrevMonth = new Date(currentYear, currentMonth, 0).getDay();
    const lastDayPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    const numberColumn = 7;
    const numberRow = this.getNumberRow();

    let viewMonth;
    let numberDay;

    const isLastWeekDaySunday = lastWeekDayPrevMonth === 0;

    if (isLastWeekDaySunday) {
      numberDay = 0;
      viewMonth = currentMonth;
    } else {
      numberDay = lastDayPrevMonth - lastWeekDayPrevMonth;
      viewMonth = currentMonth - 1;
    }

    for (let i = 0; i < numberRow; i++) {
      const tableTr = getHtmlElement('tr');

      for (let j = 0; j < numberColumn; j++) {
        const viewDate = new Date(currentYear, viewMonth, ++numberDay);
        const tableTd = getHtmlElement('td', 'date-picker__day', viewDate.getDate());
        const isNowDate = this.compaireDate(viewDate, nowDate) === 0;

        if (!this.hasCurrentMonth(viewDate) && !isNowDate) {
          tableTd.classList.add('date-picker__day--not-current');
        }

        if (isNowDate) {
          tableTd.classList.add('date-picker__day--current');
        }

        const viewMonthAtr = viewDate.getMonth() + 1;
        const viewDateAtr = `${viewDate.getFullYear()}-${viewMonthAtr}-${viewDate.getDate()}`;

        tableTd.setAttribute('aria-date', viewDateAtr);
        tableTr.appendChild(tableTd);
      }

      tableFragment.appendChild(tableTr);
    }

    return tableFragment;
  };

  paintingSelectCell = () => {
    const cells = this.parentNode.querySelectorAll('td');
    const apprivalAriaDate = this.arrivalCell ? this.arrivalCell.getAttribute('aria-date') : false;
    const departureAriaDate = this.departureCell
      ? this.departureCell.getAttribute('aria-date')
      : false;
    const apprivalDate = new Date(apprivalAriaDate);
    const departureDate = new Date(departureAriaDate);

    cells.forEach(cell => {
      const isCellStart = apprivalAriaDate === cell.getAttribute('aria-date');
      const isCellEnd = departureAriaDate === cell.getAttribute('aria-date');
      const cellDate = new Date(cell.getAttribute('aria-date'));

      if (isCellEnd) {
        cell.classList.add('date-picker__day--select-end');
        cell.classList.add('date-picker__day--select');
      }

      const isCellDateMoreThanApprivalDate = this.compaireDate(cellDate, apprivalDate) > 0;
      const isCellDateLessThanDepartureDate = this.compaireDate(cellDate, departureDate) < 0;
      const isCellDateInRange = isCellDateMoreThanApprivalDate && isCellDateLessThanDepartureDate;

      if (isCellDateInRange) {
        cell.classList.add('date-picker__day--select-space');
      }

      if (isCellStart && departureAriaDate) {
        cell.classList.add('date-picker__day--select-start');
        cell.classList.add('date-picker__day--select');
      } else if (isCellStart) {
        cell.classList.add('date-picker__day--select');
      }
    });
  };

  clearSelectCell = () => {
    const cells = this.parentNode.querySelectorAll('td');
    cells.forEach(cell => {
      const isCellSelect = cell.classList.contains('date-picker__day--select');
      const isCellSelectSpace = cell.classList.contains('date-picker__day--select-space');
      const isCellStartSelect = cell.classList.contains('date-picker__day--select-start');
      const isCellEndSelect = cell.classList.contains('date-picker__day--select-end');

      if (isCellSelectSpace) {
        cell.classList.remove('date-picker__day--select-space');
      }

      if (isCellSelect) {
        cell.classList.remove('date-picker__day--select');
      }

      if (isCellStartSelect) {
        cell.classList.remove('date-picker__day--select-start');
      }

      if (isCellEndSelect) {
        cell.classList.remove('date-picker__day--select-end');
      }
    });
  };

  getCellByAriaDate = ariaDate => {
    const cells = this.parentNode.querySelectorAll('td');
    let cell;
    console.log(ariaDate);
    cells.forEach(item => {
      const ariaDateItem = item.getAttribute('aria-date');
      if (ariaDateItem === ariaDate) cell = item;
    });
    return cell;
  };

  onInputDateArrival = evt => {
    const pickDate = evt.target.value;
    const isDataFull = this.hasDataFull(pickDate);
    if (isDataFull) {
      const convertePickDate = this.getConverteDateByUserInput(pickDate);
      const ariaDay = convertePickDate.getDate();
      const ariaMonth = convertePickDate.getMonth();
      const ariaYear = convertePickDate.getFullYear();
      const ariaDate = `${ariaYear}-${ariaMonth + 1}-${ariaDay}`;
      const pickCell = this.getCellByAriaDate(ariaDate);
      if (pickCell) {
        this.onStartSelectRangeDate(pickCell, convertePickDate);
      }
    }
  };

  onStartSelectRangeDate = (cell, startDate) => {
    this.arrivalCell = cell;
    this.isStartSelect = true;
    this.isEndSelect = false;
    this.arrivalDate = startDate;
    cell.classList.add('date-picker__day--select');
  };

  onSelectDate = evt => {
    evt.preventDefault();
    const isTdTag = evt.target.tagName.toLowerCase() === 'td';
    if (isTdTag) {
      if (this.isEndSelect) {
        this.clearSelectCell();
        this.arrivalDate = null;
        this.departureDate = null;
        this.arrivalCell = null;
        this.departureCell = null;
        this.isStartSelect = false;
        this.isEndSelect = false;
      }

      const td = evt.target;
      const selectDate = new Date(td.getAttribute('aria-date'));
      const selectDay = getTwoDigitNumberString(selectDate.getDate());
      const selectMonth = getTwoDigitNumberString(selectDate.getMonth() + 1);
      const selectYear = selectDate.getFullYear();
      const selectDateText = `${selectDay}.${selectMonth}.${selectYear}`;
      const isCellDoubleSelect = td === this.arrivalCell || td === this.departureCell;

      if (this.isStartSelect && !isCellDoubleSelect) {
        const isDateSelectLess = this.compaireDate(selectDate, this.arrivalDate) < 0;
        if (isDateSelectLess) {
          this.showErrorAnimation();
          td.classList.add('date-picker__day--error');
          setTimeout(() => {
            td.classList.remove('date-picker__day--error');
          }, 700);
        } else {
          this.departureCell = td;
          this.isStartSelect = false;
          this.isEndSelect = true;
          this.departureDate = selectDate;
          this.departureInput.value = selectDateText;
          td.classList.add('date-picker__day--select');
          this.paintingSelectCell();
        }
      } else if (isCellDoubleSelect && this.isEndSelect) {
        this.departureCell = td;
        this.isStartSelect = false;
        this.isEndSelect = true;
        this.departureDate = selectDate;
        this.departureInput.value = selectDateText;
        td.classList.add('date-picker__day--select');
      } else if (isCellDoubleSelect && !this.isEndSelect) {
        this.departureCell = td;
        this.isStartSelect = false;
        this.isEndSelect = true;
        this.departureDate = selectDate;
        this.departureInput.value = selectDateText;
        td.classList.add('date-picker__day--select');
      } else {
        this.onStartSelectRangeDate(td, selectDate);
        this.arrivalInput.value = selectDateText;
      }
    }
  };

  getCalendarTable = () => {
    const calendarTable = getHtmlElement('table', 'date-picker__calendar');
    const tHead = getHtmlElement('thead');
    const tBody = getHtmlElement('tbody');
    const tableTrHead = getHtmlElement('tr');
    const tableHead = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    tableHead.forEach(item => {
      const th = getHtmlElement('th', 'date-picker__th', item);
      tableTrHead.appendChild(th);
    });

    tHead.appendChild(tableTrHead);
    const tableDate = this.getCalendarTableDate();

    tBody.appendChild(tableDate);
    tBody.addEventListener('click', this.onSelectDate);

    calendarTable.appendChild(tHead);
    calendarTable.appendChild(tBody);
    return calendarTable;
  };

  getCalendarBotControl = () => {
    const datePickerHtmlControl = getHtmlElement('div', 'date-picker__control');
    const datePickerButtons = [
      { text: 'Очистить', isAccent: false },
      { text: 'Применить', isAccent: true },
    ];

    datePickerButtons.forEach(item => {
      const btn = getHtmlElement('button', 'date-picker__button', item.text);
      btn.type = 'button';

      if (item.isAccent) {
        btn.classList.add('date-picker__button--accent');
      }

      datePickerHtmlControl.appendChild(btn);
    });

    return datePickerHtmlControl;
  };

  getCalendar = () => {
    const datePickerHtmlSection = getHtmlElement('section', 'date-picker');
    const datePickerHtmlWrap = getHtmlElement('div', 'date-picker__wrap');
    const datePickerHtmlControl = this.getCalendarTopControl();
    const datePickerHtmlTable = this.getCalendarTable();
    const datePickerHtmlBotControl = this.getCalendarBotControl();
    datePickerHtmlWrap.appendChild(datePickerHtmlControl);
    datePickerHtmlWrap.appendChild(datePickerHtmlTable);
    datePickerHtmlWrap.appendChild(datePickerHtmlBotControl);
    datePickerHtmlSection.appendChild(datePickerHtmlWrap);

    return datePickerHtmlSection;
  };

  updateCurrentDate = date => {
    this.currentDate = date;
    this.updateCalendar();
    this.paintingSelectCell();
  };

  updateCalendar = () => {
    this.updateCalendarTitle();
    this.updateCalendarTable();
  };

  updateCalendarTitle = () => {
    const title = document.querySelector('#date-picker-main-title');
    const monthName = monthRusTranslate[this.currentDate.getMonth()];
    const yearName = this.currentDate.getFullYear();
    title.textContent = `${monthName} ${yearName}`;
  };

  updateCalendarTable = () => {
    const calendarTable = this.parentNode.querySelector('table');
    const calendarTableBody = calendarTable.querySelector('tbody');
    calendarTable.removeChild(calendarTableBody);
    const tBody = getHtmlElement('tbody');
    const tableDate = this.getCalendarTableDate();
    tBody.addEventListener('click', this.onSelectDate);
    tBody.appendChild(tableDate);
    calendarTable.appendChild(tBody);
  };

  renderCalendar = () => {
    const calendar = this.getCalendar();
    this.parentNode.appendChild(calendar);
  };
}

export default DatePicker;
