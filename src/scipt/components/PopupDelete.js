import Popup from './Popup.js';

export default class PopupDelete extends Popup{
    constructor({ popupSelector }, submitForm ) {
      super(popupSelector);
      this._submitForm = submitForm;
      this._submitEvent = evt => {
        evt.preventDefault();
        this._submitForm(this._card, this._cardClass);
      };
      this._popupSelector.addEventListener('submit', this._submitEvent)
    }

    defineElement(card, cardClass) {
        this._card = card;
        this._cardClass = cardClass;
    }
}