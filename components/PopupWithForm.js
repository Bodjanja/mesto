import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, onSubmitCb, inputsConfig) {
        super(popupSelector)
        this._onSubmitCb = onSubmitCb
        this._formElement = this.popupElement.querySelector('.form')

        this._inputsConfig = inputsConfig
    }

    close() {
        super.close()
        this._formElement.reset()
    }

    _getInputValues() {
        const result = {}
        const inputs = Array.from(this._formElement.querySelectorAll('.form__input-info'))

        inputs.forEach(input => {
            result[input.name] = input.value
        })
        return result
    }

    setEventListeners() {
        super.setEventListeners()
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault()
            const cardData = this._getInputValues()
            this._onSubmitCb(cardData)
        })
    }

}