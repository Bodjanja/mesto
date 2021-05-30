export class FormValidator {
    constructor(config, formElement) {

        this._config = config
        this._formElement = formElement
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
        this._submitButton = this._formElement.querySelector(this._config.inputSubmitButton)
    }

    _setEventListeners() {

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkValidity(inputElement)
                this._checkButtonState()

            })
        })
        this._checkButtonState()
    }

    _checkValidity(inputElement) { //Проверка условий валидности
        if (inputElement.validity.valid) {
            this._hideError(inputElement)

        } else {
            this._showError(inputElement)
        }
    }

    _showError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)

        errorElement.textContent = inputElement.validationMessage
        inputElement.classList.add(this._config.inputErrorClass)
        errorElement.classList.add(this._config.errorActiveClass)
    }

    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)

        inputElement.classList.remove(this._config.inputErrorClass)
        errorElement.textContent = ''
        errorElement.classList.remove(this._config.errorActiveClass)
    }

    clearErrorsProfile() {//Функция для удаления ошибки валидации при повторном открытии попапа (если при прошлом открытии поля были некорректны)
        const errorMessages = Array.from(this._formElement.querySelectorAll(this._config.spanErrorClass))
        const inputsWithError = Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
        inputsWithError.forEach((item) => {
            item.classList.remove(this._config.inputErrorClass)
        })
        errorMessages.forEach((item) => {
            item.classList.remove(this._config.errorActiveClass)
            errorMessages.textContent = ''
        })
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            if (inputElement.validity.valid === true) {
                return false
            } else {
                return true
            }
        })
    }

    _checkButtonState() {
        if (this._hasInvalidInput(this._inputList) === true) {
            this._submitButton.disabled = true

        } else {
            this._submitButton.disabled = false
        }
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })
        this._setEventListeners()
    }
}