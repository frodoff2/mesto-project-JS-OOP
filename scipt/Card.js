import {openPopup} from './index.js';  

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link= data.link;
    this._cardSelector = cardSelector;
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
    const zoom = document.getElementById('zoom');   
    const zoomImage = document.querySelector('.popup__image');   
    const zoomTitle = document.querySelector('.popup__caption');  

    this._element.querySelector('.element__image').addEventListener('click', () => {
      zoomImage.src = this._link;
      zoomTitle.textContent = this._name;
      openPopup(zoom);
    });

    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeCard();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._deleteCard();
    });
   }
  }
