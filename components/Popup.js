import {closeProfilePopup, closeAdditionPopup, closePhotoPopup} from '../utils/constants.js'

export class Popup {
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector)
    }

    open() {
        this.popupElement.classList.add('popup_opened')
        document.addEventListener('keydown', (evt)=>{this._handleEscClose(evt)})
    }

    close() {
        this.popupElement.classList.remove('popup_opened')
        document.removeEventListener('keydown', (evt)=>{this._handleEscClose(evt)})
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close(this.popupElement)
          }
    }

    setEventListeners() {
        closeProfilePopup.addEventListener('click', () => {
            this.close()
        })

        closeAdditionPopup.addEventListener('click', () => {
            this.close()
        })

        closePhotoPopup.addEventListener('click', () => {
            this.close()
        })
    }
}
