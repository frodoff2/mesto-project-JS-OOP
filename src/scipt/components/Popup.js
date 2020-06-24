
export default class Popup {
  constructor( popupSelector ) {
    this._popupSelector = popupSelector;
    this._handleEscClose = (evt) => { 
      if (evt.key === 'Escape') { 
          this.close();
      }
    }
    this._setEventListeners();
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose); 
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose); 
    document.removeEventListener('click', this._closeOverlay);
    this._popupSelector.classList.remove('popup_opened'); 
  }

  _closeOverlay(evt) { 
    if (evt.target.classList.contains('popup')) { 
    this.close();  
    } 
  }

   _setEventListeners() {
   document.addEventListener('click', evt => this._closeOverlay(evt)); 

   this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
    this.close();
   });
   }

}