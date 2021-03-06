//Константы на экспорт
      //В index.js
export const buttonOpenPopupProfile = document.querySelector('.profile__edition-button');
export const additionPopupOpenButton = document.querySelector('.profile__add-button');
export const avatarUpdateButton = document.querySelector('.profile__avatar-container');
export const userName = document.querySelector('.profile__title');
export const userDescription = document.querySelector('.profile__subtitle');
export const userAvatar = document.querySelector('.profile__avatar');
export const config = {//Конфиг с элементами формы для валидации
      formSelector: '.form',
      inputSelector: '.form__input-info',
      inputSubmitButton: '.popup__submit-button',
      inputErrorClass: 'form__input-info_error',
      errorActiveClass: 'form__input-info-error_active',
      spanErrorClass: '.form__input-info-error'
    }
      //В utils.js
export const formElement = document.querySelector('.form_type_profile');
export const inputName = formElement.querySelector('.form__input-info_type_name');
export const inputDescription = formElement.querySelector('.form__input-info_type_description');
      //В Apii.js
export const inputAvatar = document.querySelector('.form__input-info_type_avatar');
export const inputPlace = document.querySelector('.form__input-info_type_place');
export const inputImage = document.querySelector('.form__input-info_type_image');