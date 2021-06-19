import {newPlaceSaveButton, editionButton} from '../utils/constants.js'
import {UserInfo} from '../components/UserInfo.js'
import {additionCardPopup, profileEditionForm, cardAdditionForm, editionProfilePopup} from '../pages/index.js'

  //Включение кнопки сохранения редактирования при открытие попапа (так как значения передаются автоматически)
function enableProfileSaveButton() {
  editionButton.disabled = false
}

//Выключение кнопки сохранения места, если при предыдущем открытии были введены корректные инпуты и попап был закрыт на крестик
function disableAdditionSaveButton() {
  newPlaceSaveButton.disabled = true
}

//Функция открытия попапа редактирования профиля и перенос значений полей
export function openProfilePopup() {
  editionProfilePopup.open()
  const dataTransferReverse = new UserInfo('.profile__title', '.profile__subtitle')
  dataTransferReverse.getUserInfo()
  
  profileEditionForm.clearErrorsProfile()
  enableProfileSaveButton()
}

//Функция открытия попапа для добавления картинок и коррекция значений полей
export function openAdditionPopup() {
  additionCardPopup.open()
  cardAdditionForm.clearErrorsProfile()
  disableAdditionSaveButton()
}