
export default class Popup {
  constructor( popupSelector ) {
    this._popupSelector = popupSelector;
    this._handleEscClose = (evt) => { 
      if (evt.key === 'Escape') { 
          this.close();
      }
    }
    this._closeOverlay = (evt) => {
      if (evt.target.classList.contains('popup')) { 
      this.close();  
      } 
    }
    this._setEventListeners();
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose); 
    document.addEventListener('click', this._closeOverlay);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose); 
    document.removeEventListener('click', this._closeOverlay);
    this._popupSelector.classList.remove('popup_opened'); 
  }
  
   _setEventListeners() {
   this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
    this.close();
   });
   }

}