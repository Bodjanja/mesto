import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, onSubmitCb) {
        super(popupSelector)
        this._onSubmitCb = onSubmitCb
        this._formElement = this.popupElement.querySelector('.form')
        this._inputList = this._formElement.querySelectorAll('.form__input-info')
    }

    _getInputValues() {
        const result = {}
        const inputs = Array.from(this._inputList)

        inputs.forEach(input => {
            result[input.name] = input.value
        })
        return result
    }

    close(){
        super.close()
        this._formElement.reset()
    }

    setEventListeners() {
        super.setEventListeners()
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault()
            const data = this._getInputValues()
            this._onSubmitCb(data)
        })
    }

}