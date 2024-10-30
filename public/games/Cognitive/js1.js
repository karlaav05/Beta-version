// w- White, b- Black
var values = [
    "bbbbbbbbbwbbbbb", "bbbbbbbbbwbbwbb", "bbbbbbbbbwbbwbb",
    "bbbbbbbbbwbbwbb", "bbbbbbbwwwwwwww", "bbbbbbbwbwbbwbb",
    "bbbbbbbwbwbbwbb", "wwwwwwwwbwbwwww", "bbbbbbbwbwbbwbb",
    "bbbbbbbwbbbbwbb", "bbbbbbbwbbbbwbb", "bbbbbbbwbbbbbbb",
    "bbbbbbbwbbbbbbb"
];

var ans_key = [
    "---------c-----", "---------o--f--", "---------g--u--",
    "---------n--n--", "-------clinical", "-------h-t--t--",
    "-------e-i--i--", "delirium-v-coga", "-------i-e--n--",
    "------s----a--", "------t----l--", "------r-------",
    "------y-------"
];

var total_rows = values.length;
var total_cols = values[0].length;

var spans_value = { "0,9": "1", "1,12": "2", "4,7": "3", "7,0": "5", "5,1": "6" };
var current = null;

function createFrameBoxes() {
    var boxes = "";
    for (let i = 0; i < values.length; i++) {
        boxes += "<tr>";
        for (let j = 0; j < values[i].length; j++) {
            var s = spans_value[i + "," + j] || "";
            boxes += `<th onclick='myclick(this)' row='${i}' col='${j}' class="${values[i][j]}"><span>${s}</span><b></b></th>`;
        }
        boxes += "</tr>";
    }
    document.getElementById("table").innerHTML = boxes;
}

createFrameBoxes();

function myclick(box) {
    if (box.classList.contains("w")) {
        var row = box.getAttribute("row");
        var col = box.getAttribute("col");
        if (current != null) {
            current.style.background = "transparent";
        }
        current = box;
        current.style.background = "purple";
    }
}

document.body.onkeyup = function (event) {
    if (current != null) {
        if (event.keyCode >= 37 && event.keyCode <= 40) {
            nextmover(event.keyCode);
        }

        if (event.keyCode >= 65 && event.keyCode <= 90) {
            current.querySelector("b").innerHTML = event.key.toUpperCase();
            nextmover(39); // Move right
        }

        if (event.keyCode == 8 || event.keyCode == 46) {
            current.querySelector("b").innerHTML = "";
        }
    }
}

function nextmover(code) {
    var row = parseInt(current.getAttribute("row"));
    var col = parseInt(current.getAttribute("col"));

    switch (code) {
        case 37: col = col == 0 ? total_rows - 1 : col - 1; break; // Left
        case 38: row = row == 0 ? total_cols - 1 : row - 1; break; // Up
        case 39: col = col == total_cols - 1 ? 0 : col + 1; break; // Right
        case 40: row = row == total_rows - 1 ? 0 : row + 1; break; // Down
        default: break;
    }

    if (current.classList.contains("w")) {
        current.style.background = "transparent";
    }

    current = document.querySelectorAll("tr")[row].querySelectorAll("th")[col];

    if (current.classList.contains("b")) {
        nextmover(code);
    } else {
        current.style.background = "purple";
    }
}

var red = [];
var green = [];

function key_check() {
    red = [];
    green = [];

    document.querySelectorAll(".w").forEach(element => {
        var row = element.getAttribute("row");
        var col = element.getAttribute("col");
        var text = element.querySelector("b").innerHTML;
        if (text.length > 0) {
            if (text == ans_key[row][col]) {
                element.style.background = "green";
                green.push(element);
            } else {
                element.style.background = "red";
                red.push(element);
            }
        }
    });

    if (green.length == document.querySelectorAll(".w").length) {
        console.log("Well done! :D");
    }
}

function color_clear() {
    red.forEach(element => {
        element.style.background = "transparent";
        element.querySelector("b").innerHTML = "";
    });

    green.forEach(element => {
        element.style.background = "transparent";
    });

    red = [];
    green = [];
}
