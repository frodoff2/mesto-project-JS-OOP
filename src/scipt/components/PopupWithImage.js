import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, zoomImage, zoomTitle) {
  super(popupSelector);
  this._zoomImage = zoomImage;
  this._zoomTitle = zoomTitle;
}

  open(data) {
  this._zoomImage.src = data.link;
  this._zoomTitle.textContent = data.name;
  super.open();
  }
}
