export default class Card {
  constructor({ data, handleCardClick }, handleLike, cardSelector, id ) { 
    this._name = data.name; 
    this._link = data.link; 
    this._id = id;
    this._author = data.owner;
    this._like = data.like;
    this._cardSelector = cardSelector; 
    this._handleCardClick = handleCardClick; 
    this._handleLike = handleLike;
    this._clickLike = () => {
      this._handleLike({
        id: this._id,
        like: this._element.querySelector('.element__like').classList.contains('element__like_active')
      })
    }
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
    if (this._like.some((user) => 
      (user._id === this._userId))) {
        this._element.querySelector('.element__like').classList.add('element__like_active');
    }
        // добавим данные
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__like-count').textContent = this._like.length;

    this._setEventListeners();

    return this._element;
  }

  returnLikes(number) {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
    this._element.querySelector('.element__like-count').textContent = number;
  }
  _deleteCard() {
    this._element.closest('.element').remove();
  }

  _setEventListeners() {
 this._element.querySelector('.element__image').addEventListener('click', () => {
   this._handleCardClick();
   });

   this._element.querySelector('.element__like').addEventListener('click', () => {
    this._likeCard();
   });

   this._element.querySelector('.element__trash').addEventListener('click', () => {
    this._deleteCard();
  });
  }
}
