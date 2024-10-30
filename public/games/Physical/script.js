const solution = "PHYSICAL";  // Use uppercase for consistency with guess input
let currentRow = 0;  // Keeps track of the current row for guesses
const maxAttempts = 5;  // Limit to 5 attempts

function checkGuess() {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.toUpperCase();

    // Check if the guess length is valid
    if (guess.length !== 10) {
        alert("Guess must be 10 letters long.");
        return;
    }

    // Get the row where letters will display
    const row = document.querySelectorAll(".row")[currentRow];
    const cells = row.querySelectorAll(".cell");

    // Display each letter in the corresponding cell
    for (let i = 0; i < 10; i++) {
        cells[i].textContent = guess[i];

        // Check if the letter matches the solution and style accordingly
        if (guess[i] === solution[i]) {
            cells[i].classList.add("correct");  // Green for correct letters
        } else if (solution.includes(guess[i])) {
            cells[i].classList.add("present");  // Yellow for letters in the word but wrong place
        } else {
            cells[i].classList.add("absent");   // Gray for incorrect letters
        }
    }

    // Increment row and clear input for next guess
    currentRow++;
    guessInput.value = "";

    // Check for win or loss conditions
    if (guess === solution) {
        alert("Congratulations! You've guessed the word!");
        resetGame();
    } else if (currentRow >= maxAttempts) {
        alert(`Game over! The correct word was ${solution}.`);
        resetGame();
    }
}

function resetGame() {
    // Clear all rows and reset attempts
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("correct", "present", "absent");
    });
    currentRow = 0;  // Reset to the first row for new attempts
}
