const header = document.querySelector("header");
      const hamburgerBtn = document.querySelector("#hamburger-btn");
      const closeMenuBtn = document.querySelector("#close-menu-btn");

      // Toggle mobile menu on hamburger button click
      hamburgerBtn.addEventListener("click", () => header.classList.toggle("show-mobile-menu"));

      // Close mobile menu on close button click
      closeMenuBtn.addEventListener("click", () => hamburgerBtn.click());
      // listing vars here so they're in the global scope
var cards, nCards, cover, openContent, openContentText, pageIsOpen = false,
    openContentImage, closeContent, windowWidth, windowHeight, currentCard;

// initiate the process
init();

function init() {
  resize();
  selectElements();
  attachListeners();
}

// select all the elements in the DOM that are going to be used
function selectElements() {
  cards = document.getElementsByClassName('card'),
  nCards = cards.length,
  cover = document.getElementById('cover'),
  openContent = document.getElementById('open-content'),
  openContentText = document.getElementById('open-content-text'),
  openContentImage = document.getElementById('open-content-image')
  closeContent = document.getElementById('close-content');
}

/* Attaching three event listeners here:
  - a click event listener for each card
  - a click event listener to the close button
  - a resize event listener on the window
*/
function attachListeners() {
  for (var i = 0; i < nCards; i++) {
    attachListenerToCard(i);
  }
  closeContent.addEventListener('click', onCloseClick);
  window.addEventListener('resize', resize);
}

function attachListenerToCard(i) {
  cards[i].addEventListener('click', function(e) {
    var card = getCardElement(e.target);
    onCardClick(card, i);
  })
}

/* When a card is clicked */
function onCardClick(card, i) {
  // set the current card
  currentCard = card;
  // add the 'clicked' class to the card, so it animates out
  currentCard.className += ' clicked';
  // animate the card 'cover' after a 500ms delay
  setTimeout(function() {animateCoverUp(currentCard)}, 500);
  // animate out the other cards
  animateOtherCards(currentCard, true);
  // add the open class to the page content
  openContent.className += ' open';
}

// Define text content for each card
var testTrainingText = '<p>I testträningen kommer vi kolla på spelarens kvalitéer och utvecklingsområden. Vi kommer även ha en dialog med spelaren om hur vi ska lägga upp en plan för spelarens utveckling framöver. Det ger även spelaren möjligheten att träffa på nya vänner och känna på vår verksamhet.</p>';

var pricingText = '<p>Fotbollsklubbsmedlemskap:</p>' +
                  '<ul>' +
                  '<li><strong>Testträning:</strong> Avgift: 200 kr</li>' +
                  '<li><strong>Medlemskap 1:</strong> Avgift: 399 kr </li>' +
                  '<li><strong>Medlemskap 2:</strong> Avgift: 1499 kr per månad (minst 3 månaders åtagande)</li>' +
                  '<li><strong>Medlemskap 3:</strong> Avgift: 3499 kr </li>' +
                  '</ul>';

var cupsText = '<p>Just nu hålls inga cup-evenemang</p>';

var campsText = '<p>Sommarcamper med Fotbollsutveckling på Skuru IP!<br>' +
                'När?<br>' +
                'V.24-13-14 juni - (torsdag-fredag) - 900 kr/pp<br>' +
                '• V.25 -17-20 juni - (måndag-torsdag) - 1600 kr/pp<br>' +
                '• V.26-20-24 juni - (måndag-torsdag) - 1600 kr/pp</p>';



// Modify the animateCoverUp function to use the respective text content for each card
function animateCoverUp(card) {
  var cardPosition = card.getBoundingClientRect();
  var cardStyle = getComputedStyle(card);
  setCoverPosition(cardPosition);
  setCoverColor(cardStyle);
  scaleCoverToFillWindow(cardPosition);
  
  // Update the content of the opened page based on the card clicked
  if (card.classList.contains('card-color-0')) {
    openContentText.innerHTML = '<h1>' + card.children[2].textContent + '</h1>' + testTrainingText;
  } else if (card.classList.contains('card-color-2')) {
    openContentText.innerHTML = '<h1>' + card.children[2].textContent + '</h1>' + pricingText;
  } else if (card.classList.contains('card-color-1')) {
    openContentText.innerHTML = '<h1>' + card.children[2].textContent + '</h1>' + cupsText;
  } else if (card.classList.contains('card-color-3')) {
    openContentText.innerHTML = '<h1>' + card.children[2].textContent + '</h1>' + campsText;
  }
  
  openContentImage.src = card.children[1].src;
  setTimeout(function() {
    window.scroll(0, 0);
    pageIsOpen = true;
  }, 300);
}

function animateCoverBack(card) {
  var cardPosition = card.getBoundingClientRect();
  // the original card may be in a different position, because of scrolling, so the cover position needs to be reset before scaling back down
  setCoverPosition(cardPosition);
  scaleCoverToFillWindow(cardPosition);
  // animate scale back to the card size and position
  cover.style.transform = 'scaleX('+1+') scaleY('+1+') translate3d('+(0)+'px, '+(0)+'px, 0px)';
  setTimeout(function() {
    // set content back to empty
    openContentText.innerHTML = '';
    openContentImage.src = '';
    // style the cover to 0x0 so it is hidden
    cover.style.width = '0px';
    cover.style.height = '0px';
    pageIsOpen = false;
    // remove the clicked class so the card animates back in
    currentCard.className = currentCard.className.replace(' clicked', '');
  }, 301);
}

function setCoverPosition(cardPosition) {
  // style the cover so it is in exactly the same position as the card
  cover.style.left = cardPosition.left + 'px';
  cover.style.top = cardPosition.top + 'px';
  cover.style.width = cardPosition.width + 'px';
  cover.style.height = cardPosition.height + 'px';
}

function setCoverColor(cardStyle) {
  // style the cover to be the same color as the card
  cover.style.backgroundColor = cardStyle.backgroundColor;
}

function scaleCoverToFillWindow(cardPosition) {
  // calculate the scale and position for the card to fill the page,
  var scaleX = windowWidth / cardPosition.width;
  var scaleY = windowHeight / cardPosition.height;
  var offsetX = (windowWidth / 2 - cardPosition.width / 2 - cardPosition.left) / scaleX;
  var offsetY = (windowHeight / 2 - cardPosition.height / 2 - cardPosition.top) / scaleY;
  // set the transform on the cover - it will animate because of the transition set on it in the CSS
  cover.style.transform = 'scaleX('+scaleX+') scaleY('+scaleY+') translate3d('+(offsetX)+'px, '+(offsetY)+'px, 0px)';
}

/* When the close is clicked */
function onCloseClick() {
  // remove the open class so the page content animates out
  openContent.className = openContent.className.replace(' open', '');
  // animate the cover back to the original position card and size
  animateCoverBack(currentCard);
  // animate in other cards
  animateOtherCards(currentCard, false);
}

function animateOtherCards(card, out) {
  var delay = 100;
  for (var i = 0; i < nCards; i++) {
    // animate cards on a stagger, 1 each 100ms
    if (cards[i] === card) continue;
    if (out) animateOutCard(cards[i], delay);
    else animateInCard(cards[i], delay);
    delay += 100;
  }
}

// animations on individual cards (by adding/removing card names)
function animateOutCard(card, delay) {
  setTimeout(function() {
    card.className += ' out';
   }, delay);
}

function animateInCard(card, delay) {
  setTimeout(function() {
    card.className = card.className.replace(' out', '');
  }, delay);
}

// this function searches up the DOM tree until it reaches the card element that has been clicked
function getCardElement(el) {
  if (el.className.indexOf('card ') > -1) return el;
  else return getCardElement(el.parentElement);
}

// resize function - records the window width and height
function resize() {
  if (pageIsOpen) {
    // update position of cover
    var cardPosition = currentCard.getBoundingClientRect();
    setCoverPosition(cardPosition);
    scaleCoverToFillWindow(cardPosition);
  }
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}
document.addEventListener("DOMContentLoaded", function() {
  // Get the "Booka nu" button element
  var bookNowButton = document.getElementById("book-now-btn");

  // Add click event listener to the button
  bookNowButton.addEventListener("click", function() {
      // Redirect the user to the contact.html page
      window.location.href = "contact.html";
  });
});
document.addEventListener('DOMContentLoaded', function() {
  var video = document.querySelector('.background-video');
  video.controls = false;
});
