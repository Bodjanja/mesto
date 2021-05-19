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

const imagePopup = document.querySelector('.element__image')

const editionButton = document.querySelector('.popup__submit-button_edition')

const photoPopup = document.querySelector('.popup_type_photo');

const template = document.querySelector('#template-element').content;
const container = document.querySelector('.elements__list');

const photoCloseButton = document.querySelector('.popup__close_type_photo');
const popupPhotoSrc = document.querySelector('.popup__image')
const popupText = document.querySelector('.popup__caption')

const config = {
  formSelector: '.form',
  inputSelector: '.form__input-info',
  inputSubmitButton: '.popup__submit-button',
  inputErrorClass: 'form__input-info_error',
  errorActiveClass: 'form__input-info-error_active',
}

// -----------------------------------------------------------------------------------------------------
//Объявление функций

//Включение кнопки сохранения редактирования при открытие попапа (так как значения передаются автоматически)
function enableProfileSaveButton() {
  editionButton.disabled = false
}

//Выключение кнопки сохранения места, если при предыдущем открытии были введены корректные инпуты и попап был закрыт на крестик
function disableAdditionSaveButton() {
  newPlaceSaveButton.disabled = true
}

//Универсальная функция отокрытия попапов
function openPopup(popup){
  popup.classList.toggle('popup_opened');
  document.addEventListener('keydown', closePopupEsc)
}

//Универсальная функция закрытия попапов
function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc)
}

//Функция открытия попапа редактирования профиля и перенос значений полей
function openProfilePopup() {
  hideError(profileForm, popupName, config)
  hideError(profileForm, popupDescription, config)

  openPopup(profilePopup)
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  enableProfileSaveButton();
}

//Функция открытия попапа для добавления картинок и коррекция значений полей
function openAdditionPopup() {
  hideError(additionForm, newPlaceImage, config)
  hideError(additionForm, newPlaceName, config)

  openPopup(additionPopup)
  newPlaceName.value = null;
  newPlaceImage.value = null;
  disableAdditionSaveButton()
}

//Функция для передачи информации о профиле
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(profilePopup)
}

//Функция открытия попапа с большим разрешением картинок
function handleFullSizeImg(evt) {
  const textDom = evt.target.parentElement;
  const textSource = textDom.querySelector('.element__title')

  popupPhotoSrc.src = evt.target.currentSrc
  popupPhotoSrc.alt = textSource.textContent
  popupText.textContent = textSource.textContent
  openPopup(photoPopup)
}

//Функция удаления карточки
function removeElement(evt) {
  evt.target.closest('.element').remove();
}

//Общая функция создания карточки + обвес слушателей
function createCard(cardName, cardLink) {
  const element = template.querySelector('.element').cloneNode(true);
  const cardRemoveButton = element.querySelector('#removebutton');
  const likeIcon = element.querySelector('.element__icon');
  const wideImage = element.querySelector('.element__image');

  element.querySelector('.element__image').src = cardLink;
  element.querySelector('.element__title').textContent = cardName;
  element.querySelector('.element__image').alt = cardName;

  cardRemoveButton.addEventListener('click', removeElement) //Удалить карточку

  likeIcon.addEventListener('click', function () {
    likeIcon.classList.toggle('element__icon_liked')
  }) //Поставить "Нравится"

  wideImage.addEventListener('click', handleFullSizeImg) //Синхронизация картинки и подписи при попапе

  return element
}

// Функция добавления элемента в разметку
function addElement(item) {
  container.prepend(item)
}

//Функция для добавления новых карточек в разметку
function handleCardSubmit(evt) {
  evt.preventDefault();
  addElement(createCard(newPlaceName.value, newPlaceImage.value))
  closePopup(additionPopup)
}

//Функция закрытия попапа при нажатии на клавишу Escape
function closePopupEsc(evt){
  if (evt.key === 'Escape') {
    if (evt.target.className.includes('profile__edition-button')) {
      closePopup(profilePopup)
    } else if (evt.target.className.includes('profile__add-button')) {
      closePopup(additionPopup)
    } else if (evt.target.className.includes('page')) {
      closePopup(photoPopup)
}}}

// -----------------------------------------------------------------------------------------------------
//Условия выполнения функций

// Открытие попапа
openPopUpButton.addEventListener('click', openProfilePopup) //Редактирование профиля

additionPopupOpenButton.addEventListener('click', openAdditionPopup) //Добавление картинок

// Закрытие попапа
closeProfilePopup.addEventListener('click', ()=>{closePopup(profilePopup)}) //Редактирования профиля

closeAdditionPopup.addEventListener('click', ()=>{closePopup(additionPopup)}) //Добавления картинок

photoCloseButton.addEventListener('click', ()=>{closePopup(photoPopup)}) //Закрытие просмотра картинок в большом размере

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

//Закрытие попапа широкий картинок, если осуществлён клик по внешней области
photoPopup.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget) {
    closePopup(photoPopup)
  }
})

// Замена информации в полях профиля
profileForm.addEventListener('submit', handleProfileFormSubmit)

additionForm.addEventListener('submit', handleCardSubmit) //Добавление новых карточек

// Добавление карточек на страницу из массива
initialCards.forEach((item) => {
  addElement(createCard(item.name, item.link))
})

enableVerification(config)