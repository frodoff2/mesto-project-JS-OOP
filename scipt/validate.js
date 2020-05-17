const showInputError = (item, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error'); //красная рамка
  //  содержимое span с ошибкой
  errorElement.textContent = errorMessage;
  // сообщение об ошибке
  errorElement.classList.add(item.errorClass);
  };
  
  // функция удаления ошибки //
const hideInputError = (item, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error'); //красная рамка
  // скрываем сообщение об ошибке
  errorElement.classList.remove(item.errorClass);
  errorElement.textContent = '';
};
  // функция проверки валидности формы //
const checkInputValidity = (item, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(item, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(item, formElement, inputElement);
  }
};
  
  //  функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по массиву
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    return !inputElement.validity.valid;
    })
};

//кнопка 
const toggleButtonState = (item, inputList , buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(item.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(item.inactiveButtonClass);
    buttonElement.disabled = false;
    }
  };
  
  // создаем обработчик событий для всех форм //
const setEventListeners = (item, formElement) => {
  // нужно сделать массив из всех инпутов
  const inputList = Array.from(formElement.querySelectorAll(item.inputSelector));
  const buttonElement = formElement.querySelector(item.submitButtonSelector);
  toggleButtonState(item, inputList, buttonElement);
    // обойти все элементы
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
      checkInputValidity(item, formElement, inputElement);
      toggleButtonState(item, inputList, buttonElement);
    });
  });
  };

  // функция для обработки
const enableValidation = (item) => {
  const formList = Array.from(document.querySelectorAll(item.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      });
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(item, formElement);
      });
  };  

enableValidation({ 
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
});

