import {Popup} from "./Popup.js";
import {popupPhotoSrc, popupText} from '../utils/constants.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this.popupElement = document.querySelector(popupSelector)
    }
    open(evt) {
        super.open()

        const textDom = evt.target.parentElement
        const textSource = textDom.querySelector('.element__title')

        popupPhotoSrc.src = evt.target.currentSrc
        popupPhotoSrc.alt = textSource.textContent
        popupText.textContent = textSource.textContent
    }
}