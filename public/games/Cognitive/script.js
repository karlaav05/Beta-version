const solution = "SOCIAL".toUpperCase();
let currentRow = 0;

function checkGuess() {
    const guess = document.getElementById("guessInput").value.toUpperCase();
    if (guess.length !== 10) {
        alert("Guess must be 10 letters long.");
        return;
    }

    const row = document.querySelectorAll(".row")[currentRow];
    const cells = row.querySelectorAll(".cell");

    for (let i = 0; i < 10; i++) {
        cells[i].textContent = guess[i];
        if (guess[i] === solution[i]) {
            cells[i].classList.add("correct");
        } else if (solution.includes(guess[i])) {
            cells[i].classList.add("present");
        } else {
            cells[i].classList.add("absent");
        }
    }

    currentRow++;
    document.getElementById("guessInput").value = "";

    if (guess === solution) {
        alert("Congratulations! You've guessed the word!");
    } else if (currentRow >= 6) {
        alert(`Game over! The correct word was ${solution}.`);
    }
}