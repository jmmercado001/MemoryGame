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
var playerMoves = document.querySelector(".moves");
var playAgain = document.querySelector(".restart");
var sec = document.querySelector(".timer");
var stars = document.querySelectorAll(".fa-star");
var modal = document.getElementsByClassName('modal')[0];
var modalButton = document.querySelector('.play-again');
var closeMod = document.querySelector('.close');

let cardShowing = [];
let matchingCards = [];
var startSeconds;
var moves = 0;
let time = null;
let tickToc;


shuffle(cardDeck);
reStart();
gameStart();





//Flip cards and compares function
function clickCard(card){
	var deck = document.querySelectorAll('.card');
	deck.forEach(function(card){
	 	card.addEventListener('click', function(){
	 		if(cardShowing.length ===1){
	 			card.classList.add('open', 'show', 'duplicate');
	 			cardShowing.push(this);
	 			addMoves()
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
	 						card.classList.remove('open', 'show', 'duplicate');
	 						console.log("no match")
	 					});

	 					cardShowing =[];

	 				}, 500);
	 				
	 			}	
	 		}
	 		else {
	 			card.classList.add('open', 'show', 'duplicate');
	 			if(!time){
	 				timer();
	 			}
	 			cardShowing.push(this);
	 			
	 		};
	 	});
	 });
};



//Start game function
function gameStart(){
	//Create the deck of card
	for(let i = 0; i < cardDeck.length; i++){
		var card = document.createElement("li");
		card.classList.add("card");
		card.innerHTML = `<i class ="fa ${cardDeck[i]}"></i>`;
		cardSet.appendChild(card);
		
			
	}


	clickCard(card);


}

function rating(){
	if (moves > 8 && moves <= 14) {
    	for (i = 0; i < 3; i++) {
      		if (i > 1) {
        		stars[i].style.display = 'none';
      		}
    	}
  	}
  	else if (moves > 15) {
    	for (i = 0; i < 3; i++) {
      		if (i > 0) {
        		stars[i].style.display = 'none';
      		}
    	}
  	}

}


//timer begins
function timer() {
   	tickToc = setInterval(() => {
   		// sec.textContent= time;
   		time++;
   		showTimer();
   	}, 1000);	 	 
}

function showTimer() {
	var mins = Math.floor(time / 60);
	var seconds = time % 60;
	console.log(seconds)
	console.log(mins)
	 if (seconds < 10) {
        sec.innerHTML = mins + `:0` + seconds;
    } else {
        sec.innerHTML = mins + `:` + seconds;
    }
}


function stopTimer() {
	clearInterval(time);
	mins =0;
	seconds =0;
	

}

//Game over function
function gameOver(){
	if(matchingCards.length === cardDeck.length){
		youWon();
		console.log("you win");
		console.log(moves);
		
	}

}




//Player win function
function youWon(){
	// modal.classList.add("show"); //MODAL********
	// stopTimer();
	openModal();
	closeModal();
}


function openModal(){

	modal.style.display = 'block';
	// let starRating = document.querySelector('.stars').innerHTML;
	var modMoves = document.querySelector('.total-moves');
	// var modRate = document.getElementsByClassName('total-rating');
	var modTime = document.querySelector('.total-time');

	modMoves.innerHTML = moves;
	modTime.innerHTML = seconds;
	// modTime.innerHTML =  mins + `:` + seconds;
	
	
}





//restarts game when restart arrow clicked
function reStart(){
	playAgain.addEventListener('click', function(){
		stopTimer();
		gameReset();
		gameStart();
		console.log("restart");
	});
};
///adds moves function
function addMoves() {
	moves++
	playerMoves.innerHTML = moves;
	rating();
}




// Calls reset() function (hides modal and restarts game) with user clicks "play again" button in modal
modalButton.addEventListener('click', reset);
closeMod.addEventListener('click', closeModal);


// Closes MODAL ******* upon clicking its close icon
function closeModal() {
    // gameReset();
    modal.style.display = 'none';
  
}

// MODAL ***********Called when user hits "play again" button
function reset() {
  gameReset();
  modal.style.display = 'none';
  gameStart();
}

function gameReset(){
	cardSet.innerHTML = "";
	matchingCards = [];
	moves = 0;
	time =0;
	playerMoves.innerHTML = null;
	stars[1].style.display = '';
	stars[2].style.display = '';
}
//JUNE ABOVE




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


