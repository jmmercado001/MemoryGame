/*
 * Create a list that holds all of your cards
 */
var cardDeck = ["fa-diamond","fa-diamond",
				"fa-paper-plane-o", "fa-paper-plane-o",
				"fa-anchor", "fa-anchor",
				"fa-bolt", "fa-bolt",
				"fa-cube", "fa-cube",
				"fa-leaf", "fa-leaf",
				"fa-bicycle", "fa-bicycle",
				"fa-bomb", "fa-bomb"];

//test!!!


var cardSet = document.querySelector(".deck");
var playerMoves = document.querySelector(".moves")

//Create array for cards flipped over
let cardShowing = [];
let matchingCards = [];
let counter = 0;
let moves = 0;



//Create the deck of card
for(let i = 0; i < cardDeck.length; i++){
	var card = document.createElement("li");
	card.classList.add("card");
	card.innerHTML = `<i class ="fa ${cardDeck[i]}"></i>`;
	cardSet.appendChild(card);
	//shuffle(cardDeck);


}
clickCard(card);


//timer begins
var count = 0;
function timer(){
   var sec = document.querySelector(".timer");
   count++;
   sec.textContent= count;
   console.log(count);
}

card.addEventListener('click', function(){
	this.setTimeout(function(){
		timer();
	}, 1000);
});	



function clickCard(card){
	var deck = document.querySelectorAll('.card');
	deck.forEach(function(card){
	 	card.addEventListener('click', function(){
	 		if(cardShowing.length ===1){
	 			card.classList.add('open', 'show');
	 			cardShowing.push(this);
	 			counter++;
	 			if(this.innerHTML === cardShowing[0].innerHTML){
	 				this.classList.add("match");
	 				cardShowing[0].classList.add("match");
	 				matchingCards.push(this);
	 				matchingCards.push(cardShowing[0]);
	 				cardShowing =[];
	 				gameOver();
	 			}
	 			else {
	 				setTimeout(function(){
	 					cardShowing.forEach(function(card) {
	 					// this.classList.remove('open', 'show');
	 					// cardShowing[0].classList.remove('open', 'show');
	 						card.classList.remove('open', 'show');
	 						console.log("no match")
	 					});

	 					cardShowing =[];

	 				}, 1000);
	 				
	 			}	
	 		}
	 		else {

	 			card.classList.add('open', 'show');
	 			cardShowing.push(this);
	 			counter++;
	 		}

	 		moves = counter/2;
			playerMoves.innerHTML = moves;
	 	});
	 });
	}


function gameOver(){
	if(matchingCards.length === cardDeck.length){
		youWon();
		console.log("you win");
		console.log(counter);
		console.log(moves);
		console.log(clearInterval(count));
	}

}

function youWon(){
	alert("Great Job you won and it took " + (moves +.5) +" moves.");
}

// card.addEventListener('click', function() {
// 	 		time++;
// 			console.log(time);
// 	};



 // function clearTimer(){
 // 	clearInterval(time);
 // }
	




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


