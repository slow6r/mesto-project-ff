// @todo: Экспортируемые функции
export {openModal, closeModal, handleCloseByClick, handleCloseByEsc, setCloseModalOnClickListeners};

// @todo: Функция открытия popup
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleCloseByEsc);
};

// @todo: Функция закрытия popup
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleCloseByEsc);
};

function handleCloseByEsc(evt) {
  const popup = document.querySelector('.popup_is-opened')
  if (evt.key === 'Escape') {
    closeModal(popup);
  }
};

function handleCloseByClick(evt) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
    closeModal(evt.currentTarget);
  };
}

// Устанавливаем обрабочик OnClick на popup
function setCloseModalOnClickListeners(popups) {
  popups.forEach((popup) => {
    popup.addEventListener('click', handleCloseByClick)
  })
}