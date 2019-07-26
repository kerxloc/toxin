/* eslint-disable global-require */
import './styles/main.scss';
import DatePicker from './components/date-picker/date-picker';

if (process.env.NODE_ENV !== 'production') {
  require('./index.pug');
  require('./pages/about.pug');
}

const datePickerContainer = document.querySelector('#date-picker-container');
const datePicker = new DatePicker();
datePicker.renderCalendar(datePickerContainer);
