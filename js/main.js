/* ---------- Variables ---------- */












/* ---------- Event Listeners ---------- */














/* ---------- Functions ---------- */





/* ---------- Initial page ---------- */
$howToPlay = $('button')


$howToPlay.on('click', showHowToPlay)

function showHowToPlay() {
  $howToPlay.fadeOut(2000)
}













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
