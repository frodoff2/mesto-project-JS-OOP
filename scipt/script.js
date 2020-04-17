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

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

    popup.classList.add('popup_opened');
}

editButton.addEventListener('click' , popupOpen);

function popupClose() {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', popupClose);

function formSubmitHandler (evt) {
    evt.preventDefault();

profileName.textContent = nameInput.value;
profileJob.textContent = jobInput.value;

saveButton.addEventListener('click', popupClose);
}

formElement.addEventListener('submit', formSubmitHandler);



