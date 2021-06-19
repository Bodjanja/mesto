// Импорт содержания модулей
import './index.css'

import {openProfilePopup, openAdditionPopup} from '../utils/utils.js'
import {Card} from '../components/Card.js'
import {initialCards} from '../scripts/initial-cards.js'
import {FormValidator} from '../scripts/FormValidator.js'
import {Section} from '../components/Section.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import { PopupWithImage } from '../components/PopupWithImage.js'

import {additionPopup, profilePopup, photoPopup, openPopUpButton, photoCloseButton, additionPopupOpenButton, handleCardClick} from '../utils/constants.js'

//Конфиг с элементами формы для валидации
const config = {
  formSelector: '.form',
  inputSelector: '.form__input-info',
  inputSubmitButton: '.popup__submit-button',
  inputErrorClass: 'form__input-info_error',
  errorActiveClass: 'form__input-info-error_active',
  spanErrorClass: '.form__input-info-error'
}

//Добавление карточек из массива
const cardsSection = new Section(
  {items: initialCards,
  renderer: (name, link)=>{
  const card = new Card(name, link, '#template-element', handleCardClick)
  const cardElement = card.generateCard()
  return cardElement
  }}, '.elements__list')

cardsSection.renderAll()

export {additionCardPopup}
const additionCardPopup = new PopupWithForm('.popup_type_addition',
(cardData)=>{cardsSection.addItem(cardData)
  additionCardPopup.close()//закрытие попапа
})
additionCardPopup.setEventListeners()

export const editionProfilePopup = new PopupWithForm('.popup_type_profile',
(profileData)=>{
  const dataTransfer = new UserInfo('.profile__title', '.profile__subtitle')
  dataTransfer.setUserInfo(profileData)
  editionProfilePopup.close()
})
editionProfilePopup.setEventListeners()

const widePopup = new PopupWithImage('.popup_type_photo')//Объявление класса с широкой картинкой

//Валидация форм
export const profileEditionForm = new FormValidator(config, document.querySelector('form[name="edition-form"]'))//Валидация профиля
profileEditionForm.enableValidation()
export const cardAdditionForm = new FormValidator(config, document.querySelector('form[name="addition-form"]'))//Валидация попапа добавления карточек
cardAdditionForm.enableValidation()

// -----------------------------------------------------------------------------------------------------
//Условия выполнения функций

// Открытие попапа
openPopUpButton.addEventListener('click', openProfilePopup) //Редактирование профиля

additionPopupOpenButton.addEventListener('click', openAdditionPopup) //Добавление картинок

photoCloseButton.addEventListener('click', () => {
  widePopup.close()
}) //Закрытие просмотра картинок в большом размере

//Закрытие попапа редактирования профиля, если осуществлён клик по внешней области
profilePopup.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget) {
    editionProfilePopup.close()
  }
})

//Закрытие попапа добавления места, если осуществлён клик по внешней области
additionPopup.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget) {
    additionCardPopup.close()
  }
})

//Закрытие попапа широких картинок, если осуществлён клик по внешней области
photoPopup.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget) {
    widePopup.close()
  }
})