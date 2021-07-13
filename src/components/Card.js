import { PopupWithSubmit } from "./PopupWithSubmit"

export class Card { //Создаём класс карточки и абстрактные параметры
  constructor(cardName, cardLink, templateSelector, handleCardClick, likes, owner, userId, id, confirmationPopup, api) {
    this._templateSelector = document.querySelector(templateSelector)
    this._text = cardName
    this._image = cardLink
    this._handleCardClick = handleCardClick
    this._likes = likes
    this._owner = owner
    this._myId = userId
    this._id = id
    this._confirmationPopup = confirmationPopup
    this._api = api
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
      if (card._id.includes(this._myId)) {
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
    const likesCounter = this._element.querySelector('.element__like-counter')
//Если класс "liked" есть на кнопке likeButton, то вместе с ним вызываем api и отправляем данные на сервер, а из полученного объекта берём длину массива likes и подставляем цифру в разметку
    if (likeButton.classList.contains('element__icon_liked')) {
      this._api.dislikeCard(this._id)
        .then(result => {
          likeButton.classList.remove('element__icon_liked')
          likesCounter.textContent = result.likes.length
        })
        .catch((err) => {
          console.log(err)
        }); 
    } else {
      this._api.likeCard(this._id)
        .then(result => {
          likeButton.classList.add('element__icon_liked')
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
      this._confirmationPopup.open()
      this._confirmationPopup.setupSubmitAction(
        ()=>{
        this._api.removeCard(this._id)
      .then(() => {
        this._removeElement(this._element) //Удаление карточки при нажатии на кнопку подтверждения
        this._confirmationPopup.close()
      })
      .catch((err) => {
        console.log(err)
      })})
    })

  }
}