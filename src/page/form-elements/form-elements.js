import '../../style/index.scss';
import './form-elements.scss';
import Inputmask from 'inputmask';
import DropDown from '../../components/drop-down/drop-down';
import '../../components/range-slider/range-slider';

Inputmask({mask: '99.99.9999', placeholder: 'ДД.ММ.ГГГГ'}).mask('#maskedTextField');
Inputmask({mask: '99.99.9999', placeholder: 'ДД.ММ.ГГГГ'}).mask('#arrival-input');
Inputmask({mask: '99.99.9999', placeholder: '19.08.2019'}).mask('#departure-input');

const dropDownContainer = document.querySelector('#drop-down-container');
const inputDropDown = document.querySelector('#number-guests-input2');

const dropDownOptions = {
  container: dropDownContainer,
  input: inputDropDown,
  countElements: [
    {name: 'Спальни', countGroupName: 'bedrooms', startValue: 2},
    {name: 'Кровати', countGroupName: 'bed', startValue: 2},
    {name: 'Ванные комнаты', countGroupName: 'bath', startValue: 0},
  ],
  countGroupView: {
    bedrooms: {counter: 2, views: ['спальня', 'спальни', 'спален']},
    bed: {counter: 2, views: ['кровать', 'кровати', 'кроватей']},
    bath: {
      counter: 0,
      views: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
    },
  },
  placeholder: 'Удобства номера',
  isHideControl: true,
  isPinShow: true,
};

const dropDown = new DropDown(dropDownOptions);
dropDown.init();

const dropDownGuestContainer = document.querySelector('#drop-down-container2');
const inputDropDownGuest = document.querySelector('#number-guests-input3');

const dropDownGuestOptions = {
  container: dropDownGuestContainer,
  input: inputDropDownGuest,
  countElements: [
    {name: 'Взрослые', countGroupName: 'guest'},
    {name: 'Дети', countGroupName: 'guest'},
    {name: 'Младенцы', countGroupName: 'child'},
  ],
  countGroupView: {
    guest: {counter: 0, views: ['гость', 'гостя', 'гостей']},
    child: {counter: 0, views: ['младенец', 'младенца', 'младенцев']},
  },
  placeholder: 'Сколько гостей',
  isPinShow: true,
};

const dropDownGuest = new DropDown(dropDownGuestOptions);
dropDownGuest.init();

const dropDownQuestContainer = document.querySelector('#drop-down-container3');
const inputDropDownQuest = document.querySelector('#number-guests-input4');

const dropDownQuestOptions = {
  container: dropDownQuestContainer,
  input: inputDropDownQuest,
  countElements: [
    {name: 'Взрослые', countGroupName: 'guest', startValue: 2},
    {name: 'Дети', countGroupName: 'guest', startValue: 1},
    {name: 'Младенцы', countGroupName: 'child'},
  ],
  countGroupView: {
    guest: {counter: 3, views: ['гость', 'гостя', 'гостей']},
    child: {counter: 0, views: ['младенец', 'младенца', 'младенцев']},
  },
  placeholder: 'Сколько гостей',
  isPinShow: true,
};

const dropDownQuest = new DropDown(dropDownQuestOptions);
dropDownQuest.init();
