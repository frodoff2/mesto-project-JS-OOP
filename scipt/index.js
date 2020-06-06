import Card from './Card.js';  
import FormValidator from './FormValidator.js';

const zoom = document.getElementById('zoom');   
const popup = document.getElementById('info');   
const editButton = document.querySelector('.profile__edit');   
const closeButton = document.querySelector('.popup__close');   
const formElements = document.forms.form; // контейнер формы   
const nameInput = document.getElementById('popup__name');   
const jobInput = document.getElementById('popup__info');   
const profileName = document.querySelector('.profile__title');   
const profileJob = document.querySelector('.profile__subtitle');   
const formButton = document.querySelector('.popup__button_active'); 
 
const cards = document.getElementById('locations');   
const cardsAddButton = document.querySelector('.profile__add-button');   
const cardsClose = document.querySelector('.popup__close_picture');   
const formCards = document.getElementById('form-cards'); // контейенер формы   
const titleInput = document.getElementById('cards__name');   
const imageInput = document.getElementById('cards__info');  
 
const buttonItems = Array.from(document.querySelectorAll('.popup__button')); 
 
 
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
  
 
// закрытие при нажатии оверлей 
export function closeOverlay(evt) { 
  if (evt.target.classList.contains('popup')) { 
    closePopup(evt.target); 
    titleInput.value = '';   
    imageInput.value = '';  
  } 
}; 
// закрытие на esc  
export function keyHandler(evt) { 
  if (evt.key === 'Escape') { 
    const popupOpen = document.querySelector('.popup_opened'); 
    closePopup(popupOpen); 
    titleInput.value = '';   
    imageInput.value = '';  
  }; 
} 
function clearError() {
  const element = {};
  const object = {inputSelector: '.popup__input'};
  const valid = new FormValidator(object, element);
  valid.cleanError();
}

// функция закрытия и открытия всех форм 
export function openPopup(form) {  
  form.classList.add('popup_opened');
  clearError();  
  document.addEventListener('keydown', keyHandler); 
}   
export function closePopup(form) {  
  form.classList.remove('popup_opened');  
  document.removeEventListener('keydown', keyHandler); 
}   
  
  // обойдем массив 
function renderCards() {
  initialCards.forEach((item) => {
  // экземпляр каждой карточки
  const card = new Card(item, '.elements-template');   
  // карточка и возрврат наружу 
  const cardElement = card.generateCard();
  // добавляем в ДОМ 
  document.querySelector('.elements').append(cardElement);
  });
};
renderCards();

// добавления новых карточек //   
function cardSubmitHandler (evt) {   
  evt.preventDefault();  
  const item = {};
  item.name = titleInput.value; 
  item.link = imageInput.value;
  const card = new Card(item, '.elements-template');   
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
  closePopup(cards);   
  titleInput.value = '';   
  imageInput.value = '';  
}   

// изменить имя и профиль //  
function formSubmitHandler (evt) {   
  evt.preventDefault();   
  profileName.textContent = nameInput.value;   
  profileJob.textContent = jobInput.value;   
  closePopup(popup);   
}   

function editForm(){  
  openPopup(popup);  
    nameInput.value = profileName.textContent;   
    jobInput.value = profileJob.textContent;   
}  

// обработаем ошибки //
  function formValidation() { 
    const formLists = Array.from(document.querySelectorAll('.popup__container')); 
    const formSettings = { 
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  };
    formLists.forEach((form) => { 
      const validator = new FormValidator(formSettings, form);
      validator.enableValidation();
});
}
formValidation();

editButton.addEventListener('click', () => {
  editForm();
  formButton.disabled = false;  
  formButton.classList.remove('popup__button_inactive');
});   
popup.addEventListener('click', closeOverlay); 
cards.addEventListener('click', closeOverlay); 
document.getElementById('zoom').addEventListener('click', closeOverlay); 

closeButton.addEventListener('click', () => closePopup(popup));   
formElements.addEventListener('submit', formSubmitHandler);   
 
formCards.addEventListener('submit', cardSubmitHandler);   
document.querySelector('.popup__close-zoom').addEventListener('click', () => closePopup(zoom));   
cardsAddButton.addEventListener('click', () => {
  openPopup(cards);
  buttonItems.forEach((item) => { 
    item.setAttribute('disabled', true); 
    item.classList.add('popup__button_inactive'); 
  });
 });
cardsClose.addEventListener('click', () => closePopup(cards)); 