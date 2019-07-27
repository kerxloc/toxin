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
  getCalendarTopControl = () => {
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

    const datePickerHtmlTitle = getHtmlElement('h2', 'date-picker__title', 'Август 2019');

    datePickerHtmlControl.appendChild(datePickerHtmlSliderBtnPrev);
    datePickerHtmlControl.appendChild(datePickerHtmlTitle);
    datePickerHtmlControl.appendChild(datePickerHtmlSliderBtnNext);

    return datePickerHtmlControl;
  };

  getCalendarTable = () => {
    const calendarTable = getHtmlElement('table', 'date-picker__calendar');
    const tBody = getHtmlElement('tbody');
    const tableTrHead = getHtmlElement('tr');
    const tableHead = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    tableHead.forEach(item => {
      const th = getHtmlElement('th', 'date-picker__th', item);
      tableTrHead.appendChild(th);
    });

    tBody.appendChild(tableTrHead);

    // const nowDate = new Date();
    const currentDate = new Date(2019, 7, 1);
    // const currentDate = new Date();
    // console.log(currentDate.toDateString());
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const lastWeekDayPrevMonth = new Date(currentYear, currentMonth, 0).getDay();
    const lastDayPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    // let startMonthDay;

    // if (lastWeekDayPrevMonth === 0) {
    //   startMonthDay = lastWeekDayPrevMonth + 8;
    // } else {
    //   startMonthDay = lastWeekDayPrevMonth + 1;
    // }

    // const endMonthDay = new Date(currentYear, currentMonth + 1, 0).getDate() + startMonthDay;

    // let currentMonthDay;

    // if (currentDate.getDate() === 0) {
    // currentMonthDay = startMonthDay + 7;
    // } else {
    // currentMonthDay = currentDate.getDate() + startMonthDay;
    // }

    let numberDay;

    if (lastWeekDayPrevMonth === 0) {
      numberDay = lastDayPrevMonth - 7;
    } else {
      numberDay = lastDayPrevMonth - lastWeekDayPrevMonth;
    }

    // console.log(`currentMonthDay - ${currentMonthDay}`);
    // console.log(`endMonthDay - ${endMonthDay}`);
    // console.log(`numberDay - ${numberDay}`);

    for (let i = 0; i < 5; i++) {
      const tableTr = getHtmlElement('tr');

      for (let j = 0; j < 7; j++) {
        const viewDate = new Date(currentYear, currentMonth - 1, ++numberDay);
        const tableTd = getHtmlElement('td', 'date-picker__day', viewDate.getDate());
        tableTr.appendChild(tableTd);
      }

      tBody.appendChild(tableTr);
    }

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

  renderCalendar = (parentNode = document.body) => {
    const calendar = this.getCalendar();
    parentNode.appendChild(calendar);
  };
}

export default DatePicker;
