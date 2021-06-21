export class UserInfo {
    constructor(userName, userDescription) {
        this._userName = document.querySelector(userName)
        this._userDescription = document.querySelector(userDescription)
    }

    getUserInfo() { //Возвращаем объект с именем и описанием профиля для последующей передачи в поля input
        const userInfo = {name: this._userName.textContent, description: this._userDescription.textContent}
        return userInfo
    }

    setUserInfo(profileData) { //Функция замены информации о профиле при submit формы попапа редактирования профиля
        this._userName.textContent = profileData.name
        this._userDescription.textContent = profileData.description
    }
}