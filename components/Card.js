export class Card { //Создаём класс карточки и абстрактные параметры
  constructor(cardName, cardLink, templateSelector, handleCardClick) {
    this._templateSelector = document.querySelector(templateSelector)
    this._text = cardName
    this._image = cardLink
    this._handleCardClick = handleCardClick
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

  _likeCard() { //Функция поставить "нравится" карточке
    const likeButton = this._element.querySelector('.element__icon')
    likeButton.classList.toggle('element__icon_liked')
  }

  _removeElement(evt) { //Функция удаления карточки
    evt.target.closest('.element').remove()
  }

  _setEventListeners() { //Обвес элементов слушателями
    this._element.querySelector('.element__image').addEventListener('click', this._handleCardClick) //Открытие попапа с картинкой
    this._element.querySelector('.element__icon').addEventListener('click', () => {
      this._likeCard()
    })
    this._element.querySelector('#removebutton').addEventListener('click', this._removeElement)
  }
}