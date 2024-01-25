
let deckId = '';

document.querySelector('button').addEventListener('click',cardGame)



fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
			.then(res => res.json()) // parse response as JSON
			.then(data => {
				
				deckId = data.deck_id;
				}
				
			)
			.catch(err => {
					console.log(`error ${err}`)
			});


function cardGame(){
	fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
			.then(res => res.json()) // parse response as JSON
			.then(data => {
				
				console.log(data);
				document.querySelector('#player1').src = data.cards[0].image;
				document.querySelector('#player2').src = data.cards[1].image;
				let player1Val = convertToNumericalVal(data.cards[0].value);
				let player2Val = convertToNumericalVal(data.cards[1].value);
				if(player1Val > player2Val){
					document.querySelector('.result').innerHTML = 'Player 1 Won!';
				}else if(player1Val < player2Val){
					document.querySelector('.result').innerHTML = 'Player 2 Won!';
				}else{
					document.querySelector('.result').innerHTML= 'WARRRR!!';
				}
			}
			)
			.catch(err => {
					console.log(`error ${err}`)
			});


}

				
function convertToNumericalVal(val){
	if(val === 'ACE'){
		return 1;
	}else if(val === 'KING'){
		return 13;
	}else if(val === 'QUEEN'){
		return 12;
	}else if(val === 'JACK'){
		return 11;
	}else {
		return Number(val);
	}
}