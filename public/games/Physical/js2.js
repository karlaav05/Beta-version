// Grid definitions
const values = [
    "bbbbbbbbbbbwbbbbbbb", "bbbbbbbbbbbwwwwwwww", "bbbbbbbbbbbwbbbbbbb",
    "bbbbbbbbbwbwbbbbbbb", "bbbbbbbwbwbwbbbbbbb", "bbbbbbbwbwbwbbbbbbb",
    "bbbbbbwwwwwwbbbbbbb", "bbbbbbbwbwbbbbbbbbb", "wwwwwwwwwwwbbbbbbbb",
    "bbbbbbbwbwbbbbbbbbb", "bbbbbbbwbwbbbbbbbbb", "bbbbbbbwbwbbbbbbbbb",
    "bbbbbbbbbwbbbbbbbbb"
]; 

const ans_key = [
    "-----------E-------", "-----------MOBILITY", "-----------P-------",
    "---------A-A-------", "-------L-M-T-------", "-------O-P-H-------",
    "------INJURY-------", "-------G-T---------", "SUBSTANTIAL--------",
    "-------E-T---------", "-------R-I---------", "-------M-O---------",
    "---------N---------"
];

const spans_value = {"0,11": "1", "1,11": "2", "3,9": "3", "4,7": "4", "6,6": "5", "8,0": "6"};
let current = null;

const total_rows = values.length;
const total_cols = values[0].length;

function createFrameBoxes() {
    let boxes = "";
    for (let i = 0; i < values.length; i++) {
        boxes += "<tr>";
        for (let j = 0; j < values[i].length; j++) {
            const s = spans_value[i + "," + j] ?? "";
            boxes += `<th onclick='myclick(this)' row='${i}' col='${j}' class="${values[i][j]}"><span>${s}</span><b></b></th>`;
        }
        boxes += "</tr>";
    }
    document.getElementById("table").innerHTML = boxes;
}

createFrameBoxes();

function myclick(box) {
    if (box.classList.contains("w")) {
        const row = box.getAttribute("row");
        const col = box.getAttribute("col");
        if (current != null) {
            current.style.background = "transparent";
        }
        current = box;
        current.style.background = "purple";
    }
}

document.body.onkeyup = function(event) {
    if (current != null) {
        if (event.keyCode >= 37 && event.keyCode <= 40) {
            nextmover(event.keyCode);
        }
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            current.querySelector("b").innerHTML = event.key.toUpperCase();
            nextmover(39);
        }
        if (event.keyCode == 8 || event.keyCode == 46) {
            current.querySelector("b").innerHTML = "";
        }
    }
};

function nextmover(code) {
    let row = parseInt(current.getAttribute("row"));
    let col = parseInt(current.getAttribute("col"));
    
    switch (code) {
        case 37: col = col == 0 ? total_rows - 1 : col - 1; break;
        case 38: row = row == 0 ? total_cols - 1 : row - 1; break;
        case 39: col = col == total_cols - 1 ? 0 : col + 1; break;
        case 40: row = row == total_rows - 1 ? 0 : row + 1; break;
    }
    
    if (current.classList.contains("w")) current.style.background = "transparent";
    current = document.querySelectorAll("tr")[row].querySelectorAll("th")[col];
    
    if (current.classList.contains("b")) nextmover(code);
    else current.style.background = "purple";
}

let red = [];
let green = [];

function key_check() {
    red = [];
    green = [];
    document.querySelectorAll(".w").forEach(element => {
        const row = element.getAttribute("row");
        const col = element.getAttribute("col");
        const text = element.querySelector("b").innerHTML;
        if (text.length > 0) {
            if (text === ans_key[row][col]) {
                element.style.background = "green";
                green.push(element);
            } else {
                element.style.background = "red";
                red.push(element);
            }
        }
    });
    if (green.length === document.querySelectorAll(".w").length) console.log("Well done! :D");
}

function color_clear() {
    red.forEach(element => {
        element.style.background = "transparent";
        element.querySelector("b").innerHTML = "";
    });
    green.forEach(element => element.style.background = "transparent");
    red = [];
    green = [];
}
