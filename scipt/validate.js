const showInputError = (item, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    if (errorMessage) {
        inputElement.classList.add('popup__input_type_error'); //красная рамка
        errorElement.classList.add(item.errorClass);
    } else {
        errorElement.textContent = '';
        inputElement.classList.remove('popup__input_type_error');
        errorElement.classList.remove(item.errorClass);
  }
};
  
    // функция проверки валидности формы //
  const checkInputValidity = (item, formElement, inputElement) => {
    showInputError(item, formElement, inputElement, inputElement.validationMessage);
  };  


  //  функция принимает массив полей
const hasInvalidInput = (inputLists) => {
  // проходим по массиву
  return inputLists.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    return !inputElement.validity.valid;
    })
};

//кнопка 
const toggleButtonState = (item, inputLists , buttonElement) => {
    buttonElement.classList.toggle(item.inactiveButtonClass, hasInvalidInput(inputLists)); 
    buttonElement.disabled = hasInvalidInput(inputLists); 
};
   
  // создаем обработчик событий для всех форм //
const setEventListeners = (item, formElement) => {
  // нужно сделать массив из всех инпутов
  const inputLists = Array.from(formElement.querySelectorAll(item.inputSelector));
  const buttonElement = formElement.querySelector(item.submitButtonSelector);
  toggleButtonState(item, inputLists, buttonElement);
    // обойти все элементы
    inputLists.forEach((inputElement) => { 
        inputElement.addEventListener('input', () => { 
        checkInputValidity(item, formElement, inputElement); 
        toggleButtonState(item, inputLists, buttonElement); 
      }); 
    }); 
    }; 

  // функция для обработки
  // функция для обработки 
  const enableValidation = (item) => { 
    const formLists = Array.from(document.querySelectorAll(item.formSelector)); 
      formLists.forEach((formElement) => { 
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