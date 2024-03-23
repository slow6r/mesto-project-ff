import "../pages/index.css";
import { createCard, handleLike, handleDeleteCard } from "./card";
import { closePopup, openPopup } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import {
  getUserData,
  getInitialCards,
  getNewCard,
  updateProfileInfo,
  showLike,
  hideLike,
  changeProfilePic,
  removeCard,
} from "./api";

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

enableValidation(validationConfig);

/*popups*/
const editAvatarPopup = document.querySelector(".popup_type_avatar");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

/*forms*/
const avatarForm = editAvatarPopup.querySelector(".popup__form");
const newPlaceForm = addPopup.querySelector(".popup__form");
const editForm = editPopup.querySelector(".popup__form");

/*buttons*/
const editAvatarButton = document.querySelector(".profile__avatar-container");
const buttonAvatar = avatarForm.querySelector(".popup__button");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editFormPopupButton = editForm.querySelector(".popup__button");
const newPlacePopupButton = newPlaceForm.querySelector(".popup__button");

/*inputs*/
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const avatarLink = avatarForm.querySelector(".popup__input_type_avatar");
const linkInput = newPlaceForm.querySelector(".popup__input_type_url");
const placeNameInput = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);

/*descriptions, captions, images*/
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const originalButtonEdit = editFormPopupButton.textContent;
const originalButtonAdd = newPlacePopupButton.textContent;
const originalButtonAvatar = buttonAvatar.textContent;
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const contentContainer = document.querySelector(".places__list");
const profilePicture = document.querySelector(".profile__image");

let userId = "";
let validationEnabled = false;
const caption = "Сохранение...";

/*все про карточки и юзера*/
function renderCard(createCard) {
  contentContainer.prepend(createCard);
}

Promise.all([getInitialCards(), getUserData()])
  .then(([cards, user]) => {
    renameProfile(user);
    userId = user._id;
    cards.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        handleDeleteCard,
        handleLike,
        handlePictureClick,
        userId,
        showLike,
        hideLike,
        removeCard
      );
      renderCard(cardElement);
    });
  })
  .catch((error) => {
    console.error("Ошибка загрузки информации о пользователе:", error);
  });

/*смена надписи на кнопке сохранить*/
function changeButtonCaption(buttonElement, caption) {
  buttonElement.textContent = caption;
}

/*настройки профиля*/
function renameProfile(user) {
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  profilePicture.style.backgroundImage = `url(${user.avatar})`;
}

function handleEditButtonClick() {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editForm, validationConfig);
  if (!validationEnabled) {
    validationEnabled = true;
  }
}

editButton.addEventListener("click", handleEditButtonClick);

function updateProfile(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newAbout = jobInput.value;
  changeButtonCaption(editFormPopupButton, caption);
  updateProfileInfo(newName, newAbout)
    .then((userData) => {
      console.log("Профиль успешно обновлен:", userData);
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(editPopup);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
    })
    .finally(() => {
      changeButtonCaption(editFormPopupButton, originalButtonEdit);
    });
}

editForm.addEventListener("submit", updateProfile);

/*добавление карточек*/
function handleAddButtonClick() {
  openPopup(addPopup);
  newPlaceForm.reset();
  clearValidation(newPlaceForm, validationConfig); 
  if (!validationEnabled) {
    validationEnabled = true;
  }
}

addButton.addEventListener("click", handleAddButtonClick);

function addNewCard(cardData, userId) {
  const cardElement = createCard(
    cardData,
    handleDeleteCard,
    handleLike,
    handlePictureClick,
    userId,
    showLike,
    hideLike,
    removeCard
  );
  contentContainer.prepend(cardElement);
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: placeNameInput.value,
    link: linkInput.value,
    _id: userId,
  };
  changeButtonCaption(newPlacePopupButton, caption);
  getNewCard(newCardData.name, newCardData.link)
    .then((card) => {
      addNewCard(card, userId);
      closePopup(addPopup);
    })
    .catch((error) => {
      console.error("Ошибка при добавлении новой карточки:", error);
    })
    .finally(() => {
      changeButtonCaption(newPlacePopupButton, originalButtonAdd);
    });
}

newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);

/*редактирование аватара*/
function handleEditAvatarClick() {
  openPopup(editAvatarPopup);
  avatarLink.value = "";
  clearValidation(avatarForm, validationConfig); 
  if (!validationEnabled) {
    validationEnabled = true;
  }
}

editAvatarButton.addEventListener("click", handleEditAvatarClick);

function handleAvatarFormSubmit(event) {
  event.preventDefault();
  const avatarUrl = avatarLink.value;
  changeButtonCaption(buttonAvatar, caption);
  changeProfilePic(avatarUrl)
    .then((userData) => {
      console.log("Аватар успешно изменен:", userData);
      profilePicture.style.backgroundImage = `url(${avatarUrl})`;
      closePopup(editAvatarPopup);
    })
    .catch((error) => {
      console.error("Ошибка при смене аватара:", error);
    })
    .finally(() => {
      changeButtonCaption(buttonAvatar, originalButtonAvatar);
    });
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

/*большая картинка*/
export function handlePictureClick(imageUrl, imageDescription) {
  popupImage.src = imageUrl;
  popupImage.alt = imageDescription;
  popupCaption.textContent = imageDescription;

  openPopup(imagePopup);
}
