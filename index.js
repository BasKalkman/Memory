/*
TODO:
- Random colors per set?

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
  newCard.classList = 'card';

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

// CLICK HANDLER
function handleCardClick() {
  this.classList.add('card--clicked');

  let clickedCards = document.querySelectorAll('.card--clicked');
  if (clickedCards.length === 2) {
    // Open blocker to stop more clicks
    document.querySelector('.blocker').classList.add('blocker--on');
    // Check cards after they're visible
    setTimeout(checkMatch, 1200);
  }
}

// CARD CHECKER
function checkMatch() {
  let clickedCards = document.querySelectorAll('.card--clicked');
  //Get classlist string of icon
  let icon1 = clickedCards[0].firstChild.firstChild.firstChild.classList.toString();
  let icon2 = clickedCards[1].firstChild.firstChild.firstChild.classList.toString();

  if (icon1 === icon2) {
    // If cards match - Set completed
    clickedCards.forEach(card => {
      card.classList.add('card--completed');
      card.classList.remove('card--clicked');
      card.removeEventListener('click', handleCardClick);
    });
  } else {
    // Then remove clicked class for next pair
    clickedCards.forEach(card => card.classList.remove('card--clicked'));
  }

  // Remove blocker
  document.querySelector('.blocker').classList.remove('blocker--on');

  // Check for completion
  let cards = document.querySelectorAll('.card');
  let completedCards = document.querySelectorAll('.card--completed');

  if (cards.length === completedCards.length) {
    gameCompleted();
  }
}

// WIN HANDLER
function gameCompleted() {
  //remove listeners
  document.querySelectorAll('.card').forEach(card => {
    card.removeEventListener('click', handleCardClick);
    card.remove();
  });
  // Show success message
  //TODO: Prettier message, restart
  alert('Completed!');
}

// RESET FUNCTION
function resetGame() {
  //remove listeners
  document.querySelectorAll('.card').forEach(card => {
    card.removeEventListener('click', handleCardClick);
    card.remove();
  });
  // TODO: Do something better
  populateBoard(14);
}

// RESET Listener
document.getElementById('js-reset-button').addEventListener('click', resetGame);

// INIT
populateBoard(14);
