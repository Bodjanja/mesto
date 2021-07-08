import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, onSubmitCb) {
        super(popupSelector)
        this._onSubmitCb = onSubmitCb
    }

    _getInputValues() {
        const result = {}
        const inputs = Array.from(this._formElement.querySelectorAll('.form__input-info'))

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
            this._onSubmitCb()
        })
    }

}