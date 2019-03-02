/*
TODO:
CHECK- Create card 
CHECK- Create Set of chosen icons
- Random colors per set?
CHECK- Populate board
CHECK- Add listeners

- Click handler for cards (card--clicked)
- Check if 2 cards match
- Remove cards from board if match / Return to position if not card--completed

- Reset button functionality
---- remove listeners, remove cards, re-populate

Number of cards per screen size
small: 14
medium: 20
large: 28
*/

// COLORS
const colors = ['red', 'blue', 'purple', 'cyan', 'yellow', 'green'];

// FONT-AWESOME ICON CLASSES
const icons = [
  'fa-adobe',
  'fa-angular',
  'fa-android',
  'fa-amazon',
  'fa-bluetooth',
  'fa-bitcoin',
  'fa-creative-commons',
  'fa-docker',
  'fa-discord',
  'fa-edge',
  'fa-facebook',
  'fa-font-awesome-flag',
  'fa-github',
  'fa-google',
  'fa-html5',
  'fa-linkedin',
  'fa-napster',
  'fa-microsoft',
  'fa-nintendo-switch',
  'fa-node-js',
  'fa-npm',
  'fa-paypal',
  'fa-react',
  'fa-reddit-alien',
  'fa-sass',
  'fa-stack-overflow',
  'fa-spotify',
  'fa-steam',
  'fa-twitch',
  'fa-twitter',
  'fa-usb',
  'fa-whatsapp'
];

// CREATE SET
const createIconSet = num => {
  // Create a Set of icons to use for the game. Set allows only unique entries.
  let set = new Set();

  while (set.size < num) {
    let randArrItem = icons[Math.floor(Math.random() * icons.length)];
    set.add(randArrItem);
  }

  return set;
};

// CREATE CARD
const createCard = iconName => {
  let newCard = document.createElement('div');
  // TODO: Not clicked
  newCard.classList = 'card card--clicked';

  // Front face
  let frontCard = document.createElement('div');
  frontCard.classList = 'card__side card__side--front';

  // Icon span
  let iconSpan = document.createElement('span');
  iconSpan.classList = 'card__icon';

  //Icon
  let icon = document.createElement('i');
  icon.classList = 'fab';
  icon.classList.add(iconName);

  iconSpan.appendChild(icon);
  frontCard.appendChild(iconSpan);

  // Back face
  let backCard = document.createElement('div');
  backCard.classList = 'card__side card__side--back';

  // Append to parent
  newCard.appendChild(frontCard);
  newCard.appendChild(backCard);

  return newCard;
};

// TODO: Change hardcoded num of cards
const populateBoard = num => {
  // Create set of icons, push two of each in the set to array
  let useIcons = createIconSet(num);
  let cardArray = [];

  useIcons.forEach(icon => {
    cardArray.push(createCard(icon));
    cardArray.push(createCard(icon));
  });

  // Shuffle created array
  for (let i = cardArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    let temp = cardArray[i];
    cardArray[i] = cardArray[j];
    cardArray[j] = temp;
  }

  // Populate board with created cards
  cardArray.forEach(card => document.getElementsByClassName('game')[0].appendChild(card));

  // Set listeners
  let allCards = document.querySelectorAll('.card');
  allCards.forEach(card => {
    card.addEventListener('click', handleCardClick);
  });
};
populateBoard(14);

// CLICK HANDLER
function handleCardClick() {
  /*
  - Previously clicked card?
  -- Yes: Is it the same card?
  --- Yes: Completed cards
      ===> FUNCTION check for completed board
  --- No: Reset to unclicked

  -- No: Set clicked card
  */
}
