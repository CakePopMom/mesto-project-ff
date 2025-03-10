const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, onDelete) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
    onDelete(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

const placesList = document.querySelector('.places__list');

initialCards.forEach((cardData)=> {
  const card = createCard(cardData, deleteCard);
  placesList.append(card);
});
