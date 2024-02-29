function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', pressEsc);
};
  
function closePopup(popup) {
    document.removeEventListener('keydown', pressEsc);
    popup.classList.remove('popup_is-opened');
};

function pressEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    };
};

export {openPopup, closePopup};