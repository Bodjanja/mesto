// Объявление переменных
const openPopUpButton = document.querySelector('.profile__edition-button');
const popup = document.querySelector('.popup');
const closePopUpButton = document.querySelector('.popup__close')
const form = document.querySelector('.form');
const namea = document.querySelector('.profile__title');
const description = document.querySelector('.profile__subtitle');
const popupName = document.querySelector('.form__input-info_type_name');
const popupDescription = document.querySelector('.form__input-info_type_description');

const additionPopup = document.querySelector('.addition-popup');
const additionForm = document.querySelector('.addition-popup__form');
const additionPopupOpenButton = document.querySelector('.profile__add-button');
const closeAdditionPopup = document.querySelector('.addition-popup__close');
const newPlaceSaveButton = document.querySelector('.addition-popup__submit-button');
const newPlaceName = document.querySelector('.form__input-info_type_place');
const newPlaceImage = document.querySelector('.form__input-info_type_image');

const photoPopup = document.querySelector('.photo-popup');

//Начальный массив карточек
const initialCards = [{
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1615225150799-524453b31447?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1615529489302-e5e8d9f72ce8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1615529610458-1801dfce0a6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Архангельск',
    link: 'https://images.unsplash.com/photo-1615727463673-b5cc6d117728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1578589318274-02854f68813e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Карачаево-Черкессия',
    link: 'https://images.unsplash.com/photo-1577599302940-df8eadaaebad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];
const template = document.querySelector('#template-element').content;
const container = document.querySelector('.elements__list');

const photoCloseButton = document.querySelector('.photo-popup__close');
const popupPhotoSrc = document.querySelector('.photo-popup__image')
const popupText = document.querySelector('.photo-popup__caption')

// Добавление карточек на страницу из массива
initialCards.forEach(function (card){
  const item = template.querySelector('.element').cloneNode(true);
  const cardRemoveButton = item.querySelector('#removebutton');
  const likeIcon = item.querySelector('.element__icon');
  const wideImage = item.querySelector('.element__image');

  item.querySelector('.element__image').src = card.link;
  item.querySelector('.element__title').textContent = card.name;
  container.append(item);

  cardRemoveButton.addEventListener('click', function removeElement(evt){
    evt.target.closest('.element').remove();
  })//Удалить карточку

  likeIcon.addEventListener('click', function () {
    likeIcon.classList.toggle('element__icon_liked')
  })//Поставить "Нравится"

  wideImage.addEventListener('click', fullSizeImgHandler)//Синхронизация картинки и подписи при попапе
  
})

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
function fullSizeImgHandler(evt){
  const textDom = evt.target.parentElement;
  const textSource = textDom.querySelector('.element__title')
  
  popupPhotoSrc.src = evt.target.currentSrc
  photoPopup.classList.add('popup_opened')
  popupText.textContent = textSource.textContent
}

//Функция для добавления новых карточек в разметку
function cardSubmitHandler(evt){
  evt.preventDefault();
  const item = template.querySelector('.element').cloneNode(true);
  item.querySelector('.element__title').textContent = newPlaceName.value;
  item.querySelector('.element__image').src = newPlaceImage.value;
  container.prepend(item);
  hideAdditionPopup();

  const cardRemoveButton = item.querySelector('#removebutton')
  cardRemoveButton.addEventListener('click', function removeElement(evt){
    evt.target.closest('.element').remove();
  })

  const likeIcon = item.querySelector('.element__icon')
  likeIcon.addEventListener('click', function () {
    likeIcon.classList.toggle('element__icon_liked')
  })

  const wideImage = item.querySelector('.element__image');
  wideImage.addEventListener('click', fullSizeImgHandler)
  
}

// -----------------------------------------------------------------------------------------------------
//Условия выполнения функций

// Открытие попапа
openPopUpButton.addEventListener('click', openPopup) //Редактирование профиля

additionPopupOpenButton.addEventListener('click', openAdditionPopup) //Добавление картинок

// Закрытие попапа
closePopUpButton.addEventListener('click', hidePopup) //Редактирование профиля

closeAdditionPopup.addEventListener('click', hideAdditionPopup) //Добавление картинок

photoCloseButton.addEventListener('click', function(){
  photoPopup.classList.remove('popup_opened')
})//Закрытие просмотра картинок в большом размере

// popup.addEventListener('click', function (event) {
//     if (event.target === event.currentTarget) {
//         hidePopup()
//     }
// })

// Замена информации в полях профиля
form.addEventListener('submit', formSubmitHandler)

additionForm.addEventListener('submit', cardSubmitHandler)//Добавление новых карточек

