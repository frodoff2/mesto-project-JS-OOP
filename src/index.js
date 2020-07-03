import './pages/index.css';

import Card from './scipt/components/Card.js';  
import FormValidator from './scipt/components/FormValidator.js';
import Section from './scipt/components/Section.js';
import Popup from './scipt/components/Popup.js';
import { PopupWithImage } from './scipt/components/PopupWithImage.js';
import { PopupWithForm } from './scipt/components/PopupWithForm.js';
import UserInfo from './scipt/components/UserInfo.js';
import { zoom, infoPopup, editButton, cards, 
         cardsAddButton, cardListSelector, 
        zoomTitle, zoomImage, infoContainer, 
        cardContainer, nameInput, jobInput } from './scipt/utills/constants.js';

import { Api } from './scipt/components/API.js';

const zoomPicture = new PopupWithImage(zoom, zoomImage, zoomTitle);


const initialCards = [   
  {   
      name: 'Архыз',   
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'   
  },   
  {   
      name: 'Челябинская область',   
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'   
  },   
  {   
      name: 'Иваново',   
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'   
  },   
  {   
      name: 'Камчатка',   
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'   
  },   
  {   
      name: 'Холмогорский район',   
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'   
  },   
  {   
      name: 'Байкал',   
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'   
  }   
];   

// отрытие попапов
 function openPopup(item) {
  item.open();
} 
  // обойдем массив SECTION, добавим карточки
/* const cardsList = new Section({ 
  data: initialCards, 
  renderer: (cardItem) => {    
    // экземпляр каждой карточки
    const card = new Card({ data: cardItem, handleCardClick: () => {
      zoomPicture.open(cardItem);
    }
    },
        '.elements-template');  
    // карточка и возрврат наружу 
    const cardElement = card.generateCard(); 
  // Вставим разметку на страницу,
  cardsList.addItem(cardElement);
  }
}, 
cardListSelector
); 

cardsList.renderItems();  */

 // форма для редактирования профиля
const formSubmitHandler = new UserInfo({
  profileName: document.querySelector('.profile__title'),   
  profileJob: document.querySelector('.profile__subtitle')   
}); 
 // пользователи могут изменять профиль
/* const editForm = new PopupWithForm({
  popupSelector: infoPopup,
  submitForm: (data) => {
  formSubmitHandler.setUserInfo(data);
  }
}); */

// добавление новой карточки //
/* const cardSubmitHandler = new PopupWithForm( {
  popupSelector: cards, 
  submitForm: (formData) => {
    const card = new Card ({ data: formData, handleCardClick: () => {
    zoomPicture.open(formData);
    } 
  }, '.elements-template');
    const cardElement = card.generateCard();
    cardsList.createItem(cardElement);
  }
}); */

const formSettings = { 
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// обрабатываем ошибки 
const infoValidate = new FormValidator(formSettings, infoContainer);
infoValidate.enableValidation();
const cardValidate = new FormValidator(formSettings, cardContainer);
cardValidate.enableValidation();

// нажатие на кнопку добавить карточку
cardsAddButton.addEventListener('click', () => {
  cardValidate.cleanError(); 
  openPopup(cardSubmitHandler);
 }); 

// нажатие на кнопку редактировать профиль 
editButton.addEventListener('click', () => {
  infoValidate.cleanError();
  openPopup(editForm);
  const author = formSubmitHandler.getUserInfo();
  nameInput.value = author.name;
  jobInput.value = author.about;
});  

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12/users/me',
   headers: {
      authorization: '8eaaf06a-2ca4-4be0-bedd-db145fddf3b1',
      'Content-Type': 'application/json'
   }
})

// получаем информацию о пользователи
api.getInfo().then(data =>  
  formSubmitHandler.setUserInfo(data))
  
// добавляем карточки в темплейт из сервера
  const cardsList = new Section({ 
      renderer: (item) => { 
        const card = new Card({ 
                     data: item, 
                     handleCardClick: () => {
                       zoomPicture.open(item);
                     } }, 
                     (cardObject) => {
                       if(cardObject.like) {
                         likeDeleteCard(cardObject);
                       } else {
                         likeCard(cardObject);
                       }
                       
                     },
                     '.elements-template', userId);
                     addClassCard(item, card);
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
      }
    }, cardListSelector);
    
// получаем карточки из сервера
  api.getInitialCards()
      .then(data => {
        cardsList.renderItems(data);
  });


        // экземпляр каждой карточки
     /* function cardCopy(cardItem) {
       const card = new Card({ data: cardItem, handleCardClick: () => {
          zoomPicture.open(cardItem);
        } }, '.elements-template');
        const cardElement = card.generateCard();
        return cardElement
      } */


 // изменяем информацию в профиле
 const editForm = new PopupWithForm({
  popupSelector: infoPopup,
  submitForm: (data) => {
    api.editProfile(data.name, data.about)
    .then(res => {
     // проверка отредактировались ли данные
      formSubmitHandler.setUserInfo(res);
    })
  }
}); 

// добавляем новую карточку
const cardSubmitHandler = new PopupWithForm( {
  popupSelector: cards, 
  submitForm: (data) => {
    api.addNewCard(data.name, data.link)
    .then(res => {
      const card = new Card ({ data: data, 
        handleCardClick: () => {
        zoomPicture.open(res);
      } 
  }, '.elements-template');
    const cardElement = card.generateCard();
    cardsList.createItem(cardElement);
  })
}}); 

const likeCard = function(card) {
api.addLike(card.id)
.then(res => {
  itemsCard.find((item) => (item.id === result.id)).class.returnLikes(result.likes.length);
});
}

let itemsCard = [];
const addClassCard = function(item, card) {
  itemsCard.unshift({
    id: item._id,
    class: card
  })
}