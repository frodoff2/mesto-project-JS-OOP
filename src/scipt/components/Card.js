export default class Card {
  constructor({ data, handleCardClick }, cardSelector, callbackSendLike, deleteLike, deleteCard, profileInfo) { 
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
    this._profileInfo = profileInfo;
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
    this.counterLike();
    if  (this._owner._id !== '1d317d259c9989f882343364')  {
      this._element.querySelector('.element__trash').style = 'display: none';
    } 
    this._setEventListeners();

    return this._element;
  }

  // метод отвечающий за обновление, проверяет мой ли лайк
   counterLike() {
    this._element.querySelector('.element__like_count').textContent = this._counter.length;
    this._profileInfo.then(res => {
       this._counter.forEach(item => {
         if (item.name === res.name) {
           this._element.querySelector('.element__like').classList.add('element__like_active');
         }
       })
      }) 
  }

  _addLike(evt) {
    if (evt.target.classList.contains('element__like_active')) {
      evt.target.classList.remove('element__like_active')
      this._deleteLike()
      this._element.querySelector('.element__like_count').textContent = this._counter.length;
    } else {
      evt.target.classList.add('element__like_active')
      this._callbackSendLike()
      this._element.querySelector('.element__like_count').textContent = this._counter.length;
  }
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
