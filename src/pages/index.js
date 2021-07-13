// Импорт содержания модулей
import './index.css'

import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {Section} from '../components/Section.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import {PopupWithImage} from '../components/PopupWithImage.js'

import {buttonOpenPopupProfile, additionPopupOpenButton, avatarUpdateButton, userName, userDescription, userAvatar, config, inputName, inputDescription} from '../utils/constants.js'
import {PopupWithSubmit} from '../components/PopupWithSubmit.js'

import {Api} from '../components/Api.js'
let userId
//ОБЪЯВЛЕНИЕ ФУНКЦИЙ

//Изменение состояния кнопки при обработке запроса на сервер
function renderLoading(popupButtonSelector, buttonMessage){
  document.querySelector(popupButtonSelector).textContent = buttonMessage
}

//Функция открытия попапа редактирования профиля и перенос значений полей
function openProfilePopup() {
  editionProfilePopup.open()
  const {name, description} = dataTransfer.getUserInfo()
  inputName.value = name
  inputDescription.value = description

  
  profileEditionForm.resetValidation()
}

//Функция открытия попапа для добавления картинок и коррекция значений полей
function openAdditionPopup() {
  additionCardPopup.open()
  cardAdditionForm.resetValidation()
}

//Открытие попапа аватара, чистка полей и деактивирование кнопки
function openAvatarUpdate(){
  avatarUpdate.open()
  profileAvatarUpdate.resetValidation()
}

// ------------------------------------------------------------------------------------------------------------------------------

//РАБОТА С КЛАССАМИ И API

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  token: '1244c08d-1491-4631-b0bc-6d7f22b0d3e5'
  }
);

//Объявление класса для добавления карточек в DOM
const cardsSection = new Section(
  {renderer: (name, link, likes, owner, _id)=>{
  const card = new Card(name, link, '#template-element', () => {
    widePopup.open({name, link})
  }, likes, owner, userId, _id, confirmationPopup, api)
  const cardElement = card.generateCard()
  return cardElement
  }}, '.elements__list')

  Promise.all([api.getInitialCards(), api.getUserData()]).then(([cards, info]) => {
//Добавление информации о профиле с сервера
userName.textContent = info.name
userDescription.textContent = info.about
userAvatar.src = info.avatar
userAvatar.alt = info.name
userId = info._id

cardsSection.renderAll(cards)//Добавление карточек из массива с сервера
  }).catch((err) => {
    console.log(err)
  }); 

// -----------------------------------------------
//Объявление класса попапа добавления новых мест с колбэком добавления новой карточки
export const additionCardPopup = new PopupWithForm('.popup_type_addition',
(data)=>{
  renderLoading('.popup__submit-button_type_addition', 'Сохранение...')//Показать рендер кнопки в течении процесса взаимодействия с сервером
  api.postNewCard(data)
  .then(result => {      
      cardsSection.addItem(result)
      additionCardPopup.close()//закрытие попапа
      renderLoading('.popup__submit-button_type_addition', 'Создать')//Скрытие рендера кнопки при для нового открытия
    })
  .catch((err) => {
      console.log(err)
    }); 
})
additionCardPopup.setEventListeners()

// -----------------------------------------------
//Объявление класса для последующего вызова метода класса в utils.js
export const dataTransfer = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar')

// -----------------------------------------------
export const confirmationPopup = new PopupWithSubmit('.popup_confirmation') //Объявление класса попапа подтверждения удаления карточки
confirmationPopup.setEventListeners()

// -----------------------------------------------
//Замена аватара профиля
export const avatarUpdate = new PopupWithForm('.popup_avatar-update',
(data)=>{
  renderLoading('.popup__avatar-update-button', 'Сохранение...')
  api.updateProfileAvatar(data)
  .then(result => {
      dataTransfer.setUserInfo(result)
      renderLoading('.popup__avatar-update-button', 'Сохранить')
      avatarUpdate.close()
    })
  .catch((err) => {
      console.log(err)
    })
}) //Объявление класса попапа изменения аватара профиля
avatarUpdate.setEventListeners()//Вызов слушателей для изменения аватара профиля

// -----------------------------------------------
//Объявлеие класса изменения информации о профиле с колбэком замены значений полей
export const editionProfilePopup = new PopupWithForm('.popup_type_profile',
(data)=>{
  renderLoading('.popup__submit-button_edition', 'Сохранение...')
  api.editProfileData(data)//Сохранение отредактированных данных профиля на сервере
  .then(result=>{
    dataTransfer.setUserInfo(result)
  renderLoading('.popup__submit-button_edition', 'Сохранить')
  editionProfilePopup.close()
})
  .catch((err) => {
  console.log(err)
})
})
editionProfilePopup.setEventListeners()

// -----------------------------------------------

export const widePopup = new PopupWithImage('.popup_type_photo', '.popup__image', '.popup__caption')//Объявление класса с широкой картинкой
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