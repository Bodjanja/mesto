import {inputName, inputDescription} from '../utils/constants.js'

export class UserInfo {
    constructor(userName, userDescription) {
        this._userName = document.querySelector(userName)
        this._userDescription = document.querySelector(userDescription)
    }

    getUserInfo() { //Перенос значений информации профиля в поля инпутов при открытии попапа редактирования профиля
        inputName.value = this._userName.textContent
        inputDescription.value = this._userDescription.textContent
    }

    setUserInfo(profileData) { //Функция замены информации о профиле при submit формы попапа редактирования профиля
        this._userName.textContent = profileData.name
        this._userDescription.textContent = profileData.description
    }
}