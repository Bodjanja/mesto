// Открытие попапа
let openPopUpButton = document.querySelector('.profile__edition-button');
let popup = document.querySelector('.popup');

openPopUpButton.addEventListener('click', function () {
    popup.classList.toggle('popup_opened')
})

let closePopUpButton = document.querySelector('.popup__close')

function removepopup(){
    popup.classList.remove('popup_opened')
    return
}

// Закрытие попапа
closePopUpButton.addEventListener('click', removepopup)

popup.addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
        removepopup()
    }
})

let form = document.querySelector('.form');
let namea = document.querySelector('.profile__title');
let description = document.querySelector('.profile__subtitle');
let popupname = document.querySelector('.form__input-name');
let popupdescription = document.querySelector('.form__input-description');

// Имя на попапе = имя на странице
openPopUpButton.addEventListener('click', function(){
    popupname.value = namea.textContent;
    popupdescription.value = description.textContent;
})

// Замена информации в полях
form.addEventListener('submit', function formSubmitHandler(evt){
    evt.preventDefault();
    namea.textContent = popupname.value;
    description.textContent = popupdescription.value;
    removepopup();
})