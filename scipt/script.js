const popup = document.getElementById('info');  
const editButton = document.querySelector('.profile__edit');  
const closeButton = document.querySelector('.popup__close');  
const formElements = document.forms.form; // контейнер формы  
const nameInput = document.getElementById('popup__name');  
const jobInput = document.getElementById('popup__info');  
const profileName = document.querySelector('.profile__title');  
const profileJob = document.querySelector('.profile__subtitle');  
const elementsTemplate = document.querySelector('#elements-template').content;  
const formButton = document.querySelector('.popup__button_active');

const cards = document.getElementById('locations');  
const elements = document.querySelector('.elements');  
const cardsAddButton = document.querySelector('.profile__add-button');  
const cardsClose = document.querySelector('.popup__close_picture');  
const formCards = document.getElementById('form-cards'); // контейенер формы  
const titleInput = document.getElementById('cards__name');  
const imageInput = document.getElementById('cards__info');  
const nameSpan = document.getElementById('cards__name-error');
const infoSpan = document.getElementById('cards__info-error');

const zoom = document.getElementById('zoom');  
const zoomImage = document.querySelector('.popup__image');  
const zoomTitle = document.querySelector('.popup__caption');  
const zoomCloseBtn = document.querySelector('.popup__close-zoom');  

const inputItems = Array.from(document.querySelectorAll('.popup__input'));
const spanItems = Array.from(document.querySelectorAll('.popup__input-error'));
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
function closeOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};
// закрытие на esc 
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  };
}
// очищаем ошибки
function cleanError() {
  inputItems.forEach((element) => {
    element.classList.remove('popup__input_type_error');
  });
  spanItems.forEach((elem) => {
    elem.classList.remove('popup__input-error_active');
    elem.textContent = ''; 

  });
  buttonItems.forEach((item) => {
    item.setAttribute('disabled', true);
    item.classList.add('popup__button_inactive');
  });
};

// функция закрытия и открытия всех форм
function openPopup(form) { 
  form.classList.add('popup_opened'); 
  cleanError();
  formButton.disabled = false;
  formButton.classList.remove('popup__button_inactive');
  document.addEventListener('keydown', keyHandler);
}  
function closePopup(form) { 
  form.classList.remove('popup_opened'); 
  document.removeEventListener('keydown', keyHandler);
}  
 
function createCards(name, link) {  
  const elementsCards =  elementsTemplate.cloneNode(true);  
  elementsCards.querySelector('.element__title').textContent = name; 
  elementsCards.querySelector('.element__image').alt = name;  
  elementsCards.querySelector('.element__image').src = link;  
  // ставить лайки //  
  elementsCards.querySelector('.element__like').addEventListener('click', function (evt) {  
    evt.target.classList.toggle('element__like_active');  
  });  
  // удалять карточки //  
  elementsCards.querySelector('.element__trash').addEventListener('click', function (evt) {  
    evt.target.closest('.element').remove();  
  });  
  // зум
  elementsCards.querySelector('.element__image').addEventListener('click', function (evt) {  
    openPopup(zoom);  
    zoomImage.src = evt.target.src;  
    zoomImage.alt = name; 
    zoomTitle.textContent = name;  
  });  
  return elementsCards;  
}  

function prependCards(name, link) {
  elements.prepend(createCards(name, link));
}

// карточки из массива //   
function massiveCards() {
  initialCards.forEach(({name, link}) => {   
  prependCards(name, link);   
});
}
massiveCards();

// добавления новых карточек //  
function cardSubmitHandler (evt) {  
  evt.preventDefault(); 
  const name = titleInput.value;
  const link = imageInput.value;
  prependCards(name, link);  
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

editButton.addEventListener('click' , editForm);  
popup.addEventListener('click', closeOverlay);
cards.addEventListener('click', closeOverlay);
zoom.addEventListener('click', closeOverlay);

closeButton.addEventListener('click', () => closePopup(popup));  
formElements.addEventListener('submit', formSubmitHandler);  

formCards.addEventListener('submit', cardSubmitHandler);  
zoomCloseBtn.addEventListener('click', () => closePopup(zoom));  
cardsAddButton.addEventListener('click', () => {
  openPopup(cards);
  nameSpan.textContent = titleInput.validationMessage;
  nameSpan.classList.toggle('popup__input-error_active');
  infoSpan.textContent = imageInput.validationMessage;
  infoSpan.classList.toggle('popup__input-error_active');
});
cardsClose.addEventListener('click', () => closePopup(cards));
