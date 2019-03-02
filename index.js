/*
TODO:
CHECK- Create card 
CHECK- Create Set of chosen icons
- Random colors per set?
- Populate board

- Click handler for cards (card--clicked)
- Check if 2 cards match
- Remove cards from board if match / Return to position if not card--completed
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
  let set = new Set();

  while (set.size < num) {
    let randArrItem = icons[Math.floor(Math.random() * icons.length)];
    set.add(randArrItem);
  }

  return set;
};

// CREATE CARD
const createCard = () => {
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
  icon.classList = 'fab fa-amazon';

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

// TODO: Remove
createCard();
document.getElementsByClassName('game')[0].appendChild(createCard());
