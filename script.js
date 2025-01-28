const display = document.querySelector("#display");
const numbers = document.querySelector("#numbers");
const operators = document.querySelector("#operators");

const MAX_LENGTH = 10;

let num1 = 0;
let num2 = 0;
let operator = "";

// Event Listeners
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
            if (display.textContent.length < MAX_LENGTH) display.textContent += (event.target.id);
            break;
    }
}
numbers.addEventListener("click", clickNumber);

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
        case "operators":
            event.target.classList.remove("click");
            break;
        default:
            operator = event.target.id;
            break;
    }
}
operators.addEventListener("click", clickOperator);

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