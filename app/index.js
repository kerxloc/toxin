/* eslint-disable global-require */
import './styles/main.scss';
import DatePicker from './components/date-picker/date-picker';

if (process.env.NODE_ENV !== 'production') {
  require('./index.pug');
  require('./pages/about.pug');
}

const datePickerDomInfo = {
  parentNodeId: 'date-picker-container',
  arrivalInputId: 'arrival-input',
  arrivalSplitBtnId: 'arrival-split-btn',
  departureInputId: 'departure-input',
  departureSplitBtnId: 'departure-split-btn',
};

const datePicker = new DatePicker(datePickerDomInfo);
datePicker.renderCalendar();
