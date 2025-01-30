const display = document.querySelector("#display");
const numbers = document.querySelector("#numbers");
const operators = document.querySelector("#operators");

const MAX_LENGTH = 10;

let numArray = ["", ""];
let currentIndex = 0;
let operator = "";
let operatorPressed = false;

// Event Listeners
// Number Buttons
function clickNumber(event) {
    clickButton(event.target);

    if (operatorPressed) {
        operatorPressed = false;
        currentIndex = 1;
    }

    switch(event.target.id) {
        case "decimal":
            if (!numArray[currentIndex].includes(".") && numArray[currentIndex] < MAX_LENGTH) numArray[currentIndex] += ".";
            break;
        case "numbers":
            event.target.classList.remove("click");
            break;
        default:
            if (numArray[currentIndex].length < MAX_LENGTH) numArray[currentIndex] += event.target.id.slice(6);
            break;
    }

    display.textContent = numArray[currentIndex];
}
numbers.addEventListener("click", clickNumber);

// Operator Buttons
function clickOperator(event) {
    clickButton(event.target);

    switch(event.target.id) {
        case "delete":
            if (numArray[currentIndex]) numArray[currentIndex] = numArray[currentIndex].slice(0, -1);
            break;
        case "clear":
            numArray = ["", ""];
            operator = "";
            break;
        case "negative":
            if (numArray[currentIndex]) numArray[currentIndex] = "" + numArray[currentIndex] * -1;
            break;
        case "operators":
            event.target.classList.remove("click");
            break;
        default:
            if (currentIndex === 1) {
                const result = "" + operate(operator, numArray[0], numArray[1]);
                numArray = [result, ""];
                display.textContent = numArray[0];
                currentIndex = 0;
            }

            if (event.target.id == "equals") {
                operator = "";
                operatorPressed = false;
            }
            else {
                operator = event.target.id;
                operatorPressed = true;
            }

            break;
    }

    display.textContent = numArray[currentIndex];
}
operators.addEventListener("click", clickOperator);

// Keyboard Buttons
function clickKey(event) {
    const key = event.key;

    if (isFinite(key)) {
        numbers.querySelector("#digit-" + key).click();
    }
    else {
        switch(key) {
            case ".":
                numbers.querySelector("#decimal").click();
                break;
            case "+":
                operators.querySelector("#plus").click();
                break;
            case "-":
                operators.querySelector("#minus").click();
                break;
            case "*":
                operators.querySelector("#times").click();
                break;
            case "/":
                operators.querySelector("#divide").click();
                break;
            case "_":
                operators.querySelector("#negative").click();
                break;
            case "Enter":
                operators.querySelector("#equals").click();
                break;
            case "Escape":
                operators.querySelector("#clear").click();
                break;
            case "Backspace":
                operators.querySelector("#delete").click();
                break;
        }
    }
}
document.addEventListener("keydown", clickKey);

// Normal Functions
function clickButton(target) {
    target.classList.add("click");
    target.disabled = true;
    setTimeout(function() {
        target.classList.remove("click");
        target.disabled = false;
    }, 310);
}

// Operator Functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(op, num1, num2) {
    num1 *= 1;
    num2 *= 1;

    switch (op) {
        case "plus":
            return add(num1, num2);
        case "minus":
            return subtract(num1, num2);
        case "times":
            return multiply(num1, num2);
        case "divide":
            return divide(num1, num2);
    }
}