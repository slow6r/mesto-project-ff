import { openPopup } from './modal.js';
const cardTemplate = document.querySelector('#card-template').content;
const popupImage = document.querySelector('.popup_type_image');
const popupImageSrc = popupImage.querySelector('.popup__image');
const popupImageCpt = popupImage.querySelector('.popup__caption');

function deleteCard(cardForRemove) {
    cardForRemove.remove();
};

function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

function handleCardClick(cardImage, cardTitle) {
  openPopup(popupImage);
  popupImageSrc.src = cardImage.src;
  popupImageSrc.alt = cardImage.alt;
  popupImageCpt.textContent = cardTitle.textContent;
};

function addCard({ placeImg, placeName, likeCard, deleteCard, handleCardClick }) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title')
  cardTitle.textContent = placeName;
  cardImage.src = placeImg;
  cardImage.alt = "Фотография " + placeName;
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
  cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
    deleteCard(cardElement);
  });
  cardImage.addEventListener('click', function() {
    handleCardClick(cardImage, cardTitle)
  });
  return cardElement;
};

export {addCard, deleteCard, likeCard, handleCardClick};