/* ---------- Variables ---------- */












/* ---------- Event Listeners ---------- */














/* ---------- Functions ---------- */

function showHowToPlay() {
  $('.renderGame').fadeOut(1000);
}




/* ---------- Initial page ---------- */

$('.renderGame').on('click', showHowToPlay)


















/*----------- Deck of Cards ---------*/

var suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds']

var vals = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']

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
// function FilterInput(event) {
//     var keyCode = ('which' in event) ? event.which : event.keyCode;

//     isNotWanted = (keyCode == 69 || keyCode == 101);
//     return !isNotWanted;
// }
// function handlePaste (e) {
//     var clipboardData, pastedData;

//     // Get pasted data via clipboard API
//     clipboardData = e.clipboardData || window.clipboardData;
//     pastedData = clipboardData.getData('Text').toUpperCase();

//     if(pastedData.indexOf('E')>-1) {
//         //alert('found an E');
//         e.stopPropagation();
//         e.preventDefault();
//     }
// }


// Test this for multiple aces that come up
// if ((playerHand > 21) && (aceCount > 0)) {
//   playerHand = playerHand - aceCount * 10;
// }
