import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
  super(popupSelector);
}

  open(data) {
  const zoomImage = this._popupSelector.querySelector('.popup__image');
  const zoomTitle = this._popupSelector.querySelector('.popup__caption');

  zoomImage.src = data.link;
  zoomTitle.textContent = data.name;
  super.open();
  }
}
