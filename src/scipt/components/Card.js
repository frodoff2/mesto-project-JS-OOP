export default class Card {
  constructor({ data, handleCardClick }, cardSelector, callbackSendLike, deleteLike, deleteCard, userId) { 
    this._name = data.name; 
    this._link = data.link; 
    this._counter = data.likes;
    this._id = data._id;
    this._cardSelector = cardSelector; 
    this._handleCardClick = handleCardClick; 
    this._callbackSendLike = callbackSendLike;
    this._deleteLike = deleteLike;
    this._owner = data.owner;
    this._deleteCard = deleteCard;
    this._userId = userId
  } 
 
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
       
    return cardElement;
    }
    
  generateCard() {
    this._element = this._getTemplate();
    // добавим данные
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__like_count').textContent = this._counter.length;

    if  (this._userId._id !== this._owner._id)  {
      this._element.querySelector('.element__trash').style = 'display: none';
    } 
    if (this._counter.some((data) => (data._id === this._userId._id))) {
      this._element.querySelector('.element__like').classList.add('element__like_active');
      }

    this._setEventListeners();

    return this._element;
  }

  _addLike(evt) {
    if (evt.target.classList.contains('element__like_active')) {
      this._deleteLike()
    } else {
      this._callbackSendLike()
  }
  } 

  onLike(count) {
  this._element.querySelector('.element__like_count').textContent = count; 
  this._element.querySelector('.element__like').classList.add('element__like_active'); 
  }

  offLike(count) { 
    this._element.querySelector('.element__like_count').textContent = count; 
    this._element.querySelector('.element__like').classList.remove('element__like_active'); 
  } 

  deleteCard() {
    this._element.remove();
    this._element.removeEventListener('click', this._cardListener)  
  }

  _handlerCard(evt) {
    if (evt.target.classList.contains('element__trash')) {
      this.deletePopup();
  } 
  }

  deletePopup(){
    this._deleteCard();
  }

  _setEventListeners() {
   this._element.querySelector('.element__image').addEventListener('click', () => {
   this._handleCardClick();
   });

   this._element.querySelector('.element__like').addEventListener('click', (evt) => {
    this._addLike(evt);
   });

   this._cardListener = this._handlerCard.bind(this);
    this._element.addEventListener('click', this._cardListener);
  }
}
