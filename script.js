document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDiv = document.querySelector('.status');
    const resetBtn = document.querySelector('.reset-btn');
    const scoreItems = document.querySelectorAll('.score-item .score');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const score = {
        X: 0,
        O: 0,
        draw: 0
    };

    resetGame();

    cells.forEach(cell => cell.addEventListener('click', handleCellClick, { once: true }));

    resetBtn.addEventListener('click', () => {
        if (board.every(value => value === '')) {
            resetScore();
        }
        resetGame();
    });

    function handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        if (board[cellIndex] !== '' || !gameActive) return;
        
        board[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        
        if (checkVictory()) {
            return; // Game is over, don't continue
        }
        
        if (checkDraw()) {
            return; // Game is over, don't continue
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDiv.textContent = `${currentPlayer} turn`;
    }

    function checkVictory() {
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                statusDiv.textContent = `Player ${board[a]} wins!`;
                gameActive = false;
                score[board[a]]++;
                scoreItems[board[a] === 'X' ? 0 : 2].textContent = score[board[a]];
                styledAlert(`Player ${board[a]} wins!`);
                return true;
            }
        }
        return false;
    }
    
    function checkDraw() {
        if (!board.includes('') && gameActive) {
            score.draw++;
            scoreItems[1].textContent = score.draw;
            statusDiv.textContent = 'The game is a draw!';
            gameActive = false;
            alert('Game ended in a Draw!');
            return true;
        }
        return false;
    }

    function resetScore() {
        score.X = parseInt(scoreItems[0].textContent);
        score.O = parseInt(scoreItems[2].textContent);
        score.draw = parseInt(scoreItems[1].textContent);

        scoreItems.forEach(item => item.textContent = 0);
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
        cell.textContent = '';
            // Remove old event listener and add new one
            cell.removeEventListener('click', handleCellClick);
            cell.addEventListener('click', handleCellClick, { once: true });
    });
    statusDiv.textContent = `${currentPlayer} turn`;
    gameActive = true;
    }
});



function styledAlert(message) {
    let alertBox = document.createElement("div");
    alertBox.innerText = message;
    alertBox.style.position = "fixed";
    alertBox.style.top = "10px";
    alertBox.style.left = "50%";
    alertBox.style.transform = "translateX(-50%)";
    alertBox.style.background = "#007bff";
    alertBox.style.color = "white";
    alertBox.style.padding = "15px";
    alertBox.style.borderRadius = "5px";
    alertBox.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
    
    document.body.appendChild(alertBox);
  
    setTimeout(() => alertBox.remove(), 3000); // Auto close after 3 seconds
  }
  

  
