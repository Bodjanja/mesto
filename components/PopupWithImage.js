import {Popup} from "./Popup.js";
import {popupPhotoSrc, popupText} from '../utils/constants.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }
    open({name, link}) {
        super.open()

        popupPhotoSrc.src = link
        popupPhotoSrc.alt = name
        popupText.textContent = name
    }
}