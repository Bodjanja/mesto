export class Popup {
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this)
        this.buttonClose = this.popupElement.querySelector('.popup__close')
    }

    open() {
        this.popupElement.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose)
    }

    close() {
        this.popupElement.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscClose)
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close(this.popupElement)
          }
    }

    setEventListeners() {
        this.buttonClose.addEventListener('click', () => {
            this.close()
        })

        this.popupElement.addEventListener('mousedown', (event) => {
            if (event.target === event.currentTarget) {
                this.close()
            }
    })
    }
}
