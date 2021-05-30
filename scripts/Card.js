import {openPopup, popupPhotoSrc, popupText, photoPopup} from './index.js'
export class Card { //Создаём класс карточки и абстрактные параметры
  constructor(cardName, cardLink, templateSelector) {
    this._templateSelector = document.querySelector(templateSelector)
    this._text = cardName
    this._image = cardLink
  }
  _getTemplate() { //Клонируем разметку карточки в DOM-дереве
    const cardElement = this._templateSelector.content.querySelector('.element').cloneNode(true)
    return cardElement
  }

  generateCard() { //Наполняем карточку данными и возвращаем готовый экземпляр
    this._element = this._getTemplate()
    this._setEventListeners()
    const cardImage = this._element.querySelector('.element__image')

    cardImage.src = this._image
    this._element.querySelector('.element__title').textContent = this._text
    cardImage.alt = this._text
    return this._element
  }
  //Функция открытия попапа с большим разрешением картинок
  _handleFullSizeImg(evt) {
    const textDom = evt.target.parentElement
    const textSource = textDom.querySelector('.element__title')

    popupPhotoSrc.src = evt.target.currentSrc
    popupPhotoSrc.alt = textSource.textContent
    popupText.textContent = textSource.textContent
    openPopup(photoPopup)
  }

  _likeCard() { //Функция поставить "нравится" карточке
    const likeButton = this._element.querySelector('.element__icon')
    likeButton.classList.toggle('element__icon_liked')
  }

  _removeElement(evt) { //Функция удаления карточки
    evt.target.closest('.element').remove()
  }

  _setEventListeners() { //Обвес элементов слушателями
    this._element.querySelector('.element__image').addEventListener('click', this._handleFullSizeImg) //Открытие попапа с картинкой
    this._element.querySelector('.element__icon').addEventListener('click', () => {
      this._likeCard()
    })
    this._element.querySelector('#removebutton').addEventListener('click', this._removeElement)
  }
}