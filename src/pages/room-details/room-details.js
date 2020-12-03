import '../../style/main.scss';
import './room-details.scss';
import '../../components/pie-chart/pie-chart-init';
import '../../components/main-menu/main-menu-init';
import DatePicker from '../../components/date-picker/date-picker';
import DropDown from '../../components/drop-down-counter/drop-down-counter';

const datePickerDomInfo = {
  parentNode: document.querySelector('.js-date-picker-container'),
  arrivalInput: document.querySelector('.js-arrival-input'),
  arrivalSplitBtn: document.querySelector('.js-arrival-input-split-btn'),
  departureInput: document.querySelector('.js-departure-input'),
  departureSplitBtn: document.querySelector('.js-departure-input-split-btn'),
};

const datePicker = new DatePicker(datePickerDomInfo);
datePicker.renderCalendar();

const dropDownContainer = document.querySelector('.js-drop-down-counter-container');
const inputDropDown = document.querySelector('.js-input-drop-down');

const dropDownOptions = {
  container: dropDownContainer,
  input: inputDropDown,
  countElements: [
    {name: 'Взрослые', countGroupName: 'guest'},
    {name: 'Дети', countGroupName: 'guest'},
    {name: 'Младенцы', countGroupName: 'child'},
  ],
  countGroupView: {
    guest: {counter: 0, views: ['гость', 'гостя', 'гостей']},
    child: {counter: 0, views: ['младенец', 'младенца', 'младенцев']},
  },
  placeholder: 'Cколько гостей',
};

const dropDown = new DropDown(dropDownOptions);
dropDown.init();
