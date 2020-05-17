const popup = document.getElementById('info');  
const editButton = document.querySelector('.profile__edit');  
const closeButton = document.querySelector('.popup__close');  
const formElement = document.forms.form; // контейнер формы  
const formInput = document.forms.form.elements.input;
const nameInput = document.getElementById('popup__name');  
const jobInput = document.getElementById('popup__info');  
const profileName = document.querySelector('.profile__title');  
const profileJob = document.querySelector('.profile__subtitle');  
  
const cards = document.getElementById('locations');  
const elements = document.querySelector('.elements');  
const cardsAddButton = document.querySelector('.profile__add-button');  
const cardsClose = document.querySelector('.popup__close_picture');  
const formCards = document.getElementById('form-cards'); // контейенер формы  
const titleInput = document.getElementById('cards__name');  
const imageInput = document.getElementById('cards__info');  
  
const zoom = document.getElementById('zoom');  
const zoomImage = document.querySelector('.popup__image');  
const zoomTitle = document.querySelector('.popup__caption');  
const zoomCloseBtn = document.querySelector('.popup__close-zoom');  
  
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
 
// карточки из массива //  
initialCards.forEach(function (card) {  
  elements.append(createCards(card.name, card.link));  
})  

// закрытие при нажатии оверлей
function overlayPopup(evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_opened');
  }
};
// закрытие на esc 
function keyHandler(form) {
  document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    togglePopup(form);
    }
});
}
// функция закрытия и открытия всех форм
function togglePopup(form) { 
  keyHandler(form);
  form.classList.toggle('popup_opened'); 
}  

// клонирование карточек //  
function createCards(title, image) {  
  const elementsTemplate = document.querySelector('#elements-template').content;  
  const elementsCards =  elementsTemplate.cloneNode(true);  
  elementsCards.querySelector('.element__title').textContent = title; 
  elementsCards.querySelector('.element__image').alt = title;  
  elementsCards.querySelector('.element__image').src = image;  
  // ставить лайки //  
  elementsCards.querySelector('.element__like').addEventListener('click', function (evt) {  
    evt.target.classList.toggle('element__like_active');  
  });  
  // удалять карточки //  
  elementsCards.querySelector('.element__trash').addEventListener('click', function (evt) {  
    evt.target.parentElement.classList.add('element__trash_active');  
  });  
  elementsCards.querySelector('.element__image').addEventListener('click', function (evt) {  
    togglePopup(zoom);  
    zoomImage.src = evt.target.src;  
    zoomImage.alt = title; 
    zoomTitle.textContent = title;  
  });  
  return elementsCards;  
}  
  
// добавления новых карточек //  
function cardSubmitHandler (evt) {  
  evt.preventDefault();  
  elements.prepend(createCards(titleInput.value, imageInput.value));  
  togglePopup(cards);  
  titleInput.value = '';  
  imageInput.value = '';  
}  
// изменить имя и профиль // 
function formSubmitHandler (evt) {  
  evt.preventDefault();  
  profileName.textContent = nameInput.value;  
  profileJob.textContent = jobInput.value;  
  togglePopup(popup);  
}  
 
function editForm(){ 
  togglePopup(popup); 
    nameInput.value = profileName.textContent;  
    jobInput.value = profileJob.textContent;  
  } 

editButton.addEventListener('click' , editForm);  
popup.addEventListener('click', overlayPopup);
cards.addEventListener('click', overlayPopup);
zoom.addEventListener('click', overlayPopup);

closeButton.addEventListener('click', () => togglePopup(popup));  
formElement.addEventListener('submit', formSubmitHandler);  

formCards.addEventListener('submit', cardSubmitHandler);  
zoomCloseBtn.addEventListener('click', () => togglePopup(zoom));  
cardsAddButton.addEventListener('click', () => togglePopup(cards));  
cardsClose.addEventListener('click', () => togglePopup(cards));
