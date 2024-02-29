import initialCards from './components/cards.js';
import './pages/index.css';
import {addCard, deleteCard, likeCard, cardTemplate, handleCardClick} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const buttonNewPlace = document.querySelector('.profile__add-button');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const cardParams = {placeName: 'Name', placeImg: 'Link', deleteCard, likeCard, handleCardClick};
const popups = document.querySelectorAll('.popup')
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const nameProfile = formEditProfile.elements.name;
const descriptionProfile = formEditProfile.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
          closePopup(popup);
        };
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup);
        };
    });
});

initialCards.forEach((card) => {
  cardParams.placeName = card.name;
  cardParams.placeImg = card.link;
  placesList.append(addCard(cardParams));
});

buttonNewPlace.addEventListener('click', function () {
  openPopup(popupNewCard);
});

buttonProfileEdit.addEventListener('click', function () {
  openPopup(popupProfileEdit);
  nameProfile.value = profileTitle.textContent;
  descriptionProfile.value = profileDescription.textContent;
});

formNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  cardParams.placeName = formNewCard.elements['place-name'].value;
  cardParams.placeImg = formNewCard.elements.link.value;
  placesList.prepend(addCard(cardParams));
  formNewCard.reset();
  closePopup(popupNewCard);
});

formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameProfile.value;
  profileDescription.textContent = descriptionProfile.value;
  closePopup(popupProfileEdit);
});