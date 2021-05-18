const showError = (formElement, inputElement, config) => {
    const {
        inputErrorClass,
        errorActiveClass
    } = config
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)

    errorElement.textContent = inputElement.validationMessage
    inputElement.classList.add(inputErrorClass)
    errorElement.classList.add(errorActiveClass)
}

const hideError = (formElement, inputElement, config) => {
    const {
        inputErrorClass,
        errorActiveClass
    } = config
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)

    inputElement.classList.remove(inputErrorClass)
    errorElement.textContent = ''
    errorElement.classList.remove(errorActiveClass)
}

const checkValidity = (formElement, inputElement, config) => { //Проверка условий валидности
    // console.log(inputElement.validity)
    if (inputElement.validity.valid === true) {
        hideError(formElement, inputElement, config)

    } else {
        showError(formElement, inputElement, config)
        // console.log(inputElement.validationMessage)
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        if (inputElement.validity.valid === true) {
            return false
        } else {
            return true
        }
    })
}

const buttonState = (submitButton, inputList) => {
    if (hasInvalidInput(inputList) === true) {
        submitButton.disabled = true

    } else {
        submitButton.disabled = false
    }
}

const setEventListeners = (formElement, config) => { //Поиск всех inputs
    const {
        inputSelector,
        inputSubmitButton,
        ...restConfig
    } = config
    const inputList = Array.from(formElement.querySelectorAll(inputSelector))
    const submitButton = formElement.querySelector(inputSubmitButton)

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkValidity(formElement, inputElement, restConfig);
            buttonState(submitButton, inputList);

        })
    })
    buttonState(submitButton, inputList);
}

const enableVerification = (config) => {
    const {
        formSelector,
        ...restConfig
    } = config
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, restConfig);
    })
}