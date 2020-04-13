let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit');

function popupOpen() {
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click' , popupOpen);

let closeButton = document.querySelector('.popup__close_icon');

function popupClose() {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', popupClose);

let formElement = document.querySelector('.popup__container');

function formSubmitHandler (evt) {
    evt.preventDefault();
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__info');

let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let saveButton = document.querySelector('.popup__button');

profileName.textContent = nameInput.value;
profileJob.textContent = jobInput.value;

saveButton.addEventListener('click', popupClose);
}

formElement.addEventListener('submit', formSubmitHandler);



