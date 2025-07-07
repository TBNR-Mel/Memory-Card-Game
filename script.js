const emojis = ['🚀', '🚀', '🪐', '🪐', '🌌', '🌌', '🌑', '🌑', '🛸', '🛸', '⭐', '⭐', '🌍', '🌍', '☄️', '☄️'];
let flippedCards = [];
let matchedCards = [];
let moves = 0;

function createBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    const shuffledEmojis = emojis.sort(() => Math.random() - 0.5);
    shuffledEmojis.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });
    // Show all cards initially
    showAllCards();
}

function showAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('flipped');
        card.textContent = card.dataset.emoji;
    });
    // Hide cards after 5 seconds
    setTimeout(hideAllCards, 5000);
}

function hideAllCards() {
    const cards = document.querySelectorAll('.card:not(.matched)');
    cards.forEach(card => {
        card.classList.remove('flipped');
        card.textContent = '';
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        card.textContent = card.dataset.emoji;
        flippedCards.push(card);
        moves++;
        document.getElementById('score').textContent = `Moves: ${moves}`;
        
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        if (matchedCards.length === emojis.length) {
            alert(`Congratulations! You won in ${moves} moves!`);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }
    flippedCards = [];
}

function resetGame() {
    flippedCards = [];
    matchedCards = [];
    moves = 0;
    document.getElementById('score').textContent = `Moves: ${moves}`;
    createBoard();
}

createBoard();