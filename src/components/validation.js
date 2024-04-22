// @todo: Экспортируемые функции
export {enableValidation, clearValidation};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((form) => {
    setEventListeners(form, validationConfig);
  });
}; 

function setEventListeners (form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const submitButton = form.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, submitButton, validationConfig);
  inputList.forEach((input) => {
    input.addEventListener('input', (evt) => {
      isValid(form, input, validationConfig);
      toggleButtonState(inputList, submitButton, validationConfig);
    });
  });
};

function isValid(form, input, validationConfig) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  };

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, validationConfig);
  } else {
    hideInputError(form, input, validationConfig);
  }
}

function showInputError(form, input, errorMessage, validationConfig) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(form, input, validationConfig) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
}

function toggleButtonState (inputList, button, validationConfig) {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(validationConfig.inactiveButtonClass);
  }
}; 

function hasInvalidInput (inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
};

// очистка ошибок валидации вызовом clearValidation

function clearValidation(profileForm, validationConfig) {
  const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
  const submitButton = profileForm.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, submitButton, validationConfig);
  inputList.forEach((input) => {
    hideInputError(profileForm, input, validationConfig)
  });
}; 