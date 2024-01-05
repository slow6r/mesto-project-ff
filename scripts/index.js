// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const plasesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function cardAdd(name, link, deleteCard) {
    const card = cardTemplate.querySelector(".card").cloneNode(true);
    card.querySelector(".card__title").textContent = name;
    card.querySelector(".card__image").src = link;
    card.querySelector(".card__image").alt = name;
    card.querySelector(".card__delete-button").addEventListener("click", deleteCard);
    return card;
}

// @todo: Функция удаления карточки

function deleteCard(evt){
    const cardItem = evt.target.closest('.places__item');
    cardItem.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(item => 
    plasesList.append(cardAdd(item.name, item.link, deleteCard))); 



