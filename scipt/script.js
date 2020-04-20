const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit');
const closeButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let nameInput = document.getElementById('popup__name');
let jobInput = document.getElementById('popup__info');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let saveButton = document.querySelector('.popup__button');

function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClose();
}

editButton.addEventListener('click' , popupOpen);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);


