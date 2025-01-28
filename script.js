const display = document.querySelector("#display");
const numbers = document.querySelector("#numbers");
const operators = document.querySelector("#operators");

const MAX_LENGTH = 10;

let num1 = 0;
let num2 = 0;
let operator = "";

// Event Listeners
// Number Buttons
function clickNumber(event) {
    event.target.classList.add("click");
    setTimeout(() => event.target.classList.remove("click"), 500);

    switch(event.target.id) {
        case "decimal":
            if (!display.textContent.includes(".") && display.textContent.length < MAX_LENGTH) display.textContent += ".";
            break;
        case "numbers":
            event.target.classList.remove("click");
            break;
        default:
            if (display.textContent.length < MAX_LENGTH) display.textContent += event.target.id.slice(6);
            break;
    }
}
numbers.addEventListener("click", clickNumber);

// Operator Buttons
function clickOperator(event) {
    event.target.classList.add("click");
    setTimeout(() => event.target.classList.remove("click"), 500);

    switch(event.target.id) {
        case "delete":
            if (!(display.textContent === "")) display.textContent = display.textContent.slice(0, -1);
            break;
        case "clear":
            display.textContent = "";
            num1 = 0;
            num2 = 0;
            operator = "";
            break;
        case "negative":
            display.textContent *= -1;
            break;
        case "operators":
            event.target.classList.remove("click");
            break;
        default:
            operator = event.target.id;
            break;
    }
}
operators.addEventListener("click", clickOperator);

// Keyboard Buttons
function clickKey(event) {
    const key = event.key;
    console.log(key);
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