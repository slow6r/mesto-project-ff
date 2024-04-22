const config = {
  baseUrl: 'https://nomoreparties.co/v1/',
  groupName: 'wff-cohort-11',
  headers: {
    authorization: 'f3f4afc7-cc37-4d7b-aece-60b20acaf618',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
} 

export const getInitialCards = () => {
    return fetch(config.baseUrl + config.groupName + '/cards', {
      headers: {
        authorization: config.headers.authorization,
      }
    })
    .then(res => checkResponse(res));
}

export const getUser = () => {
    return fetch(config.baseUrl + config.groupName + '/users/me', {
      headers: {
        authorization: config.headers.authorization
      }
    })
    .then(res => checkResponse(res));
} 

export const setUser = (name, about) => {
  return fetch(config.baseUrl + config.groupName + '/users/me', {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
    body: JSON.stringify({
      name,
      about
    })
  })
  .then(res => checkResponse(res));
}

export const setCard = (name, link) => {
  return fetch(config.baseUrl + config.groupName + '/cards', {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
    body: JSON.stringify({
      name,
      link
    })
  })
  .then(res => checkResponse(res));
} 

export const deleteCardRequest = (id) => {
  return fetch(config.baseUrl + config.groupName + '/cards/' + id, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    }
  })
  .then(res => checkResponse(res));
}

export const setLike = (id) => {
  return fetch(config.baseUrl + config.groupName + '/cards/likes/' + id, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    }
  })
  .then(res => checkResponse(res));
} 

export const deleteLike = (id) => {
  return fetch(config.baseUrl + config.groupName + '/cards/likes/' + id, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    }
  })
  .then(res => checkResponse(res));
}
 
export const setAvatar = (src) => {
  return fetch(config.baseUrl + config.groupName + '/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
    body: JSON.stringify({
      avatar: src,
    })
  })
  .then(res => checkResponse(res));
} 