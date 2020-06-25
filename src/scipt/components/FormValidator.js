export default class FormValidator{
    constructor(data, formElement) {
      this._inputSelector = data.inputSelector;
      this._submitButtonSelector = data.submitButtonSelector;
      this._inactiveButtonClass = data.inactiveButtonClass;
      this._inputErrorClass = data.inputErrorClass;
      this._errorClass = data.errorClass;
      this._formElement = formElement;
    }
  
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    if (errorMessage) {
        inputElement.classList.add(this._inputErrorClass); //красная рамка
        errorElement.classList.add(this._errorClass);
    } else {
        errorElement.textContent = '';
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
  }
  };
  
  // функция проверки валидности формы //
  _checkInputValidity(inputElement) {
      this._showInputError(inputElement, inputElement.validationMessage);
    };  
  
  
    //  функция принимает массив полей
  _hasInvalidInput(inputLists) {
    // проходим по массиву
    return inputLists.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      return !inputElement.validity.valid;
      })
  };
  
  //кнопка 
  _toggleButtonState(inputLists , buttonElement) {
      buttonElement.classList.toggle(this._inactiveButtonClass, this._hasInvalidInput(inputLists)); 
      buttonElement.disabled = this._hasInvalidInput(inputLists); 
   };

    // создаем обработчик событий для всех форм //
  _setEventListeners() {
    // нужно сделать массив из всех инпутов
    const inputLists = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputLists, buttonElement);
      // обойти все элементы
      inputLists.forEach((inputElement) => { 
          inputElement.addEventListener('input', () => { 
          this._checkInputValidity(inputElement); 
          this._toggleButtonState(inputLists, buttonElement); 
        }); 
      }); 
      }
    // обработаем ошибки //
    enableValidation() { 
        // Для формы вызовем функцию setEventListeners, 
        // передав ей элемент формы 
        this._setEventListeners(this._formElement);
      }
    cleanError() {
      const inputLists = Array.from(document.querySelectorAll(this._inputSelector)); 
      const spanItems = Array.from(document.querySelectorAll('.popup__input-error')); 
      const buttonCard = document.getElementById('button-card');
      const buttonInfo = document.getElementById('button-info');

      inputLists.forEach((element) => { 
        element.classList.remove('popup__input_type_error'); 
        }); 
        spanItems.forEach((elem) => { 
          elem.classList.remove('popup__input-error_active'); 
          elem.textContent = '';  
        }); 
      buttonCard.setAttribute('disabled', true);  
      buttonCard.classList.add(this._inactiveButtonClass);  
      buttonInfo.disabled = false;   
      buttonInfo.classList.remove(this._inactiveButtonClass); 
      }; 
    } 