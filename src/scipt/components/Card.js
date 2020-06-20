export default class Card {
  constructor({ data,  handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

    this._setEventListeners();

    return this._element;
  }

  _likeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
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
