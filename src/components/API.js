const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
  headers: {
    authorization: '057a0cd0-df24-4b23-bc22-15d0fc3e8710',
    'Content-Type': 'application/json'
  },
  endpointUser: 'users/me',
  endpointCards: 'cards',
  endpointLike: 'cards/likes',
  endpointAvatar: 'users/me/avatar',
  methodGet: 'GET',
  methodPost: 'POST',
  methodPatch: 'PATCH',
  methodPut: 'PUT',
  methodDelete: 'DELETE'
};


const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const sendRequest = (endpoint, options) => {
return fetch(`${config.baseUrl}/${endpoint}`, options)
  .then(checkResponse);
};

export const getUserInfoApi = () => {
return sendRequest(config.endpointUser, {
  method: config.methodGet,
  headers: config.headers
}); 
};

export const updateUserInfoApi = (userName, userAbout) => {
return sendRequest(config.endpointUser, {
  method: config.methodPatch,
  headers: config.headers,
  body: JSON.stringify({
    name: userName,
    about: userAbout
  })
}); 
};

export const updateUserAvatarApi = (userAvatarLink) => {
return sendRequest(config.endpointAvatar, {
  method: config.methodPatch,
  headers: config.headers,
  body: JSON.stringify({
    avatar: userAvatarLink
  })
}); 
};

export const getInitialCardsApi = () => {
return sendRequest(config.endpointCards, {
  method: config.methodGet,
  headers: config.headers
  }); 
};

export const addNewCardApi = (cardName, cardlink) => {
return sendRequest(config.endpointCards, {
  method: config.methodPost,
  headers: config.headers,
  body: JSON.stringify({
    name: cardName,
    link: cardlink
  })
}); 
};

export const deleteCardApi = (cardId) => {
return sendRequest(`${config.endpointCards}/${cardId}`, {
  method: config.methodDelete,
  headers: config.headers
}); 
};

export const addLikeCardApi = (cardId) => {
return sendRequest(`${config.endpointLike}/${cardId}`, {
  method: config.methodPut,
  headers: config.headers
}); 
};

export const deleteLikeCardApi = (cardId) => {
return sendRequest(`${config.endpointLike}/${cardId}`, {
  method: config.methodDelete,
  headers: config.headers
}); 
};