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
        zoomTitle, zoomImage, infoContainer, avatarContainer, 
        cardContainer, nameInput, jobInput, deletePopup, avatar, profileImage } from './scipt/utills/constants.js';

import { Api } from './scipt/components/API.js';
import PopupDelete from './scipt/components/PopupDelete.js'

const zoomPicture = new PopupWithImage(zoom, zoomImage, zoomTitle);


// отрытие попапов
 function openPopup(item) {
  item.open();
} 

 // форма для редактирования профиля
 const formSubmitHandler = new UserInfo({
  profileName: document.querySelector('.profile__title'),   
  profileJob: document.querySelector('.profile__subtitle'),
  profileAvatar: document.querySelector('.profile__image')
}); 

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
const avatarValidate = new FormValidator(formSettings, avatarContainer);
avatarValidate.enableValidation();

// создаем экземпляр
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

function addCardLike(id, item) {
  api.addLike(id) 
  .then((res) => { 
   item.onLike(res.likes.length) 
  }) 
}

function deleteCardLike(id, item) {
  api.deleteLike(id)
  .then((res) => { 
  item.offLike(res.likes.length) 
  }) 
}

// добавляем карточки в темплейт из сервера
  const cardsList = new Section({ 
      renderer: (cardItem) => { 
        const card = new Card({ data: cardItem, handleCardClick: () => {
          zoomPicture.open(cardItem);
        } }, '.elements-template',
        () => {
          addCardLike(cardItem._id, card);
        },
         () => {
          deleteCardLike(cardItem._id, card);
        },
        () => {
          deleteCard.defineElement(cardItem, card);
          deleteCard.open();
        }
        );
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
      }
    }, cardListSelector);
    

// получаем карточки из сервера
  api.getInitialCards()
      .then(data => {
        cardsList.renderItems(data);
  });

 // изменяем информацию в профиле
 const editForm = new PopupWithForm({
  popupSelector: infoPopup,
  submitForm: (data) => {
    editForm.loadingButton(true);
    api.editProfile(data.name, data.about)
    .then(res => {
     // проверка отредактировались ли данные
      formSubmitHandler.setUserInfo(res);
    })
    .finally(() => {
      editForm.loadingButton(false);
    })
  }
}); 

//меняем аватар 
const avatarProfile = new PopupWithForm({
  popupSelector: avatar,
  submitForm: (data) => {
    avatarProfile.loadingButton(true);
    api.changeAvatar(data)
    .then(res => {
      formSubmitHandler.setUserAvatar(res);
    })
    .finally(() => {
      avatarProfile.loadingButton(false);
    })
  }
})

// добавляем новую карточку
const cardSubmitHandler = new PopupWithForm( {
  popupSelector: cards, 
  submitForm: (data) => {
    cardSubmitHandler.loadingButton(true)
    api.addNewCard(data.name, data.link)
    .then(res => {
      const card = new Card ({ data: res, 
        handleCardClick: () => {
        zoomPicture.open(res);
      } 
  }, '.elements-template',
  () => {
    addCardLike(res._id, card);
  },
   () => {
    deleteCardLike(res._id, card);
  },
  () => {
    deleteCard.defineElement(res, card);
    deleteCard.open();
  }
);
    const cardElement = card.generateCard();
    cardsList.createItem(cardElement);
  })
  .finally(() => {
    cardSubmitHandler.loadingButton(false);
  })
}}); 

// объявляем попап удаления карточки
const deleteCard = new PopupDelete(
  {
  popupSelector: deletePopup } ,
  (item, card) => {
    api.deleteCard(item._id)
    .then(() => {
      card.deleteCard()
    })
    .then(() => deleteCard.close())
  }
 )

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

// нажатие на кнопку редактирова аватар
profileImage.addEventListener('click', () => { 
  avatarValidate.cleanError(); openPopup(avatarProfile); 
})
