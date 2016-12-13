/* ---------- Variables ---------- */
var playerFunds = 500;
var amountBet = 0;
$("#playerFund").html(playerFunds);

/* ---------- Event Listeners ---------- */
// fadeout Initial page and fadein my Game Page
$("#letsPlayButton").click(function() {
  $(".mainPage").fadeOut(800, function() {
    $("#gamePage").fadeIn(800);
  });
});

// fadeout Initial page and fadein How To Play
$("#howToButton").click(function() {
  $(".mainPage").fadeOut(800, function() {
    $("#howToPlay").fadeIn(800);
  });
});

// fadeout How To Play and fadein Game Page
$("#letsPlay").click(function() {
  $("#howToPlay").fadeOut(800, function() {
    $("#gamePage").fadeIn(800);
  });
});


// BET BUTTON: initial draw 2 cards for playerHand.
$("#submitBet").click(function() {
  for(var i=0;i<2;i++) {
    var x = Math.floor(Math.random() * 52);
    playerHand.push(deck[x]);
    var el = document.getElementsByClassName('playerCards')[i];
    el.classList.add(cardClasses[x]);
    playerScoreTotal();
    $("#playerValue").html(playerScore);
  }
  for(var i=0; i<1;i++) {
    var x = Math.floor(Math.random() * 52);
    dealerHand.push(deck[x]);
    var el = document.getElementsByClassName('dealerCards')[i];
    el.classList.add(cardClasses[x]);
    dealerScoreTotal();
    $("#dealerValue").html(dealerScore);
  }
});


// HIT BUTTON: adding one card per click
$("#hitButton").click(function() {
  var x = Math.floor(Math.random() * 52);
  playerHand.push(deck[x]);
  for (var i = 0; i < playerHand.length; i++)
    var el = document.getElementsByClassName('playerCards')[i];
    el.classList.add(cardClasses[x]);
    playerScoreTotal();
    $("#playerValue").html(playerScore);
  if (playerScore > 21) {
    alert("Player Bust");
  }
});

// STAND BUTTON: do everything
$("#standButton").click(function() {
  while (dealerScore < 17) {
    var x = Math.floor(Math.random() * 52);
    dealerHand.push(deck[x]);
    for(var i=1; i<dealerHand.length; i++)
    var el = document.getElementsByClassName('dealerCards')[i];
    el.classList.add(cardClasses[x]);
    dealerScoreTotal();
  }
  $("#dealerValue").html(dealerScore);
  // if (dealerScore < 17) {
  //   dealerHand.push(deck[x]);
  // }
  if (dealerScore > 21) {
    alert("Player WINS");
  } else if (playerScore > dealerScore) {
    alert("Player WINS");
  } else if (playerScore < dealerScore) {
    alert("Dealer WINS");
  } else if (playerScore === dealerScore) {
    alert("PUSH");
  }
});


// BETTING CHIPS: updates amountBet.
$("#bet5").click(function() {
  amountBet += 5;
  $("#counter").html(amountBet);
});
$("#bet10").click(function() {
  amountBet += 10;
  $("#counter").html(amountBet);
});
$("#bet20").click(function() {
  amountBet += 20;
  $("#counter").html(amountBet);
});
$("#bet50").click(function() {
  amountBet += 50;
  $("#counter").html(amountBet);
});
$("#bet100").click(function() {
  amountBet += 100;
  $("#counter").html(amountBet);
});
$(".erase").click(function() {
  amountBet = 0;
  $("#counter").html(amountBet);
});

/* ---------- Functions ---------- */

// function to add amountBet to bet button
// function saveBet() {
// }


// chris's keeping tabs on score total function
// function playerScoreTotal() {
//  playerScore = 0;
//  var aceCount = 0;
//  playerHand.forEach(function(card) {
//    aceCount += (card.val === 'Ace') ? 1 : 0;
//  });
// //  for (var i = 0; i < playerHand.length; i++) {
//    playerScore += getCardValue(playerHand[i]);
//  }
//  while (playerScore > 21 && aceCount) {
//    playerScore -= 10;
//    aceCount--;
//  }
//  return playerScore;
// }

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
  for(var i=0; i < dealerHand.length; i++) {
    dealerScore += dealerHand[i].val;
  }
  return dealerScore;
}

/* ---------- Game page ---------- */

// BETTING WIN/LOSS MATH:
//
// function adjustBet() {
//   if(player > dealer) {
//     amountBet *= 2
//     playerFunds += amountBet
//     amountBet = 0
//   }
// } else if (player < dealer)


/*----------- Deck of Cards ---------*/

var cardClasses = ['sA','hA','cA','dA','s02','h02','c02','d02','s03','h03','c03','d03','s04','h04','c04','d04','s05','h05','c05','d05','s06','h06','c06','d06','s07','h07','c07','d07','s08','h08','c08','d08','s09','h09','c09','d09','s10','h10','c10','d10','sJ','hJ','cJ','dJ','sQ','hQ','cQ','dQ','sQ','hK','cK','dK'];

var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
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


// Test this for multiple aces that come up
// function aces() {
// if ((playerScore > 21) && (aceCount > 0)) {
//   playerHand = playerHand - aceCount * 10;
//   }
// }
