 import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({ popupSelector, submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._submitEvent = evt => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    };
}

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

   _setEventListeners() {
    this._popupSelector.querySelector('.popup__container').addEventListener('submit', this._submitEvent);
    super._setEventListeners();
  } 

  close() {
    super.close();
    this._popupSelector.querySelector('.popup__container').reset();
  }
}
