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

class DatePicker {
  hasCurrentMonth = (date, currentDate) => {
    return date.getMonth() === currentDate.getMonth();
  };

  hasCurrentDate = (date, currentDate) => {
    const compaireDay = date.getDate();
    const compaireMonth = date.getMonth();
    const compaireYear = date.getFullYear();

    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return (
      compaireDay === currentDay && compaireMonth === currentMonth && compaireYear === currentYear
    );
  };

  getCalendarTopControl = currentDate => {
    const datePickerHtmlControl = getHtmlElement('div', 'date-picker__control');
    const datePickerHtmlSliderBtnPrev = getHtmlElement(
      'button',
      'date-picker__slider-btn',
      'Назад',
    );
    datePickerHtmlSliderBtnPrev.classList.add('date-picker__slider-btn--prev');
    datePickerHtmlSliderBtnPrev.type = 'button';

    const datePickerHtmlSliderBtnNext = getHtmlElement(
      'button',
      'date-picker__slider-btn',
      'Вперед',
    );
    datePickerHtmlSliderBtnNext.classList.add('date-picker__slider-btn--next');
    datePickerHtmlSliderBtnNext.type = 'button';

    const datePickerHtmlTitle = getHtmlElement(
      'h2',
      'date-picker__title',
      `${monthMap[currentDate.getMonth()]} ${currentDate.getFullYear()}`,
    );

    datePickerHtmlControl.appendChild(datePickerHtmlSliderBtnPrev);
    datePickerHtmlControl.appendChild(datePickerHtmlTitle);
    datePickerHtmlControl.appendChild(datePickerHtmlSliderBtnNext);

    return datePickerHtmlControl;
  };

  getCalendarTableDate = currentDate => {
    const tableFragment = document.createDocumentFragment();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const lastWeekDayPrevMonth = new Date(currentYear, currentMonth, 0).getDay();
    const lastDayPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    let numberDay;

    if (lastWeekDayPrevMonth === 0) {
      numberDay = lastDayPrevMonth - 7;
    } else {
      numberDay = lastDayPrevMonth - lastWeekDayPrevMonth;
    }

    for (let i = 0; i < 5; i++) {
      const tableTr = getHtmlElement('tr');

      for (let j = 0; j < 7; j++) {
        const viewDate = new Date(currentYear, currentMonth - 1, ++numberDay);
        const tableTd = getHtmlElement('td', 'date-picker__day', viewDate.getDate());

        if (!this.hasCurrentMonth(viewDate, currentDate)) {
          tableTd.classList.add('date-picker__day--not-current');
        }

        if (this.hasCurrentDate(viewDate, currentDate)) {
          tableTd.classList.add('date-picker__day--current');
        }

        // const isTdSelected = viewDate.getDate() === 19 || viewDate.getDate() === 23;

        // if (isTdSelected) {
        //   tableTd.classList.add('date-picker__day--select');
        // }

        // if (viewDate.getDate() === 19) {
        //   tableTd.classList.add('date-picker__day--select-start');
        // }

        // if (viewDate.getDate() === 23) {
        //   tableTd.classList.add('date-picker__day--select-end');
        // }

        // const isTdSpaceSelected = viewDate.getDate() >= 20 && viewDate.getDate() <= 22;

        // if (isTdSpaceSelected) {
        //   tableTd.classList.add('date-picker__day--select-space');
        // }

        tableTr.appendChild(tableTd);
      }

      tableFragment.appendChild(tableTr);
    }

    return tableFragment;
  };

  getCalendarTable = currentDate => {
    const calendarTable = getHtmlElement('table', 'date-picker__calendar');
    const tBody = getHtmlElement('tbody');
    const tableTrHead = getHtmlElement('tr');
    const tableHead = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    tableHead.forEach(item => {
      const th = getHtmlElement('th', 'date-picker__th', item);
      tableTrHead.appendChild(th);
    });

    tBody.appendChild(tableTrHead);
    const tableDate = this.getCalendarTableDate(currentDate);
    tBody.appendChild(tableDate);
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

  getCalendar = (currentDate = new Date()) => {
    const datePickerHtmlSection = getHtmlElement('section', 'date-picker');
    const datePickerHtmlWrap = getHtmlElement('div', 'date-picker__wrap');
    const datePickerHtmlControl = this.getCalendarTopControl(currentDate);
    const datePickerHtmlTable = this.getCalendarTable(currentDate);
    const datePickerHtmlBotControl = this.getCalendarBotControl();
    datePickerHtmlWrap.appendChild(datePickerHtmlControl);
    datePickerHtmlWrap.appendChild(datePickerHtmlTable);
    datePickerHtmlWrap.appendChild(datePickerHtmlBotControl);
    datePickerHtmlSection.appendChild(datePickerHtmlWrap);

    return datePickerHtmlSection;
  };

  renderCalendar = (parentNode = document.body) => {
    const currentDate = new Date(2019, 6, 1);
    const calendar = this.getCalendar(currentDate);
    parentNode.appendChild(calendar);
  };
}

export default DatePicker;
