// BlackJack

let cards = []
let sum
let hasBlackJack = false
let isAlive = false
let message = ""

//DOM Elements
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
//Buttons
let startBtn = document.getElementById("start")
let resetBtn = document.getElementById("resetBtn")
let newBtn = document.getElementById("newBtn")

let playerEl = document.getElementById("player-el")


// Player Object
let player = {
    name: "Player 1",
    chips: 100
}

function getRandomCard(){
  let card =  Math.floor(Math.random() * 13) + 1
  if(card === 1){
      return 1
  }
  else if(card >= 11){
      return 10
  }
  else{
      return card
  }
}

//Randomly generates the first two cards, prints the players chips to the screen
function startGame() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    playerEl.textContent = player.name + ": $" + player.chips
    renderGame()
}

// Resets hand and game board
function reset() {
    resetBtn.style.display = "none"
    cards = []
    cardsEl.textContent = "Cards: "
    hasBlackJack = false
    startGame()
}

// Updates the chips on the screen
function updateChips() {
    playerEl.textContent = player.name + ": $" + player.chips
}

function renderGame() {
    //Hide start button while in game
    startBtn.style.display = "none"
    newBtn.style.display = "inline-block"

    // Prints all cards in hand
    cardsEl.textContent = "Cards: "
    for(let i = 0; i < cards.length; i++){
        cardsEl.textContent += cards[i] + ", "
    }
    sumEl.textContent = "Sum: " + sum

    
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    }
    //Cases for win/loss
    else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        player.chips += 100;
        updateChips()
        newBtn.style.display = "none"
        resetBtn.style.display = "inline-block"
        resetBtn.textContent = "PLAY AGAIN?"
    } else {
        message = "You're out of the game!"
        isAlive = false
        player.chips -= 25;
        updateChips()
        // If player is out of money, they cannot play again
        if (player.chips == 0) {
            message = "You are all out of money. Refresh to play again"
            newBtn.style.display = "none"
        }else{
            newBtn.style.display = "none"
            resetBtn.style.display = "inline-block"
            resetBtn.textContent = "PLAY AGAIN?"
        }
        
    }
    messageEl.textContent = message
}

function newCard() {
    if(isAlive == true && hasBlackJack == false){
        let card = getRandomCard()
        sum += card
        cards.push(card)
        console.log(cards)
        renderGame()
    }



}
