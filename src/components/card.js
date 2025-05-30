import { addLikeCardApi, deleteLikeCardApi } from './api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(element, deleteCardConfirmation, likeCard, openPreviewImage, userId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');
    const cardOwnerId = element.owner._id;
    const cardId = element._id;
  
    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardTitle.textContent = element.name;

    const ownerSetLike = element.likes.some(likes => likes._id === userId);
    cardLikeCounter.textContent = element.likes.length;

    if(userId !== cardOwnerId) {
        cardDeleteButton.style.display = 'none';  // Скрыть кнопку удаления, если карточка не принадлежит текущему пользователю
    } else {
        cardDeleteButton.addEventListener('click', () => deleteCardConfirmation(cardId, cardElement));
    }

    if (ownerSetLike) {
        cardLikeButton.classList.toggle('card__like-button_is-active');
    }

    cardLikeButton.addEventListener('click', (evt) => likeCard(evt, cardId, cardLikeCounter));
    cardImage.addEventListener('click', () => openPreviewImage(element.link, element.name));

    return cardElement;
}

// Функция лайка карточки
export function likeCard(evt, cardId, cardLikeCounter) {
    const likeMethod = evt.target.classList.contains('card__like-button_is-active') ? deleteLikeCardApi : addLikeCardApi;
    likeMethod(cardId)
        .then((res) => {
            cardLikeCounter.textContent = res.likes.length;
            evt.target.classList.toggle('card__like-button_is-active');
        })
        .catch(err => console.log(err));
};
