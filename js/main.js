/* ---------- Variables ---------- */
var playerFunds = 500;
var amountBet = 0;
var playerScore;
// var player = new Audio('http://www.sounddogs.com/previews/25/mp3/327118_SOUNDDOGS__ga.mp3');
// var cardPlayer = new Audio('https://www.sounddogs.com/previews/2721/mp3/464967_SOUNDDOGS__ca.mp3');
// $('.chips').on('click', playSound);
// $('.card-sound').on('click', cardSound)
$('#player-fund').html(playerFunds);

/* ---------- Event Listeners ---------- */
$('#submit-bet').click(function() {
  if (amountBet > playerFunds || amountBet === 0) {
    return $('#message').html('Check Funds')
  }
  if (playerScore > 0) {
    return;
  }
  $('#message').html('');
  for(var i=0;i<2;i++) {
    var x = Math.floor(Math.random() * deck.length);
    playerHand.push(deck[x]);
    var el = document.getElementsByClassName('player-cards')[i];
    el.classList.remove('back-blue');
    el.classList.add(cardClasses[x]);
    playerScoreTotal();
    $('#player-value').html(playerScore);
  }
  for(var i=0; i<1;i++) {
    var x = Math.floor(Math.random() * deck.length);
    dealerHand.push(deck[x]);
    var el = document.getElementsByClassName('dealer-cards')[i];
    el.classList.remove('back-red');
    el.classList.add(cardClasses[x]);
    dealerScoreTotal();
    $('#dealer-value').html(dealerScore);
  }
  if (playerScore === 21) {
    $('#message').html('BlackJack!')
    amountBet *= 1.5;
    playerFunds += amountBet;
    $('#player-fund').html(playerFunds);
    return dealerScore = undefined;
  }
});

$('#hit-button').click(function() {
  if (dealerScore === undefined) {
    return;
  }
  $('#player-card').append('<div class="card player-cards back-blue"></div>');
  var x = Math.floor(Math.random() * deck.length);
  playerHand.push(deck[x]);
  for (var i = 0; i < playerHand.length; i++)
    var el = document.getElementsByClassName('player-cards')[i];
    el.classList.remove('back-blue');
    el.classList.add(cardClasses[x]);
    playerScoreTotal();
    $('#player-value').html(playerScore);
  if (playerScore > 21) {
    $('#message').html('Bust!')
    playerFunds -= amountBet;
    $('#player-fund').html(playerFunds);
    return dealerScore = undefined;
  }
});

$('#stand-button').click(function() {
  if ((playerScore === 21) && (dealerScore === undefined)) {
    return;
  }
  while (dealerScore < 17) {
    $('#dealer-card').append('<div class="card dealer-cards back-red"></div>');
    var x = Math.floor(Math.random() * deck.length);
    dealerHand.push(deck[x]);
    for(var i=1; i<dealerHand.length; i++)
    var el = document.getElementsByClassName('dealer-cards')[i];
    el.classList.remove('back-red');
    el.classList.add(cardClasses[x]);
    dealerScoreTotal();
  }
  $('#dealer-value').html(dealerScore);
  if (dealerScore > 21) {
    playerWins();
  } else if (playerScore > dealerScore) {
    playerWins();
  } else if (playerScore < dealerScore) {
    dealerWins();
  } else if (playerScore === dealerScore) {
    $('#message').html('PUSH')
  }
});

$('#deal-again').click(function() {
  $('#player-card').children().remove();
  $('#dealer-card').children().remove();
  $('#player-card').append('<div class="card player-cards back-blue"></div>');
  $('#player-card').append('<div class="card player-cards back-blue"></div>');
  $('#dealer-card').append('<div class="card dealer-cards back-red"></div>');
  $('#dealer-card').append('<div class="card dealer-cards back-red"></div>');
  playerHand = [];
  dealerHand = [];
  $('.player-cards').attr('class', '').addClass('card player-cards back-blue');
  $('.dealer-cards').attr('class', '').addClass('card dealer-cards back-red');
  $('.display-values').html('');
  playerScore = 0;
  dealerScore = undefined;
  amountBet = 0;
  $('#counter').html(amountBet);
  if (playerFunds <= 0) {
    playerFunds = 500;
    $('#player-fund').html(playerFunds);
  }
});

/* ---------- Functions ---------- */
function switchPages(home, main, game) {
  $(home).click(function() {
    $(main).fadeOut(800, function() {
      $(game).fadeIn(800);
    });
  });
}
switchPages('#lets-play-button', '.main-page', '#game-page');
switchPages('#how-to-button', '.main-page', '#how-to-play');
switchPages('#lets-play', '#how-to-play', '#game-page');

function playerScoreTotal() {
  playerScore = 0;
  var aceCount = 0;
  playerHand.forEach(function(card) {
    aceCount += (card.val === 11) ? 1 : 0;
  });
  for (var i=0; i < playerHand.length; i++) {
    playerScore += playerHand[i].val;
  }
  while (playerScore > 21 && aceCount > 0) {
    playerScore -= 10;
    aceCount--;
  }
  return playerScore;
}

function dealerScoreTotal() {
  dealerScore = 0;
  var aceCount = 0;
  dealerHand.forEach(function(card) {
    aceCount += (card.val === 11) ? 1 :0;
  });
  for(var i=0; i < dealerHand.length; i++) {
    dealerScore += dealerHand[i].val;
  }
  while (dealerScore > 21 && aceCount > 0) {
    dealerScore -= 10;
    aceCount--;
  }
  return dealerScore;
}

function applyBet() {
  $('#player-fund').html(playerFunds);
  return dealerScore = undefined;
}

function playerWins() {
  $('#message').html('Player Wins!')
  playerFunds += amountBet;
  applyBet();
}

function dealerWins() {
  $('#message').html('Dealer Wins!')
  playerFunds -= amountBet;
  applyBet();
}

function betChips(elem, amount) {
  $(elem).click(function() {
    if (playerScore > 0){
      return;
    }
    amountBet += amount;
    $('#counter').html(amountBet);
  })
}
betChips('#bet10', 10);
betChips('#bet20', 20);
betChips('#bet50', 50);
betChips('#bet100', 100);
betChips('#bet500', 500);
$('#bet-max').click(function() {
  if (playerScore > 0){
    return;
  }
  amountBet = playerFunds;
  $('#counter').html(amountBet);
});

// function playSound() {
//   player.play();
// }

// function cardSound() {
//   cardPlayer.play();
// }

/*----------- Deck of Cards ---------*/

var cardClasses = ['sA','hA','cA','dA','s02','h02','c02','d02','s03','h03','c03','d03','s04','h04','c04','d04','s05','h05','c05','d05','s06','h06','c06','d06','s07','h07','c07','d07','s08','h08','c08','d08','s09','h09','c09','d09','s10','h10','c10','d10','sJ','hJ','cJ','dJ','sQ','hQ','cQ','dQ','sQ','hK','cK','dK'];
var suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
var vals = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
var deck = [];
var playerHand = [];
var dealerHand = [];
var Card = function(suit, val) {
  this.suit = suit
  this.val = val
}
for(var i = 0; i < vals.length; i++){
  for(var j = 0; j < suits.length; j++){
    var card = new Card(suits[j], vals[i])
    deck.push(card)
  }
}
