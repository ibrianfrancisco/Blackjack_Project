/* ---------- Variables ---------- */

var playerHand;
var dealerHand;
var playerFunds;
var amountBet;










/* ---------- Event Listeners ---------- */
// fadeout Initial page and fadein my Game Page
$('#letsPlayButton').click(function() {
  $('.mainPage').fadeOut(800, function() {
    $('#gamePage').fadeIn(800);
  });
})

// fadeout Initial page and fadein How To Play
$('#howToButton').click(function() {
  $('.mainPage').fadeOut(800, function() {
    $('#howToPlay').fadeIn(800);
  });
})

// fadeout How To Play and fadein Game Page
$('#letsPlay').click(function() {
  $('#howToPlay').fadeOut(800, function() {
    $('#gamePage').fadeIn(800);
  });
})

// initial draw 2 cards for playerHand. ***Need to push into playerhand empty []***
  // Try to use jQuery .each instead of for loop. But this is good for now
var drawACard = $('#PickACard').click(function() {
  for(var i=0;i<2;i++) {
    var x = Math.floor(Math.random() * 52);
    console.log(deck[x]);
  }
  return deck[x]
});

/* ---------- Functions ---------- */









/* ---------- Initial page ---------- */















// var drawACard = $('#pickACard').click(function() {
//   var x = Math.floor(Math.random() * 52)
//   console.log(deck[x]);
//   return deck[x]
// });
  // if same number comes up, draw a new number




/*----------- Deck of Cards ---------*/

var suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds']

var vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

var Card = function(suit, val) {
  this.suit = suit
  this.val = val
  this.stateValue = function(){
    return 'The ' + this.val + ' of ' + this.suit + '.'
  }
}

var deck = []

for(var i = 0; i < vals.length; i++){
  for(var j = 0; j < suits.length; j++){
    var card = new Card(suits[j], vals[i])
    deck.push(card)
  }
}

// document.getElementById('showDeck').addEventListener('click', function() {
//   console.log(deck)
//   console.log(deck.length)
// });


/*------------ Form Input for betting -----------*/
function FilterInput(event) {
    var keyCode = ('which' in event) ? event.which : event.keyCode;

    isNotWanted = (keyCode == 69 || keyCode == 101);
    return !isNotWanted;
}
function handlePaste (e) {
    var clipboardData, pastedData;

    // Get pasted data via clipboard API
    clipboardData = e.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text').toUpperCase();

    if(pastedData.indexOf('E')>-1) {
        //alert('found an E');
        e.stopPropagation();
        e.preventDefault();
    }
}


// Test this for multiple aces that come up
// if ((playerHand > 21) && (aceCount > 0)) {
//   playerHand = playerHand - aceCount * 10;
// }
