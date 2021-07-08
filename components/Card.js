import {confirmationPopup} from '../pages/index.js'
import {api} from '../pages/index.js'

export class Card { //Создаём класс карточки и абстрактные параметры
  constructor(cardName, cardLink, templateSelector, handleCardClick, likes, owner, myId, id) {
    this._templateSelector = document.querySelector(templateSelector)
    this._text = cardName
    this._image = cardLink
    this._handleCardClick = handleCardClick
    this._likes = likes
    this._owner = owner
    this._myId = myId
    this._id = id
  }
  _getTemplate() { //Клонируем разметку карточки в DOM-дереве
    const cardElement = this._templateSelector.content.querySelector('.element').cloneNode(true)
    return cardElement
  }

  generateCard() { //Наполняем карточку данными и возвращаем готовый экземпляр
    this._element = this._getTemplate()
    this._setEventListeners()
    const cardImage = this._element.querySelector('.element__image')
    const likesCounter = this._element.querySelector('.element__like-counter')
    const elementRemoveBin = this._element.querySelector('.element__bin')

    if (this._owner._id !== this._myId) { //Скрываем кнопку удаления для тех карточек, которые добавлены не нами (не совпадают id)
      elementRemoveBin.classList.add('element__bin_hidden')
    }

    this._likes.forEach(card => { //Заполнения сердечка лайка для ранее понравившихся карточек при загрузке страницы
      if (card._id.includes('6f2db9ebbf34b17236d87430')) {
        this._element.querySelector('.element__icon').classList.add('element__icon_liked')
      }
    })

    likesCounter.textContent = this._likes.length//Отображение в разметке количества лайков
    cardImage.src = this._image
    this._element.querySelector('.element__title').textContent = this._text
    cardImage.alt = this._text
    return this._element
  }

  _likeCard() { //Функция поставить "нравится" карточке
    const likeButton = this._element.querySelector('.element__icon')
    likeButton.classList.toggle('element__icon_liked')
    const likesCounter = this._element.querySelector('.element__like-counter')
//Если класс "liked" есть на кнопке likeButton, то вместе с ним вызываем api и отправляем данные на сервер, а из полученного объекта берём длину массива likes и подставляем цифру в разметку
    if (likeButton.classList.contains('element__icon_liked')) {
      api.likeCard(this._id)
        .then(result => {
          likesCounter.textContent = result.likes.length
        })
        .catch((err) => {
          console.log(err)
        }); 
    } else {
      api.dislikeCard(this._id)
        .then(result => {
          likesCounter.textContent = result.likes.length
        })
        .catch((err) => {
          console.log(err)
        }); 
    }
  }

  _removeElement(evt) { //Функция удаления карточки
    evt.remove()
  }

  _setEventListeners() { //Обвес элементов слушателями
    this._element.querySelector('.element__image').addEventListener('click', this._handleCardClick) //Открытие попапа с картинкой
    this._element.querySelector('.element__icon').addEventListener('click', () => {
      this._likeCard()
    })
    this._element.querySelector('#removebutton').addEventListener('click', () => {
      confirmationPopup.open()
      document.querySelector('.popup__submit-button_type_confirmation').addEventListener('click', () => {
        api.removeCard(this._id)
        .catch((err) => {
          console.log(err)
        }); 
        this._removeElement(this._element) //Удаление карточки при нажатии на кнопку подтверждения
        confirmationPopup.close()
      })
    })

  }
}