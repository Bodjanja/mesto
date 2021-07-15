import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector, photoSrc, text) {
        super(popupSelector)
        this._photoSrc = this.popupElement.querySelector(photoSrc)
        this._text = this.popupElement.querySelector(text)
    }
    open({name, link}) {
        super.open()

        this._photoSrc.src = link
        this._photoSrc.alt = name
        this._text.textContent = name
    }
}