// Объявление переменных
const openPopUpButton = document.querySelector('.profile__edition-button');
const popup = document.querySelector('.popup');
const closePopUpButton = document.querySelector('.popup__close')
const form = document.querySelector('.form');
const namea = document.querySelector('.profile__title');
const description = document.querySelector('.profile__subtitle');
const popupName = document.querySelector('.form__input-info_type_name');
const popupDescription = document.querySelector('.form__input-info_type_description');

const additionPopup = document.querySelector('.popup_type_addition');
const additionForm = document.querySelector('.form_type_addition');
const additionPopupOpenButton = document.querySelector('.profile__add-button');
const closeAdditionPopup = document.querySelector('.popup__close_type_addition');
const newPlaceSaveButton = document.querySelector('.popup__submit-button_type_addition');
const newPlaceName = document.querySelector('.form__input-info_type_place');
const newPlaceImage = document.querySelector('.form__input-info_type_image');

const photoPopup = document.querySelector('.popup_type_photo');

const template = document.querySelector('#template-element').content;
const container = document.querySelector('.elements__list');

const photoCloseButton = document.querySelector('.popup__close_type_photo');
const popupPhotoSrc = document.querySelector('.popup__image')
const popupText = document.querySelector('.popup__caption')

// -----------------------------------------------------------------------------------------------------
//Объявление функций

//Функция открытия попапа редактирования профиля и перенос значений
function openPopup() {
  popup.classList.toggle('popup_opened')
  popupName.value = namea.textContent;
  popupDescription.value = description.textContent;
}

//Функция для закрытия попапа редактирования профиля
function hidePopup() {
  popup.classList.remove('popup_opened')
}

//Функция открытия попапа для добавления картинок
function openAdditionPopup() {
  additionPopup.classList.add('popup_opened')
  newPlaceName.value = null;
  newPlaceImage.value = null;
}

//Функция для закрытия попапа добавления картинок
function hideAdditionPopup() {
  additionPopup.classList.remove('popup_opened')
}

//Функция для передачи информации о профиле
function formSubmitHandler(evt) {
  evt.preventDefault();
  namea.textContent = popupName.value;
  description.textContent = popupDescription.value;
  hidePopup();
}

//Функция открытия попапа с большим разрешением картинок
function fullSizeImgHandler(evt) {
  const textDom = evt.target.parentElement;
  const textSource = textDom.querySelector('.element__title')

  popupPhotoSrc.src = evt.target.currentSrc
  popupPhotoSrc.alt = textSource.textContent
  popupText.textContent = textSource.textContent
  photoPopup.classList.add('popup_opened')
}

//Общая функция создания карточки + обвес слушателей
function createCard(cardName, cardLink) {
  const element = template.querySelector('.element').cloneNode(true);
  const cardRemoveButton = element.querySelector('#removebutton');
  const likeIcon = element.querySelector('.element__icon');
  const wideImage = element.querySelector('.element__image');

  element.querySelector('.element__image').src = cardLink;
  element.querySelector('.element__title').textContent = cardName;
  element.querySelector('.element__title').alt = cardName;

  cardRemoveButton.addEventListener('click', function removeElement(evt) {
    evt.target.closest('.element').remove();
  }) //Удалить карточку

  likeIcon.addEventListener('click', function () {
    likeIcon.classList.toggle('element__icon_liked')
  }) //Поставить "Нравится"

  wideImage.addEventListener('click', fullSizeImgHandler) //Синхронизация картинки и подписи при попапе

  return element
}

// Функция добавления элемента в разметку
function addElement(item) {
  container.prepend(item)
}

//Функция для добавления новых карточек в разметку
function cardSubmitHandler(evt) {
  evt.preventDefault();
  addElement(createCard(newPlaceName.value, newPlaceImage.value))
  hideAdditionPopup();
}

// -----------------------------------------------------------------------------------------------------
//Условия выполнения функций

// Открытие попапа
openPopUpButton.addEventListener('click', openPopup) //Редактирование профиля

additionPopupOpenButton.addEventListener('click', openAdditionPopup) //Добавление картинок

// Закрытие попапа
closePopUpButton.addEventListener('click', hidePopup) //Редактирования профиля

closeAdditionPopup.addEventListener('click', hideAdditionPopup) //Добавления картинок

photoCloseButton.addEventListener('click', function () {
  photoPopup.classList.remove('popup_opened')
}) //Закрытие просмотра картинок в большом размере

// popup.addEventListener('click', function (event) {
//     if (event.target === event.currentTarget) {
//         hidePopup()
//     }
// })

// Замена информации в полях профиля
form.addEventListener('submit', formSubmitHandler)

additionForm.addEventListener('submit', cardSubmitHandler) //Добавление новых карточек

// Добавление карточек на страницу из массива
initialCards.forEach((item) => {
  addElement(createCard(item.name, item.link))
})