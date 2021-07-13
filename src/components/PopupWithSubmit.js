import {Popup} from "./Popup.js";

export class PopupWithSubmit extends Popup{
    constructor(popupSelector){
        super(popupSelector)
        this._form = document.querySelector('.popup__form_confirmation')
    }

    setupSubmitAction(callback){
        this._submitHandler = callback
    }

    setEventListeners(){
        super.setEventListeners()
        this._form.addEventListener('submit', (evt)=>{
            evt.preventDefault()
            this._submitHandler()
        })
    }
}