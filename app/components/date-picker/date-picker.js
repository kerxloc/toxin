const monthMap = {
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
    } else {
      console.error('Expected arrivalInputId inside constructor object but not received');
    }

    if (domInfo.departureInputId) {
      this.departureInput = document.querySelector(`#${domInfo.departureInputId}`);
    } else {
      console.error('Expected departureInputId inside constructor object but not received');
    }

    this.currentDate = new Date();
    this.arrivalDate = null;
    this.departureDate = null;
    this.isStartSelect = false;
  }

  hasCurrentMonth = date => {
    return date.getMonth() === this.currentDate.getMonth();
  };

  hasNowDate = date => {
    const compaireDay = date.getDate();
    const compaireMonth = date.getMonth();
    const compaireYear = date.getFullYear();

    const nowDate = new Date();
    const nowDay = nowDate.getDate();
    const nowMonth = nowDate.getMonth();
    const nowYear = nowDate.getFullYear();

    return compaireDay === nowDay && compaireMonth === nowMonth && compaireYear === nowYear;
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
      const day = this.currentDate.getDay();
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
      const day = this.currentDate.getDay();
      const prevMonthDate = new Date(year, month + 1, day);
      this.updateCurrentDate(prevMonthDate);
    });

    const monthName = monthMap[this.currentDate.getMonth()];
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

        if (!this.hasCurrentMonth(viewDate)) {
          tableTd.classList.add('date-picker__day--not-current');
        }

        if (this.hasNowDate(viewDate)) {
          tableTd.classList.add('date-picker__day--current');
        }

        const viewMonthAtr = viewDate.getMonth() + 1;
        const viewDateAtr = `${viewDate.getFullYear()}-${viewMonthAtr}-${viewDate.getDate()}`;

        tableTd.setAttribute('aria-date', viewDateAtr);

        // date-picker__day--select
        // date-picker__day--select-start
        // date-picker__day--select-end
        // date-picker__day--select-space

        tableTr.appendChild(tableTd);
      }

      tableFragment.appendChild(tableTr);
    }

    return tableFragment;
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

    tBody.addEventListener('click', evt => {
      evt.preventDefault();
      const td = evt.target;
      const selectDate = new Date(td.getAttribute('aria-date'));
      const selectDay = getTwoDigitNumberString(selectDate.getDate());
      const selectMonth = getTwoDigitNumberString(selectDate.getMonth() + 1);
      const selectYear = selectDate.getFullYear();

      const selectDateText = `${selectDay}.${selectMonth}.${selectYear}`;
      this.arrivalInput.value = selectDateText;
      console.log(this.departureInput);
    });

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
  };

  updateCalendar = () => {
    this.updateCalendarTitle();
    this.updateCalendarTable();
  };

  updateCalendarTitle = () => {
    const title = document.querySelector('#date-picker-main-title');
    const monthName = monthMap[this.currentDate.getMonth()];
    const yearName = this.currentDate.getFullYear();
    title.textContent = `${monthName} ${yearName}`;
  };

  updateCalendarTable = () => {
    const calendarTable = this.parentNode.querySelector('table');
    const calendarTableBody = calendarTable.querySelector('tbody');
    calendarTable.removeChild(calendarTableBody);
    const tBody = getHtmlElement('tbody');
    const tableDate = this.getCalendarTableDate();
    tBody.appendChild(tableDate);
    calendarTable.appendChild(tBody);
  };

  renderCalendar = () => {
    const calendar = this.getCalendar();
    this.parentNode.appendChild(calendar);
  };
}

export default DatePicker;
