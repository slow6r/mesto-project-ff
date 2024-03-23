const auth = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "6bcb6b14-afdf-4792-a847-ddwfsdfw0244c4232",
    "Content-Type": "application/json",
  },
};

//универсальная проверка и сообщение об ошибке
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

const getUserData = () => {
  return fetch(`${auth.baseUrl}/users/me`, {
    method: "GET",
    headers: auth.headers,
  }).then(checkResponse);
};

const getInitialCards = () => {
  return fetch(`${auth.baseUrl}/cards`, {
    method: "GET",
    headers: auth.headers,
  }).then(checkResponse);
};

const getNewCard = (name, link) => {
  return fetch(`${auth.baseUrl}/cards`, {
    method: "POST",
    headers: auth.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
};

const updateProfileInfo = (name, about) => {
  return fetch(`${auth.baseUrl}/users/me`, {
    method: "PATCH",
    headers: auth.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResponse);
};

const removeCard = (cardId) => {
  return fetch(`${auth.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: auth.headers,
  }).then(checkResponse);
};

const showLike = (cardId) => {
  return fetch(`${auth.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: auth.headers,
  }).then(checkResponse);
};

const hideLike = (cardId) => {
  return fetch(`${auth.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: auth.headers,
  }).then(checkResponse);
};

const changeProfilePic = (url) => {
  return fetch(`${auth.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: auth.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(checkResponse);
};

export {
  getUserData,
  getInitialCards,
  getNewCard,
  updateProfileInfo,
  changeProfilePic,
  showLike,
  hideLike,
  removeCard,
};
