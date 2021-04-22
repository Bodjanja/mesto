// Объявление переменных
let openPopUpButton = document.querySelector('.profile__edition-button');
let popup = document.querySelector('.popup');
let closePopUpButton = document.querySelector('.popup__close')
let form = document.querySelector('.form');
let namea = document.querySelector('.profile__title');
let description = document.querySelector('.profile__subtitle');
let popupName = document.querySelector('.input-info_type_name');
let popupDescription = document.querySelector('.form__input-info_type_description');

//Объявление функций
function openPopup() {
    popup.classList.toggle('popup_opened')
    popupName.value = namea.textContent;
    popupDescription.value = description.textContent;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    namea.textContent = popupName.value;
    description.textContent = popupDescription.value;
    hidePopup();
}

function hidePopup() {
    popup.classList.remove('popup_opened')
}

// Открытие попапа
openPopUpButton.addEventListener('click', openPopup)

// Закрытие попапа
closePopUpButton.addEventListener('click', hidePopup)

// popup.addEventListener('click', function (event) {
//     if (event.target === event.currentTarget) {
//         hidePopup()
//     }
// })

// Замена информации в полях
form.addEventListener('submit', formSubmitHandler)