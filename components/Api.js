import {inputName, inputDescription, inputAvatar, inputPlace, inputImage} from "../utils/constants";

export class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl
    this._token = data.token
  }

  getInitialCards() {//Получить все начальные карточки с сервера для вставки их в разметку
    return fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: `${this._token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        else{return Promise.reject(`Ошибка: ${res.status}`)}
      })
  }

  getUserData() {//Получить информацию о профиле с сервера для вставки в разметку
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          authorization: `${this._token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        else{return Promise.reject(`Ошибка: ${res.status}`)}
      })
  }

  editProfileData() {//Отправить отредактированные данные профиля на сервер
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: `${this._token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: inputName.value,
          about: inputDescription.value
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        else{return Promise.reject(`Ошибка: ${res.status}`)}
      })
  }

  updateProfileAvatar() {//Отправить отредактированный URL аватара на сервер
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: `${this._token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: inputAvatar.value
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        else{return Promise.reject(`Ошибка: ${res.status}`)}
      })
  }

  postNewCard() {//Отправить на сервер новую карточку и добавить её в разметку
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: `${this._token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: inputPlace.value,
          link: inputImage.value
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        else{return Promise.reject(`Ошибка: ${res.status}`)}
      })
  }

  removeCard(_id){//Удаление карточки на сервере
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      else{return Promise.reject(`Ошибка: ${res.status}`)}
    })
  }

  likeCard(_id){
    return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
      method: 'PUT',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      else{return Promise.reject(`Ошибка: ${res.status}`)}
    })
  }

  dislikeCard(_id){
    return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      else{return Promise.reject(`Ошибка: ${res.status}`)}
    })
  }

}