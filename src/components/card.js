// @todo: Экспортируемые функции
export {createCard, toggleLike};

// @todo: Функция создания карточки
function createCard(template, card, autor, callbackDelete, onLikeCard, callbackImage) {
  const cardItem = template.content.cloneNode(true);
  const cardElement = cardItem.querySelector('.card');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeButton = cardItem.querySelector('.card__like-button');
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardLikeButton.textContent = card.likes.length;
  cardTitle.textContent = card.name;
  if (autor != card.owner._id) {
    cardDeleteButton.disabled = true;
    cardDeleteButton.hidden = true;
  }
  const isLiked = card.likes.some((like) => autor === like._id);
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardDeleteButton.addEventListener('click', () => callbackDelete(card._id, cardElement));
  cardLikeButton.addEventListener('click', (evt) => onLikeCard(card._id, evt.target, evt.target.classList.contains('card__like-button_is-active')))
  cardImage.addEventListener('click', () => callbackImage(card.link, card.name));
  return cardItem;
  
};

function toggleLike(buttonLikeElement, isLiked, likesCount) {
  if (!isLiked) {
    buttonLikeElement.classList.add('card__like-button_is-active');
  } else {
    buttonLikeElement.classList.remove('card__like-button_is-active');
  }
  buttonLikeElement.textContent = likesCount;
}