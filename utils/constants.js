import {widePopup} from '../pages/index.js'
//Константы на экспорт
      //В index.js
export const profilePopup = document.querySelector('.popup_type_profile');
export const additionPopup = document.querySelector('.popup_type_addition');
export const photoPopup = document.querySelector('.popup_type_photo');
export const buttonOpenPopupProfile = document.querySelector('.profile__edition-button');
export const additionPopupOpenButton = document.querySelector('.profile__add-button');
export const photoCloseButton = document.querySelector('.popup__close_type_photo');
export const formElement = document.querySelector('.form_type_profile')
export const inputName = formElement.querySelector('.form__input-info_type_name')
export const inputDescription = formElement.querySelector('.form__input-info_type_description')
export const handleCardClick = (evt) => {
      widePopup.open(evt)
    }
      //В PopupWithImage.js
export const popupPhotoSrc = document.querySelector('.popup__image');
export const popupText = document.querySelector('.popup__caption');
      //В utils.js
export const newPlaceSaveButton = document.querySelector('.popup__submit-button_type_addition');
export const editionButton = document.querySelector('.popup__submit-button_edition');