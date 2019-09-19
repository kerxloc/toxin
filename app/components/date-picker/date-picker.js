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
      this.arrivalInput.addEventListener('focus', this.onFocusArrivalInput);
      this.arrivalInput.addEventListener('keydown', evt => {
        const isPressEnter = evt.keyCode === 13;
        if (isPressEnter) {
          evt.preventDefault();
          this.showArrivalMonthCalendar();
          this.departureInput.focus();
        }
      });
    } else {
      console.error('Expected arrivalInputId inside constructor object but not received');
    }

    if (domInfo.departureInputId) {
      this.departureInput = document.querySelector(`#${domInfo.departureInputId}`);
      Inputmask({ mask: '99.99.9999', placeholder: 'ДД.ММ.ГГГГ' }).mask(
        `#${domInfo.departureInputId}`,
      );
      this.departureInput.addEventListener('focus', this.onFocusDepartureInput);
      this.departureInput.addEventListener('keydown', evt => {
        const isPressEnter = evt.keyCode === 13;
        if (isPressEnter) {
          evt.preventDefault();
          this.showDepartureMonthCalendar();
        }
      });
    } else {
      console.error('Expected departureInputId inside constructor object but not received');
    }

    if (domInfo.arrivalSplitBtnId) {
      this.arrivalSplitBtn = document.querySelector(`#${domInfo.arrivalSplitBtnId}`);
      this.arrivalSplitBtn.addEventListener('click', this.showArrivalMonthCalendar);
    } else {
      console.error('Expected arrivalSplitBtnId inside constructor object but not received');
    }

    if (domInfo.departureSplitBtnId) {
      this.departureSplitBtn = document.querySelector(`#${domInfo.departureSplitBtnId}`);
      this.departureSplitBtn.addEventListener('click', this.showDepartureMonthCalendar);
    } else {
      console.error('Expected departureSplitBtnId inside constructor object but not received');
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

  showCalendar = () => {
    console.log('showCalendar');
    const calendar = this.parentNode.querySelector('.date-picker');
    const isHaveShowClass = calendar.classList.contains('date-picker--show');
    if (!isHaveShowClass) {
      calendar.classList.add('date-picker--show');
    }
    setTimeout(() => {
      document.body.addEventListener('mouseup', evt => {
        const isInputClick = evt.target === this.arrivalInput || evt.target === this.departureInput;
        const isCalendarClick = calendar.contains(evt.target);
        const isOutsideClick = !isInputClick && !isCalendarClick;
        if (isOutsideClick) {
          this.unshowCalendar();
        }
      });
    }, 500);
  };

  unshowCalendar = () => {
    console.log('unshowCalendar');
    const calendar = this.parentNode.querySelector('.date-picker');
    const isHaveShowClass = calendar.classList.contains('date-picker--show');
    if (isHaveShowClass) {
      calendar.classList.remove('date-picker--show');
    }
    document.body.removeEventListener('click', this.unshowCalendar);
  };

  showArrivalMonthCalendar = () => {
    console.log('showArrivalMonthCalendar');
    this.showCalendar();
    this.onInputDateArrival();
    if (this.arrivalDate) {
      this.updateCurrentDate(this.arrivalDate);
    }
  };

  showDepartureMonthCalendar = () => {
    console.log('showDepartureMonthCalendar');
    this.showCalendar();
    this.onInputDateDeparture();
    if (this.departureDate) {
      this.updateCurrentDate(this.departureDate);
    }
  };

  showErrorAnimation = () => {
    const datePicker = this.parentNode.querySelector('.date-picker');
    datePicker.classList.add('date-picker--error-animation');
    setTimeout(() => {
      datePicker.classList.remove('date-picker--error-animation');
    }, 700);
  };

  paintingSelectCell = () => {
    const cells = this.parentNode.querySelectorAll('td');
    if (this.arrivalDate && this.departureDate) {
      const arrivalAriaDate = this.getAriaDateByDate(this.arrivalDate);
      const departureAriaDate = this.getAriaDateByDate(this.departureDate);
      const isDoubleSelect = arrivalAriaDate === departureAriaDate;

      cells.forEach(cell => {
        const isCellStart = arrivalAriaDate === cell.getAttribute('aria-date');
        const isCellEnd = departureAriaDate === cell.getAttribute('aria-date');
        const cellDate = new Date(cell.getAttribute('aria-date'));

        if (isCellEnd && !isDoubleSelect) {
          cell.classList.add('date-picker__day--select-end');
          cell.classList.add('date-picker__day--select');
        }

        const isCellDateMoreThanArrivalDate = this.compaireDate(cellDate, this.arrivalDate) > 0;
        const isCellDateLessThanDepartureDate = this.compaireDate(cellDate, this.departureDate) < 0;
        const isCellDateInRange = isCellDateMoreThanArrivalDate && isCellDateLessThanDepartureDate;

        if (isCellDateInRange) {
          cell.classList.add('date-picker__day--select-space');
        }

        if (isCellStart && departureAriaDate && !isDoubleSelect) {
          cell.classList.add('date-picker__day--select-start');
          cell.classList.add('date-picker__day--select');
        } else if (isCellStart) {
          cell.classList.add('date-picker__day--select');
        }
      });
    } else if (this.arrivalDate) {
      const arrivalAriaDate = this.getAriaDateByDate(this.arrivalDate);

      cells.forEach(cell => {
        const isCellStart = arrivalAriaDate === cell.getAttribute('aria-date');
        if (isCellStart) {
          cell.classList.add('date-picker__day--select');
        }
      });
    }
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

  onFocusArrivalInput = () => {
    const inputDate = this.arrivalInput.value;
    const isInputDateFull = this.hasDataFull(inputDate);
    if (isInputDateFull) {
      this.showArrivalMonthCalendar();
    } else {
      this.showCalendar();
    }
  };

  onFocusDepartureInput = () => {
    const inputDate = this.departureInput.value;
    const isInputDateFull = this.hasDataFull(inputDate);
    if (isInputDateFull) {
      this.showDepartureMonthCalendar();
    } else {
      this.showCalendar();
    }
  };

  onInputDateArrival = () => {
    const pickDate = this.arrivalInput.value;
    const isDataFull = this.hasDataFull(pickDate);
    if (isDataFull) {
      const convertePickDate = this.getConverteDateByUserInput(pickDate);
      const ariaDate = this.getAriaDateByDate(convertePickDate);
      const pickCell = this.getCellByAriaDate(ariaDate);
      let isArrivalDateMore = false;
      if (this.departureDate) {
        isArrivalDateMore = this.compaireDate(convertePickDate, this.departureDate) > 0;
      }
      if (pickCell) {
        let isArrivalCell = false;

        if (this.arrivalDate) {
          isArrivalCell = convertePickDate.toDateString() === this.arrivalDate.toDateString();
        }

        if (!isArrivalCell) {
          let isArrDateLessDepDate = false;

          if (this.departureDate) {
            isArrDateLessDepDate = this.compaireDate(convertePickDate, this.departureDate) < 0;
          }

          if (isArrDateLessDepDate) {
            this.clearSelectCell();
            this.onStartSelectRangeDate(pickCell, convertePickDate);
            this.paintingSelectCell();
          } else if (isArrivalDateMore) {
            this.clearSelectCell();
            this.onClearSelectRangeDate();
            this.departureInput.value = '';
          } else if (this.isEndSelect || this.isStartSelect) {
            this.clearSelectCell();
            this.onClearSelectRangeDate();
          }
        }
      } else if (isArrivalDateMore) {
        this.clearSelectCell();
        this.onClearSelectRangeDate();
        this.departureInput.value = '';
      }

      this.onStartSelectRangeDate(pickCell, convertePickDate);
    }
  };

  onInputDateDeparture = () => {
    const inputArrivalDate = this.arrivalInput.value;
    const isArrivalDateFull = this.hasDataFull(inputArrivalDate);
    const pickDate = this.departureInput.value;
    const isPickDateFull = this.hasDataFull(pickDate);
    if (!isArrivalDateFull && isPickDateFull) {
      this.showErrorAnimation();
      this.arrivalInput.focus();
    } else {
      if (!isPickDateFull) {
        this.showErrorAnimation();
        this.departureInput.focus();
      }
      if (isArrivalDateFull) {
        this.onInputDateArrival();
      }

      if (isPickDateFull) {
        const convertePickDate = this.getConverteDateByUserInput(pickDate);
        const ariaDate = this.getAriaDateByDate(convertePickDate);
        const pickCell = this.getCellByAriaDate(ariaDate);
        if (pickCell) {
          const isDateSelectLess = this.compaireDate(convertePickDate, this.arrivalDate) < 0;
          if (isDateSelectLess) {
            this.showErrorAnimation();
            pickCell.classList.add('date-picker__day--error');
            setTimeout(() => {
              pickCell.classList.remove('date-picker__day--error');
            }, 700);
            this.departureInput.value = '';
          } else {
            const isDepartureCell = this.departureCell === pickCell;
            if (!isDepartureCell) {
              if (this.isEndSelect) {
                this.clearSelectCell();
              }

              this.onEndSelectRangeDate(pickCell, convertePickDate);
              this.paintingSelectCell();
            }
          }
        } else {
          const isDateSelectLess = this.compaireDate(convertePickDate, this.arrivalDate) < 0;
          if (isDateSelectLess) {
            this.showErrorAnimation();
            this.departureInput.value = '';
          } else {
            this.clearSelectCell();
            this.onEndSelectRangeDate(pickCell, convertePickDate);
            this.paintingSelectCell();
          }
        }
      }
    }
  };

  onStartSelectRangeDate = (cell, startDate) => {
    if (cell) {
      this.arrivalCell = cell;
      cell.classList.add('date-picker__day--select');
    }

    this.isStartSelect = true;
    this.isEndSelect = false;
    this.arrivalDate = startDate;
  };

  onEndSelectRangeDate = (cell, dateEnd) => {
    if (cell) {
      this.departureCell = cell;
      cell.classList.add('date-picker__day--select');
    }

    this.isStartSelect = false;
    this.isEndSelect = true;
    this.departureDate = dateEnd;
  };

  onClearSelectRangeDate = () => {
    this.arrivalDate = null;
    this.departureDate = null;
    this.arrivalCell = null;
    this.departureCell = null;
    this.isStartSelect = false;
    this.isEndSelect = false;
  };

  onFullClearCalendar = () => {
    this.onClearSelectRangeDate();
    this.clearSelectCell();
    this.arrivalInput.value = '';
    this.departureInput.value = '';
    this.updateCurrentDate(new Date());
  };

  onSelectDate = evt => {
    evt.preventDefault();
    const isTdTag = evt.target.tagName.toLowerCase() === 'td';
    if (isTdTag) {
      if (this.isEndSelect) {
        this.clearSelectCell();
        this.onClearSelectRangeDate();
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
          this.onEndSelectRangeDate(td, selectDate);
          this.departureInput.value = selectDateText;
          this.paintingSelectCell();
        }
      } else if (isCellDoubleSelect && !this.isEndSelect) {
        this.onEndSelectRangeDate(td, selectDate);
        this.departureInput.value = selectDateText;
      } else {
        this.onStartSelectRangeDate(td, selectDate);
        this.arrivalInput.value = selectDateText;
      }
    }
  };

  getAriaDateByDate = date => {
    const ariaDay = date.getDate();
    const ariaMonth = date.getMonth();
    const ariaYear = date.getFullYear();
    const ariaDate = `${ariaYear}-${ariaMonth + 1}-${ariaDay}`;
    return ariaDate;
  };

  getConverteDateByUserInput = userDate => {
    const splitUserDate = userDate.split('.');
    const day = splitUserDate[0];
    const month = splitUserDate[1];
    const year = splitUserDate[2];
    return new Date(year, month - 1, day);
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

  getCellByAriaDate = ariaDate => {
    const cells = this.parentNode.querySelectorAll('td');
    let cell;
    cells.forEach(item => {
      const ariaDateItem = item.getAttribute('aria-date');
      if (ariaDateItem === ariaDate) cell = item;
    });
    return cell;
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
      { text: 'Очистить', isAccent: false, clickHandler: this.onFullClearCalendar },
      { text: 'Применить', isAccent: true, clickHandler: this.unshowCalendar },
    ];

    datePickerButtons.forEach(item => {
      const btn = getHtmlElement('button', 'date-picker__button', item.text);
      btn.type = 'button';

      if (item.isAccent) {
        btn.classList.add('date-picker__button--accent');
      }

      if (item.clickHandler) {
        btn.addEventListener('click', evt => {
          evt.preventDefault();
          item.clickHandler();
        });
      }

      datePickerHtmlControl.appendChild(btn);
    });

    return datePickerHtmlControl;
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
