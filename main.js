/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Api.js":
/*!*******************************!*\
  !*** ./src/components/Api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Api": () => (/* binding */ Api)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Api = /*#__PURE__*/function () {
  function Api(data) {
    _classCallCheck(this, Api);

    this._baseUrl = data.baseUrl;
    this._token = data.token;
  }

  _createClass(Api, [{
    key: "_checkResponse",
    value: function _checkResponse(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
      }
    }
  }, {
    key: "getInitialCards",
    value: function getInitialCards() {
      //Получить все начальные карточки с сервера для вставки их в разметку
      return fetch("".concat(this._baseUrl, "/cards"), {
        headers: {
          authorization: "".concat(this._token),
          'Content-Type': 'application/json'
        }
      }).then(this._checkResponse);
    }
  }, {
    key: "getUserData",
    value: function getUserData() {
      //Получить информацию о профиле с сервера для вставки в разметку
      return fetch("".concat(this._baseUrl, "/users/me"), {
        method: 'GET',
        headers: {
          authorization: "".concat(this._token),
          'Content-Type': 'application/json'
        }
      }).then(this._checkResponse);
    }
  }, {
    key: "editProfileData",
    value: function editProfileData(cardData) {
      //Отправить отредактированные данные профиля на сервер
      return fetch("".concat(this._baseUrl, "/users/me"), {
        method: 'PATCH',
        headers: {
          authorization: "".concat(this._token),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: cardData.name,
          about: cardData.description
        })
      }).then(this._checkResponse);
    }
  }, {
    key: "updateProfileAvatar",
    value: function updateProfileAvatar(data) {
      //Отправить отредактированный URL аватара на сервер
      return fetch("".concat(this._baseUrl, "/users/me/avatar"), {
        method: 'PATCH',
        headers: {
          authorization: "".concat(this._token),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: data.updateAvatar
        })
      }).then(this._checkResponse);
    }
  }, {
    key: "postNewCard",
    value: function postNewCard(cardData) {
      //Отправить на сервер новую карточку и добавить её в разметку
      return fetch("".concat(this._baseUrl, "/cards"), {
        method: 'POST',
        headers: {
          authorization: "".concat(this._token),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: cardData.additionName,
          link: cardData.additionPhoto
        })
      }).then(this._checkResponse);
    }
  }, {
    key: "removeCard",
    value: function removeCard(_id) {
      //Удаление карточки на сервере
      return fetch("".concat(this._baseUrl, "/cards/").concat(_id), {
        method: 'DELETE',
        headers: {
          authorization: "".concat(this._token),
          'Content-Type': 'application/json'
        }
      }).then(this._checkResponse);
    }
  }, {
    key: "likeCard",
    value: function likeCard(_id) {
      return fetch("".concat(this._baseUrl, "/cards/likes/").concat(_id), {
        method: 'PUT',
        headers: {
          authorization: "".concat(this._token),
          'Content-Type': 'application/json'
        }
      }).then(this._checkResponse);
    }
  }, {
    key: "dislikeCard",
    value: function dislikeCard(_id) {
      return fetch("".concat(this._baseUrl, "/cards/likes/").concat(_id), {
        method: 'DELETE',
        headers: {
          authorization: "".concat(this._token),
          'Content-Type': 'application/json'
        }
      }).then(this._checkResponse);
    }
  }]);

  return Api;
}();

/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Card": () => (/* binding */ Card)
/* harmony export */ });
/* harmony import */ var _PopupWithSubmit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PopupWithSubmit */ "./src/components/PopupWithSubmit.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var Card = /*#__PURE__*/function () {
  //Создаём класс карточки и абстрактные параметры
  function Card(cardName, cardLink, templateSelector, handleCardClick, likes, owner, userId, id, confirmationPopup, api) {
    _classCallCheck(this, Card);

    this._templateSelector = document.querySelector(templateSelector);
    this._text = cardName;
    this._image = cardLink;
    this._handleCardClick = handleCardClick;
    this._likes = likes;
    this._owner = owner;
    this._myId = userId;
    this._id = id;
    this._confirmationPopup = confirmationPopup;
    this._api = api;
  }

  _createClass(Card, [{
    key: "_getTemplate",
    value: function _getTemplate() {
      //Клонируем разметку карточки в DOM-дереве
      var cardElement = this._templateSelector.content.querySelector('.element').cloneNode(true);

      return cardElement;
    }
  }, {
    key: "generateCard",
    value: function generateCard() {
      var _this = this;

      //Наполняем карточку данными и возвращаем готовый экземпляр
      this._element = this._getTemplate();

      this._setEventListeners();

      var cardImage = this._element.querySelector('.element__image');

      var likesCounter = this._element.querySelector('.element__like-counter');

      var elementRemoveBin = this._element.querySelector('.element__bin');

      if (this._owner._id !== this._myId) {
        //Скрываем кнопку удаления для тех карточек, которые добавлены не нами (не совпадают id)
        elementRemoveBin.classList.add('element__bin_hidden');
      }

      this._likes.forEach(function (card) {
        //Заполнения сердечка лайка для ранее понравившихся карточек при загрузке страницы
        if (card._id.includes(_this._myId)) {
          _this._element.querySelector('.element__icon').classList.add('element__icon_liked');
        }
      });

      likesCounter.textContent = this._likes.length; //Отображение в разметке количества лайков

      cardImage.src = this._image;
      this._element.querySelector('.element__title').textContent = this._text;
      cardImage.alt = this._text;
      return this._element;
    }
  }, {
    key: "_likeCard",
    value: function _likeCard() {
      //Функция поставить "нравится" карточке
      var likeButton = this._element.querySelector('.element__icon');

      var likesCounter = this._element.querySelector('.element__like-counter'); //Если класс "liked" есть на кнопке likeButton, то вместе с ним вызываем api и отправляем данные на сервер, а из полученного объекта берём длину массива likes и подставляем цифру в разметку


      if (likeButton.classList.contains('element__icon_liked')) {
        this._api.dislikeCard(this._id).then(function (result) {
          likeButton.classList.remove('element__icon_liked');
          likesCounter.textContent = result.likes.length;
        }).catch(function (err) {
          console.log(err);
        });
      } else {
        this._api.likeCard(this._id).then(function (result) {
          likeButton.classList.add('element__icon_liked');
          likesCounter.textContent = result.likes.length;
        }).catch(function (err) {
          console.log(err);
        });
      }
    }
  }, {
    key: "_removeElement",
    value: function _removeElement(evt) {
      //Функция удаления карточки
      evt.remove();
    }
  }, {
    key: "_setEventListeners",
    value: function _setEventListeners() {
      var _this2 = this;

      //Обвес элементов слушателями
      this._element.querySelector('.element__image').addEventListener('click', this._handleCardClick); //Открытие попапа с картинкой


      this._element.querySelector('.element__icon').addEventListener('click', function () {
        _this2._likeCard();
      });

      this._element.querySelector('#removebutton').addEventListener('click', function () {
        _this2._confirmationPopup.open();

        _this2._confirmationPopup.setupSubmitAction(function () {
          _this2._api.removeCard(_this2._id).then(function () {
            _this2._removeElement(_this2._element); //Удаление карточки при нажатии на кнопку подтверждения


            _this2._confirmationPopup.close();
          }).catch(function (err) {
            console.log(err);
          });
        });
      });
    }
  }]);

  return Card;
}();

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormValidator": () => (/* binding */ FormValidator)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FormValidator = /*#__PURE__*/function () {
  function FormValidator(config, formElement) {
    _classCallCheck(this, FormValidator);

    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._formElement.querySelector(this._config.inputSubmitButton);
  }

  _createClass(FormValidator, [{
    key: "_setEventListeners",
    value: function _setEventListeners() {
      var _this = this;

      this._inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
          _this._checkValidity(inputElement);

          _this._checkButtonState();
        });
      });

      this._checkButtonState();
    }
  }, {
    key: "_checkValidity",
    value: function _checkValidity(inputElement) {
      //Проверка условий валидности
      if (inputElement.validity.valid) {
        this._hideError(inputElement);
      } else {
        this._showError(inputElement);
      }
    }
  }, {
    key: "_showError",
    value: function _showError(inputElement) {
      var errorElement = this._formElement.querySelector("#".concat(inputElement.id, "-error"));

      errorElement.textContent = inputElement.validationMessage;
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.classList.add(this._config.errorActiveClass);
    }
  }, {
    key: "_hideError",
    value: function _hideError(inputElement) {
      var errorElement = this._formElement.querySelector("#".concat(inputElement.id, "-error"));

      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._config.errorActiveClass);
    }
  }, {
    key: "resetValidation",
    value: function resetValidation() {
      var _this2 = this;

      //Функция для удаления ошибки валидации при повторном открытии попапа (если при прошлом открытии поля были некорректны)
      this._checkButtonState();

      this._inputList.forEach(function (inputElement) {
        _this2._hideError(inputElement);
      });
    }
  }, {
    key: "_hasInvalidInput",
    value: function _hasInvalidInput() {
      return this._inputList.some(function (inputElement) {
        if (inputElement.validity.valid === true) {
          return false;
        } else {
          return true;
        }
      });
    }
  }, {
    key: "_checkButtonState",
    value: function _checkButtonState() {
      if (this._hasInvalidInput(this._inputList) === true) {
        this._submitButton.disabled = true;
      } else {
        this._submitButton.disabled = false;
      }
    }
  }, {
    key: "enableValidation",
    value: function enableValidation() {
      this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      this._setEventListeners();
    }
  }]);

  return FormValidator;
}();

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Popup": () => (/* binding */ Popup)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Popup = /*#__PURE__*/function () {
  function Popup(popupSelector) {
    _classCallCheck(this, Popup);

    this.popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.buttonClose = this.popupElement.querySelector('.popup__close');
  }

  _createClass(Popup, [{
    key: "open",
    value: function open() {
      this.popupElement.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }
  }, {
    key: "close",
    value: function close() {
      this.popupElement.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }, {
    key: "_handleEscClose",
    value: function _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this = this;

      this.buttonClose.addEventListener('click', function () {
        _this.close();
      });
      this.popupElement.addEventListener('mousedown', function (event) {
        if (event.target === event.currentTarget) {
          _this.close();
        }
      });
    }
  }]);

  return Popup;
}();

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopupWithForm": () => (/* binding */ PopupWithForm)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var PopupWithForm = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithForm, _Popup);

  var _super = _createSuper(PopupWithForm);

  function PopupWithForm(popupSelector, onSubmitCb) {
    var _this;

    _classCallCheck(this, PopupWithForm);

    _this = _super.call(this, popupSelector);
    _this._onSubmitCb = onSubmitCb;
    _this._formElement = _this.popupElement.querySelector('.form');
    _this._inputList = _this._formElement.querySelectorAll('.form__input-info');
    return _this;
  }

  _createClass(PopupWithForm, [{
    key: "_getInputValues",
    value: function _getInputValues() {
      var result = {};
      var inputs = Array.from(this._inputList);
      inputs.forEach(function (input) {
        result[input.name] = input.value;
      });
      return result;
    }
  }, {
    key: "close",
    value: function close() {
      _get(_getPrototypeOf(PopupWithForm.prototype), "close", this).call(this);

      this._formElement.reset();
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this2 = this;

      _get(_getPrototypeOf(PopupWithForm.prototype), "setEventListeners", this).call(this);

      this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();

        var data = _this2._getInputValues();

        _this2._onSubmitCb(data);
      });
    }
  }]);

  return PopupWithForm;
}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup);

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopupWithImage": () => (/* binding */ PopupWithImage)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var PopupWithImage = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithImage, _Popup);

  var _super = _createSuper(PopupWithImage);

  function PopupWithImage(popupSelector, photoSrc, text) {
    var _this;

    _classCallCheck(this, PopupWithImage);

    _this = _super.call(this, popupSelector);
    _this._photoSrc = _this.popupElement.querySelector(photoSrc);
    _this._text = _this.popupElement.querySelector(text);
    return _this;
  }

  _createClass(PopupWithImage, [{
    key: "open",
    value: function open(_ref) {
      var name = _ref.name,
          link = _ref.link;

      _get(_getPrototypeOf(PopupWithImage.prototype), "open", this).call(this);

      this._photoSrc.src = link;
      this._photoSrc.alt = name;
      this._text.textContent = name;
    }
  }]);

  return PopupWithImage;
}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup);

/***/ }),

/***/ "./src/components/PopupWithSubmit.js":
/*!*******************************************!*\
  !*** ./src/components/PopupWithSubmit.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopupWithSubmit": () => (/* binding */ PopupWithSubmit)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var PopupWithSubmit = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithSubmit, _Popup);

  var _super = _createSuper(PopupWithSubmit);

  function PopupWithSubmit(popupSelector) {
    var _this;

    _classCallCheck(this, PopupWithSubmit);

    _this = _super.call(this, popupSelector);
    _this._form = document.querySelector('.popup__form_confirmation');
    return _this;
  }

  _createClass(PopupWithSubmit, [{
    key: "setupSubmitAction",
    value: function setupSubmitAction(callback) {
      this._submitHandler = callback;
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this2 = this;

      _get(_getPrototypeOf(PopupWithSubmit.prototype), "setEventListeners", this).call(this);

      this._form.addEventListener('submit', function (evt) {
        evt.preventDefault();

        _this2._submitHandler();
      });
    }
  }]);

  return PopupWithSubmit;
}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup);

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Section": () => (/* binding */ Section)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Section = /*#__PURE__*/function () {
  function Section(_ref, containerSelector) {
    var renderer = _ref.renderer;

    _classCallCheck(this, Section);

    this._renderer = renderer;
    this._container = containerSelector;
    this._element = document.querySelector(containerSelector);
  }

  _createClass(Section, [{
    key: "renderAll",
    value: function renderAll(result) {
      var _this = this;

      result.forEach(function (item) {
        _this._element.append(_this._renderer(item.name, item.link, item.likes, item.owner, item._id));
      });
    }
  }, {
    key: "addItem",
    value: function addItem(cardData) {
      this._element.prepend(this._renderer(cardData.name, cardData.link, cardData.likes, cardData.owner, cardData._id));
    }
  }]);

  return Section;
}();

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserInfo": () => (/* binding */ UserInfo)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserInfo = /*#__PURE__*/function () {
  function UserInfo(userName, userDescription, userAvatar) {
    _classCallCheck(this, UserInfo);

    this._userName = document.querySelector(userName);
    this._userDescription = document.querySelector(userDescription);
    this._userAvatar = document.querySelector(userAvatar);
  }

  _createClass(UserInfo, [{
    key: "getUserInfo",
    value: function getUserInfo() {
      //Возвращаем объект с именем и описанием профиля для последующей передачи в поля input
      var userInfo = {
        name: this._userName.textContent,
        description: this._userDescription.textContent
      };
      return userInfo;
    }
  }, {
    key: "setUserInfo",
    value: function setUserInfo(result) {
      //Функция замены информации о профиле при submit формы попапа редактирования профиля
      this._userName.textContent = result.name;
      this._userDescription.textContent = result.about;
      this._userAvatar.src = result.avatar;
      this._userAvatar.alt = result.name;
    }
  }]);

  return UserInfo;
}();

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buttonOpenPopupProfile": () => (/* binding */ buttonOpenPopupProfile),
/* harmony export */   "additionPopupOpenButton": () => (/* binding */ additionPopupOpenButton),
/* harmony export */   "avatarUpdateButton": () => (/* binding */ avatarUpdateButton),
/* harmony export */   "userName": () => (/* binding */ userName),
/* harmony export */   "userDescription": () => (/* binding */ userDescription),
/* harmony export */   "userAvatar": () => (/* binding */ userAvatar),
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "formElement": () => (/* binding */ formElement),
/* harmony export */   "inputName": () => (/* binding */ inputName),
/* harmony export */   "inputDescription": () => (/* binding */ inputDescription),
/* harmony export */   "inputAvatar": () => (/* binding */ inputAvatar),
/* harmony export */   "inputPlace": () => (/* binding */ inputPlace),
/* harmony export */   "inputImage": () => (/* binding */ inputImage)
/* harmony export */ });
//Константы на экспорт
//В index.js
var buttonOpenPopupProfile = document.querySelector('.profile__edition-button');
var additionPopupOpenButton = document.querySelector('.profile__add-button');
var avatarUpdateButton = document.querySelector('.profile__avatar-container');
var userName = document.querySelector('.profile__title');
var userDescription = document.querySelector('.profile__subtitle');
var userAvatar = document.querySelector('.profile__avatar');
var config = {
  //Конфиг с элементами формы для валидации
  formSelector: '.form',
  inputSelector: '.form__input-info',
  inputSubmitButton: '.popup__submit-button',
  inputErrorClass: 'form__input-info_error',
  errorActiveClass: 'form__input-info-error_active',
  spanErrorClass: '.form__input-info-error'
}; //В utils.js

var formElement = document.querySelector('.form_type_profile');
var inputName = formElement.querySelector('.form__input-info_type_name');
var inputDescription = formElement.querySelector('.form__input-info_type_description'); //В Apii.js

var inputAvatar = document.querySelector('.form__input-info_type_avatar');
var inputPlace = document.querySelector('.form__input-info_type_place');
var inputImage = document.querySelector('.form__input-info_type_image');

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "api": () => (/* binding */ api),
/* harmony export */   "additionCardPopup": () => (/* binding */ additionCardPopup),
/* harmony export */   "dataTransfer": () => (/* binding */ dataTransfer),
/* harmony export */   "confirmationPopup": () => (/* binding */ confirmationPopup),
/* harmony export */   "avatarUpdate": () => (/* binding */ avatarUpdate),
/* harmony export */   "editionProfilePopup": () => (/* binding */ editionProfilePopup),
/* harmony export */   "widePopup": () => (/* binding */ widePopup),
/* harmony export */   "profileEditionForm": () => (/* binding */ profileEditionForm),
/* harmony export */   "cardAdditionForm": () => (/* binding */ cardAdditionForm),
/* harmony export */   "profileAvatarUpdate": () => (/* binding */ profileAvatarUpdate)
/* harmony export */ });
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/pages/index.css");
/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Card.js */ "./src/components/Card.js");
/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/FormValidator.js */ "./src/components/FormValidator.js");
/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Section.js */ "./src/components/Section.js");
/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/PopupWithForm.js */ "./src/components/PopupWithForm.js");
/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/UserInfo.js */ "./src/components/UserInfo.js");
/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PopupWithImage.js */ "./src/components/PopupWithImage.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/constants.js */ "./src/utils/constants.js");
/* harmony import */ var _components_PopupWithSubmit_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/PopupWithSubmit.js */ "./src/components/PopupWithSubmit.js");
/* harmony import */ var _components_Api_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/Api.js */ "./src/components/Api.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Импорт содержания модулей










var userId; //ОБЪЯВЛЕНИЕ ФУНКЦИЙ
//Изменение состояния кнопки при обработке запроса на сервер

function renderLoading(popupButtonSelector, buttonMessage) {
  document.querySelector(popupButtonSelector).textContent = buttonMessage;
} //Функция открытия попапа редактирования профиля и перенос значений полей


function openProfilePopup() {
  editionProfilePopup.open();

  var _dataTransfer$getUser = dataTransfer.getUserInfo(),
      name = _dataTransfer$getUser.name,
      description = _dataTransfer$getUser.description;

  _utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.inputName.value = name;
  _utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.inputDescription.value = description;
  profileEditionForm.resetValidation();
} //Функция открытия попапа для добавления картинок и коррекция значений полей


function openAdditionPopup() {
  additionCardPopup.open();
  cardAdditionForm.resetValidation();
} //Открытие попапа аватара, чистка полей и деактивирование кнопки


function openAvatarUpdate() {
  avatarUpdate.open();
  profileAvatarUpdate.resetValidation();
} // ------------------------------------------------------------------------------------------------------------------------------
//РАБОТА С КЛАССАМИ И API


var api = new _components_Api_js__WEBPACK_IMPORTED_MODULE_9__.Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  token: '1244c08d-1491-4631-b0bc-6d7f22b0d3e5'
}); //Объявление класса для добавления карточек в DOM

var cardsSection = new _components_Section_js__WEBPACK_IMPORTED_MODULE_3__.Section({
  renderer: function renderer(name, link, likes, owner, _id) {
    var card = new _components_Card_js__WEBPACK_IMPORTED_MODULE_1__.Card(name, link, '#template-element', function () {
      widePopup.open({
        name: name,
        link: link
      });
    }, likes, owner, userId, _id, confirmationPopup, api);
    var cardElement = card.generateCard();
    return cardElement;
  }
}, '.elements__list');
Promise.all([api.getInitialCards(), api.getUserData()]).then(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      cards = _ref2[0],
      info = _ref2[1];

  //Добавление информации о профиле с сервера
  dataTransfer.setUserInfo(info);
  userId = info._id; //Наш уникальный ID

  cardsSection.renderAll(cards); //Добавление карточек из массива с сервера
}).catch(function (err) {
  console.log(err);
}); // -----------------------------------------------
//Объявление класса попапа добавления новых мест с колбэком добавления новой карточки

var additionCardPopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_4__.PopupWithForm('.popup_type_addition', function (data) {
  renderLoading('.popup__submit-button_type_addition', 'Сохранение...'); //Показать рендер кнопки в течении процесса взаимодействия с сервером

  api.postNewCard(data).then(function (result) {
    cardsSection.addItem(result);
    additionCardPopup.close(); //закрытие попапа

    renderLoading('.popup__submit-button_type_addition', 'Создать'); //Скрытие рендера кнопки при для нового открытия
  }).catch(function (err) {
    console.log(err);
  });
});
additionCardPopup.setEventListeners(); // -----------------------------------------------
//Объявление класса для последующего вызова метода класса в utils.js

var dataTransfer = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_5__.UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar'); // -----------------------------------------------

var confirmationPopup = new _components_PopupWithSubmit_js__WEBPACK_IMPORTED_MODULE_8__.PopupWithSubmit('.popup_confirmation'); //Объявление класса попапа подтверждения удаления карточки

confirmationPopup.setEventListeners(); // -----------------------------------------------
//Замена аватара профиля

var avatarUpdate = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_4__.PopupWithForm('.popup_avatar-update', function (data) {
  renderLoading('.popup__avatar-update-button', 'Сохранение...');
  api.updateProfileAvatar(data).then(function (result) {
    dataTransfer.setUserInfo(result);
    renderLoading('.popup__avatar-update-button', 'Сохранить');
    avatarUpdate.close();
  }).catch(function (err) {
    console.log(err);
  });
}); //Объявление класса попапа изменения аватара профиля

avatarUpdate.setEventListeners(); //Вызов слушателей для изменения аватара профиля
// -----------------------------------------------
//Объявлеие класса изменения информации о профиле с колбэком замены значений полей

var editionProfilePopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_4__.PopupWithForm('.popup_type_profile', function (data) {
  renderLoading('.popup__submit-button_edition', 'Сохранение...');
  api.editProfileData(data) //Сохранение отредактированных данных профиля на сервере
  .then(function (result) {
    dataTransfer.setUserInfo(result);
    renderLoading('.popup__submit-button_edition', 'Сохранить');
    editionProfilePopup.close();
  }).catch(function (err) {
    console.log(err);
  });
});
editionProfilePopup.setEventListeners(); // -----------------------------------------------

var widePopup = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_6__.PopupWithImage('.popup_type_photo', '.popup__image', '.popup__caption'); //Объявление класса с широкой картинкой

widePopup.setEventListeners(); //Закрытие просмотра картинок в большом размере
// -----------------------------------------------
//Валидация форм

var profileEditionForm = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__.FormValidator(_utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.config, document.querySelector('form[name="edition-form"]')); //Валидация профиля

profileEditionForm.enableValidation();
var cardAdditionForm = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__.FormValidator(_utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.config, document.querySelector('form[name="addition-form"]')); //Валидация попапа добавления карточек

cardAdditionForm.enableValidation();
var profileAvatarUpdate = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__.FormValidator(_utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.config, document.querySelector('form[name="avatar-update"]'));
profileAvatarUpdate.enableValidation(); // -----------------------------------------------------------------------------------------------------
//Условия выполнения функций
// Открытие попапа

_utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.buttonOpenPopupProfile.addEventListener('click', openProfilePopup); //Редактирование профиля

_utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.additionPopupOpenButton.addEventListener('click', openAdditionPopup); //Добавление картинок

_utils_constants_js__WEBPACK_IMPORTED_MODULE_7__.avatarUpdateButton.addEventListener('click', openAvatarUpdate); //Изменение аватара
})();

/******/ })()
;
//# sourceMappingURL=main.js.map