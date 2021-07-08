// Импорт содержания модулей
import './index.css'

import {openProfilePopup, openAdditionPopup, openAvatarUpdate, renderLoading} from '../utils/utils.js'
import {Card} from '../components/Card.js'
import {FormValidator} from '../scripts/FormValidator.js'
import {Section} from '../components/Section.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import {PopupWithImage} from '../components/PopupWithImage.js'

import {buttonOpenPopupProfile, additionPopupOpenButton, avatarUpdateButton, userName, userDescription, userAvatar} from '../utils/constants.js'
import {Popup} from '../components/Popup.js'

import {Api} from '../components/Api.js'

//Конфиг с элементами формы для валидации
const config = {
  formSelector: '.form',
  inputSelector: '.form__input-info',
  inputSubmitButton: '.popup__submit-button',
  inputErrorClass: 'form__input-info_error',
  errorActiveClass: 'form__input-info-error_active',
  spanErrorClass: '.form__input-info-error'
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  token: '1244c08d-1491-4631-b0bc-6d7f22b0d3e5'
  }
);

//Добавление карточек из массива с сервера
api.getInitialCards()
.then(result => {
  const cardsSection = new Section(
    {items: result,
    renderer: (name, link, likes, owner, _id)=>{
    const card = new Card(name, link, '#template-element', () => {
      widePopup.open({name, link})
    }, likes, owner, '6f2db9ebbf34b17236d87430', _id)
    const cardElement = card.generateCard()
    return cardElement
    }}, '.elements__list')
  
  cardsSection.renderAll()
})
.catch((err) => {
  console.log(err)
}); 

//Добавление информации о профиле с сервера
api.getUserData()
.then((result) => {
  userName.textContent = result.name
  userDescription.textContent = result.about
  userAvatar.src = result.avatar
  userAvatar.alt = result.name
})
.catch((err) => {
  console.log(err)
}); 

// -----------------------------------------------
//Объявление класса попапа добавления новых мест с колбэком добавления новой карточки
export const additionCardPopup = new PopupWithForm('.popup_type_addition',
()=>{
  renderLoading(true, '.popup__submit-button_type_addition', 'Сохранение...')//Показать рендер кнопки в течении процесса взаимодействия с сервером
  api.postNewCard()
  .then(result => {
      const cardsSection = new Section(
        {items: result,
        renderer: (name, link, likes, owner, _id)=>{
        const card = new Card(name, link, '#template-element', () => {
          widePopup.open({name, link})
        }, likes, owner, '6f2db9ebbf34b17236d87430', _id)
        const cardElement = card.generateCard()
        return cardElement
        }}, '.elements__list')
      
      cardsSection.addItem(result)
      additionCardPopup.close()//закрытие попапа
      renderLoading(false, '.popup__submit-button_type_addition', 'Создать')//Скрытие рендера кнопки при для нового открытия
    })
  .catch((err) => {
      console.log(err)
    }); 
})
additionCardPopup.setEventListeners()

// -----------------------------------------------
//Объявление класса для последующего вызова метода класса в utils.js
export const dataTransfer = new UserInfo('.profile__title', '.profile__subtitle')

// -----------------------------------------------
export const confirmationPopup = new Popup('.popup_confirmation') //Объявление класса попапа подтверждения удаления карточки
confirmationPopup.setEventListeners()

// -----------------------------------------------
//Замена аватара профиля
export const avatarUpdate = new PopupWithForm('.popup_avatar-update',
()=>{
  renderLoading(true, '.popup__avatar-update-button', 'Сохранение...')
  api.updateProfileAvatar()
  .then(result => {
      document.querySelector('.profile__avatar').src = result.avatar
      renderLoading(false, '.popup__avatar-update-button', 'Сохранить')
    })
  .catch((err) => {
      console.log(err)
    }); 
  avatarUpdate.close()
}) //Объявление класса попапа изменения аватара профиля
avatarUpdate.setEventListeners()//Вызов слушателей для изменения аватара профиля

// -----------------------------------------------
//Объявлеие класса изменения информации о профиле с колбэком замены значений полей
export const editionProfilePopup = new PopupWithForm('.popup_type_profile',
()=>{
  renderLoading(true, '.popup__submit-button_edition', 'Сохранение...')
  api.editProfileData()//Сохранение отредактированных данных профиля на сервере
  .then(result=>{userName.textContent = result.name//Замена информации о профиле
  userDescription.textContent = result.about
  renderLoading(false, '.popup__submit-button_edition', 'Сохранить')
})
  .catch((err) => {
  console.log(err)
}); 
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
export const profileAvatarUpdate = new FormValidator(config, document.querySelector('form[name="avatar-update"]'))
profileAvatarUpdate.enableValidation()

// -----------------------------------------------------------------------------------------------------
//Условия выполнения функций

// Открытие попапа
buttonOpenPopupProfile.addEventListener('click', openProfilePopup) //Редактирование профиля

additionPopupOpenButton.addEventListener('click', openAdditionPopup) //Добавление картинок

avatarUpdateButton.addEventListener('click', openAvatarUpdate) //Изменение аватара