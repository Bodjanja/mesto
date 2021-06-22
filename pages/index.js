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

import {buttonOpenPopupProfile, additionPopupOpenButton} from '../utils/constants.js'

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
  const card = new Card(name, link, '#template-element', (evt) => {
    widePopup.open(evt)
  })
  const cardElement = card.generateCard()
  return cardElement
  }}, '.elements__list')

cardsSection.renderAll()
// -----------------------------------------------

export const additionCardPopup = new PopupWithForm('.popup_type_addition',
(cardData)=>{cardsSection.addItem(cardData)
  additionCardPopup.close()//закрытие попапа
})
additionCardPopup.setEventListeners()

// -----------------------------------------------

export const dataTransfer = new UserInfo('.profile__title', '.profile__subtitle')//Объявление класса обработки информации о профиле

// -----------------------------------------------

export const editionProfilePopup = new PopupWithForm('.popup_type_profile',
(profileData)=>{
  dataTransfer.setUserInfo(profileData)
  editionProfilePopup.close()
})
editionProfilePopup.setEventListeners()

// -----------------------------------------------

export const widePopup = new PopupWithImage('.popup_type_photo')//Объявление класса с широкой картинкой
widePopup.setEventListeners()//Закрытие просмотра картинок в большом размере

// -----------------------------------------------

//Валидация форм
export const profileEditionForm = new FormValidator(config, document.querySelector('form[name="edition-form"]'))//Валидация профиля
profileEditionForm.enableValidation()
export const cardAdditionForm = new FormValidator(config, document.querySelector('form[name="addition-form"]'))//Валидация попапа добавления карточек
cardAdditionForm.enableValidation()

// -----------------------------------------------------------------------------------------------------
//Условия выполнения функций

// Открытие попапа
buttonOpenPopupProfile.addEventListener('click', openProfilePopup) //Редактирование профиля

additionPopupOpenButton.addEventListener('click', openAdditionPopup) //Добавление картинок