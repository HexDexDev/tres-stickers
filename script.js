document.addEventListener('DOMContentLoaded', () => {
    const images = ['image1.png', 'image2.png', 'image3.png'];
    const gameBoard = document.getElementById('game-board');
    const restartBtn = document.getElementById('restart-btn');
    let firstCard, secondCard;
    let lockBoard = false;

    function createCards() {
        const cardsArray = [...images, ...images];
        cardsArray.sort(() => 0.5 - Math.random());

        cardsArray.forEach(image => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.image = image;

            const img = document.createElement('img');
            img.src = image;
            card.appendChild(img);

            card.addEventListener('click', flipCard);

            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.image === secondCard.dataset.image;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    function restartGame() {
        gameBoard.innerHTML = '';
        createCards();
        resetBoard();
    }

    restartBtn.addEventListener('click', restartGame);

    createCards();
});