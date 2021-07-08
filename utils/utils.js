import {newPlaceSaveButton, editionButton, inputName, inputDescription} from '../utils/constants.js'
import {additionCardPopup, profileEditionForm, cardAdditionForm, editionProfilePopup, dataTransfer, avatarUpdate, profileAvatarUpdate} from '../pages/index.js'

  //Включение кнопки сохранения редактирования при открытие попапа (так как значения передаются автоматически)
function enableProfileSaveButton() {
  editionButton.disabled = false
}

//Выключение кнопки сохранения места, если при предыдущем открытии были введены корректные инпуты и попап был закрыт на крестик
function disableAdditionSaveButton() {
  newPlaceSaveButton.disabled = true
}

export function renderLoading(isLoading, popupButtonSelector, buttonMessage){
if(isLoading){
  document.querySelector(popupButtonSelector).textContent = buttonMessage
}else{document.querySelector(popupButtonSelector).textContent = buttonMessage}
}

//Функция открытия попапа редактирования профиля и перенос значений полей
export function openProfilePopup() {
  editionProfilePopup.open()
  const {name, description} = dataTransfer.getUserInfo()
  inputName.value = name
  inputDescription.value = description

  
  profileEditionForm.clearErrorsProfile()
  enableProfileSaveButton()
}

//Функция открытия попапа для добавления картинок и коррекция значений полей
export function openAdditionPopup() {
  additionCardPopup.open()
  cardAdditionForm.clearErrorsProfile()
  disableAdditionSaveButton()
}

//Открытие попапа аватара, чистка полей и деактивирование кнопки
export function openAvatarUpdate(){
  avatarUpdate.open()
  profileAvatarUpdate.clearErrorsProfile()
  disableAdditionSaveButton()
}