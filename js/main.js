/* ---------- Variables ---------- */
var playerFunds = 500;
var amountBet = 0;
var playerScore;
$('#player-fund').html(playerFunds);

/* ---------- Event Listeners ---------- */
// fadeout Initial page and fadein my Game Page
$('#lets-play-button').click(function() {
  $('.main-page').fadeOut(800, function() {
    $('#game-page').fadeIn(800);
  });
});

// fadeout Initial page and fadein How To Play
$('#how-to-button').click(function() {
  $('.main-page').fadeOut(800, function() {
    $('#how-to-play').fadeIn(800);
  });
});

// fadeout How To Play and fadein Game Page
$('#lets-play').click(function() {
  $('#how-to-play').fadeOut(800, function() {
    $('#game-page').fadeIn(800);
  });
});

// BET BUTTON: initial draw 2 cards for playerHand.
$('#submit-bet').click(function() {
  if (amountBet > playerFunds || amountBet === 0) {
    return $('#message').html('Check Funds')
  }
  if (playerScore > 0) {
    return;
  }
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
    el.classList.remove('back-blue');
    el.classList.add(cardClasses[x]);
    dealerScoreTotal();
    $('#dealer-value').html(dealerScore);
  }
  if (playerScore === 21) {
    $('#message').html('Player got BlackJack!')
    amountBet *= 1.5;
    playerFunds += amountBet;
    $('#player-fund').html(playerFunds);
    return dealerScore === undefined;
  }
});

// HIT BUTTON: adding one card per click
$('#hit-button').click(function() {
  if (dealerScore === undefined) {
    return;
  }
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

// STAND BUTTON: do everything
$('#stand-button').click(function() {
  while (dealerScore < 17) {
    var x = Math.floor(Math.random() * deck.length);
    dealerHand.push(deck[x]);
    for(var i=1; i<dealerHand.length; i++)
    var el = document.getElementsByClassName('dealer-cards')[i];
    el.classList.remove('back-blue');
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

// BETTING CHIPS: updates amountBet.
function btnClick(elem, amount) {
  $(elem).click(function() {
    amountBet += amount;
    $('#counter').html(amountBet);
  })
}
btnClick('#bet10', 10);
btnClick('#bet20', 20);
btnClick('#bet50', 50);
btnClick('#bet100', 100);
btnClick('#bet500', 500);
$('#bet-max').click(function() {
  amountBet = playerFunds;
  $('#counter').html(amountBet);
});


/* ---------- Functions ---------- */
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
  amountBet *= 2;
  playerFunds += amountBet;
  applyBet();
}

function dealerWins() {
  $('#message').html('Dealer Wins!')
  playerFunds -= amountBet;
  applyBet();
}


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

// Turn this into a function where you click the bet button and it'll do all this and you can bet right away instead of having to click reset every single time
$('#deal-again').click(function() {
  playerHand = [];
  dealerHand = [];
  $('.player-cards').attr('class', '').addClass('card player-cards back-blue');
  $('.dealer-cards').attr('class', '').addClass('card dealer-cards back-blue');
  $('.display-values').html('');
  $('#counter').html(0);
  amountBet = 0;
  playerScore = 0;
  dealerScore = undefined;
  $('#counter').html(amountBet);
  if (playerFunds === 0) {
    playerFunds = 500;
    $('#player-fund').html(playerFunds);
  }
});
