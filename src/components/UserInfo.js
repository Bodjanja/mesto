export class UserInfo {
    constructor(userName, userDescription, userAvatar) {
        this._userName = document.querySelector(userName)
        this._userDescription = document.querySelector(userDescription)
        this._userAvatar = document.querySelector(userAvatar)
    }

    getUserInfo() { //Возвращаем объект с именем и описанием профиля для последующей передачи в поля input
        const userInfo = {name: this._userName.textContent, description: this._userDescription.textContent}
        return userInfo
    }

    setUserInfo(result) { //Функция замены информации о профиле при submit формы попапа редактирования профиля
        this._userName.textContent = result.name
        this._userDescription.textContent = result.about
        this._userAvatar.src = result.avatar
        this._userAvatar.alt = result.name
    }
}