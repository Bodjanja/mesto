// Импорт содержания модулей
import {Card} from './Card.js'
import {initialCards} from './initial-cards.js'
import {FormValidator} from './FormValidator.js'

// Объявление переменных
const openPopUpButton = document.querySelector('.profile__edition-button');
const profilePopup = document.querySelector('.popup_type_profile');
const closeProfilePopup = document.querySelector('.popup__close_type_profile')
const profileForm = document.querySelector('.form_type_profile');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const popupName = document.querySelector('.form__input-info_type_name');
const popupDescription = document.querySelector('.form__input-info_type_description');

const additionPopup = document.querySelector('.popup_type_addition');
const additionForm = document.querySelector('.form_type_addition');
const additionPopupOpenButton = document.querySelector('.profile__add-button');
const closeAdditionPopup = document.querySelector('.popup__close_type_addition');
const newPlaceSaveButton = document.querySelector('.popup__submit-button_type_addition');
const newPlaceName = document.querySelector('.form__input-info_type_place');
const newPlaceImage = document.querySelector('.form__input-info_type_image');

const editionButton = document.querySelector('.popup__submit-button_edition');

export const photoPopup = document.querySelector('.popup_type_photo');


const container = document.querySelector('.elements__list');

const photoCloseButton = document.querySelector('.popup__close_type_photo');
export const popupPhotoSrc = document.querySelector('.popup__image');
export const popupText = document.querySelector('.popup__caption');

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
initialCards.forEach((item) => {
  container.append(createCard(item.name, item.link))
})

additionForm.addEventListener('submit', handleCardSubmit) //Добавление новых карточек

//Валидация форм
const profileEditionForm = new FormValidator(config, document.querySelector('form[name="edition-form"]'))//Валидация профиля
profileEditionForm.enableValidation()
const cardAdditionForm = new FormValidator(config, document.querySelector('form[name="addition-form"]'))//Валидация попапа добавления карточек
cardAdditionForm.enableValidation()

// -----------------------------------------------------------------------------------------------------
//Объявление функций

//Функция создания карточки
function createCard(name, link){
  const card = new Card(name, link, '#template-element')
  const cardElement = card.generateCard()
  return cardElement
}

// Функция добавления элемента в разметку из попапа
function addElement() {
  container.prepend(createCard(newPlaceName.value, newPlaceImage.value))
}

//Функция для добавления новых карточек в разметку через форму 
function handleCardSubmit(evt) {
  evt.preventDefault()
  addElement()
  closePopup(additionPopup)
}

//Включение кнопки сохранения редактирования при открытие попапа (так как значения передаются автоматически)
function enableProfileSaveButton() {
  editionButton.disabled = false
}

//Выключение кнопки сохранения места, если при предыдущем открытии были введены корректные инпуты и попап был закрыт на крестик
function disableAdditionSaveButton() {
  newPlaceSaveButton.disabled = true
}

//Универсальная функция открытия попапов
export function openPopup(popup) {
  popup.classList.toggle('popup_opened')
  document.addEventListener('keydown', closePopupEsc)
}

//Универсальная функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupEsc)
}

//Функция открытия попапа редактирования профиля и перенос значений полей
function openProfilePopup() {
  openPopup(profilePopup)
  profileEditionForm.clearErrorsProfile()
  
  popupName.value = profileName.textContent
  popupDescription.value = profileDescription.textContent
  enableProfileSaveButton()
}

//Функция открытия попапа для добавления картинок и коррекция значений полей
function openAdditionPopup() {
  openPopup(additionPopup)
  cardAdditionForm.clearErrorsProfile()
  newPlaceName.value = null
  newPlaceImage.value = null
  disableAdditionSaveButton()
}

//Функция для передачи информации о профиле
function handleProfileFormSubmit(evt) {
  evt.preventDefault()
  profileName.textContent = popupName.value
  profileDescription.textContent = popupDescription.value
  closePopup(profilePopup)
}

//Функция закрытия попапа при нажатии на клавишу Escape
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const open = document.querySelector('.popup_opened')
    closePopup(open)
  }
}
// -----------------------------------------------------------------------------------------------------
//Условия выполнения функций

// Открытие попапа
openPopUpButton.addEventListener('click', openProfilePopup) //Редактирование профиля

additionPopupOpenButton.addEventListener('click', openAdditionPopup) //Добавление картинок

// Закрытие попапа
closeProfilePopup.addEventListener('click', () => {
  closePopup(profilePopup)
}) //Редактирования профиля

closeAdditionPopup.addEventListener('click', () => {
  closePopup(additionPopup)
}) //Добавления картинок

photoCloseButton.addEventListener('click', () => {
  closePopup(photoPopup)
}) //Закрытие просмотра картинок в большом размере

//Закрытие попапа редактирования профиля, если осуществлён клик по внешней области
profilePopup.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget) {
    closePopup(profilePopup)
  }
})

//Закрытие попапа добавления места, если осуществлён клик по внешней области
additionPopup.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget) {
    closePopup(additionPopup)
  }
})

//Закрытие попапа широких картинок, если осуществлён клик по внешней области
photoPopup.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget) {
    closePopup(photoPopup)
  }
})

// Замена информации в полях профиля
profileForm.addEventListener('submit', handleProfileFormSubmit)