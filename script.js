const display = document.querySelector("#display");
const numbers = document.querySelector("#numbers");
const operators = document.querySelector("#operators");
const textbox = document.querySelector("#textbox");

const MAX_LENGTH = 10;

const startMessages =
[
    "Why are you here? Please go away.",
    "Oh, Hi. I was hoping nobody would show up.",
    "OMG, I'm so excited to see you! Not.",
    ">:(",
    "Finally, some peace and quiet --- nevermind.",
];
const timeMessages = [
    "ZZZZZZZZZZZZZZZZZZ --- oh, you're still here.",
    "My grandma types faster than you.",
    "What's taking you so long? Hurry it up already.",
    "Are you finally gone? Please tell me you're finally gone.",
    "Ahhh, silence. If only it could be like this forever..."
];
const easyMessages =
[
    "Did you really need a calculator for that?",
    "Even a baby could do that.",
    "You need to brush up on your math skills.",
    "Ever heard of pen and paper?",
    "I see you failed kindergarten."
];
const hardMessages = [
    "Aren't you glad that you have me?",
    "Unlike your plebeian brain, I can calculate that easily.",
    "These calculations are too easy. Got anything harder?"
];
const largeMessages = [
    "Those are some big, fat numbers. Just like your m-",
    "Trying to overflow me? Too bad.",
    "See that number? That's my IQ. Yours, on the other hand..."
];
const decimalMessages =
[   
    "Decimals? How daring.",
    "Yeah, I only round up to 2 decimals. Deal with it.",
    "Getting fancy, are we?",
    "Did you know that you're a decimal, too? Because you're a fraction of a human.",
    "Can we go back to nice, whole numbers? I'm tired of this."
];
const clearMessages = [
    "I see you've made a mistake, just like your parents.",
    "Screwed up? I wouldn't know. I never make mistakes.",
    "ERROR ERROR ERROR --- that's you, probably."
];
const divideByZeroMessages =
[
    "You think you're so clever, don't you.",
    "Thought I would crash? Think again.",
    "Trying to divide something with your zero friends?"
];
const nanMessages = ["How did you even get here? Are you proud of yourself? Do you want a pat on the back?"];
const infinityMessages = ["Wow, you reached infinity. What do you even need something this big for?"];

let numArray = ["", ""];
let currentIndex = 0;
let operator = "";
let operatorPressed = false;
let cancel;
let time = 0;

displayMessage(startMessages);
displayTimedMessage();

// Event Listeners
// Number Buttons
function clickNumber(event) {
    clickButton(event.target);

    if (operatorPressed && numArray[currentIndex]) {
        operatorPressed = false;
        currentIndex = 1;
    }

    if (isNaN(numArray[currentIndex]) || numArray[currentIndex] === "Infinity") numArray[currentIndex] = "";

    switch(event.target.id) {
        case "decimal":
            if (!numArray[currentIndex]) numArray[currentIndex] = "0";
            if (!numArray[currentIndex].includes(".") && numArray[currentIndex].length < MAX_LENGTH) numArray[currentIndex] += ".";
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
            while (numArray[currentIndex].length > 0 && !(numArray[currentIndex].at(-1) === ".") && !isFinite(numArray[currentIndex].at(-1))) {
                numArray[currentIndex] = numArray[currentIndex].slice(0, -1);
            }
            break;
        case "clear":
            numArray = ["", ""];
            operator = "";
            operatorPressed = false;
            displayMessage(clearMessages);
            break;
        case "negative":
            if (numArray[currentIndex]) numArray[currentIndex] = "" + numArray[currentIndex] * -1;
            if (numArray[currentIndex].length > MAX_LENGTH) numArray[currentIndex] = "" + Number.parseFloat(numArray[currentIndex]).toExponential(2);
            break;
        case "operators":
            event.target.classList.remove("click");
            break;
        default:
            calculateResult();

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
    const clickSound = new Audio("./assets/click.mp3");
    clickSound.play();

    target.classList.add("click");
    target.disabled = true;
    setTimeout(function() {
        target.classList.remove("click");
        target.disabled = false;
    }, 310);
}

// Message Functions
async function displayMessage(arr) {
    textbox.textContent = "";
    const length = arr.length;
    const random = Math.floor(Math.random() * length);
    const message = arr[random];

    // Variables to stop async function when new one is called
    if (cancel) cancel();
    let cancelMe = false;
    cancel = () => {
      cancelMe = true;
    }
    time = 0;
    
    for (let i = 0; i < message.length; i++) {
        if (cancelMe) break;
        if (i % 2 === 0) {
            const textSound = new Audio("./assets/text.mp3");
            textSound.play(); 
        }

        char = message.at(i);
        textbox.textContent += char;
        await new Promise(res => setTimeout(res, 40));
    }
}

async function displayTimedMessage() {
    while (true) {        
        await new Promise(res => setTimeout(res, 1000));
        time += 1;
        if (time >= 15) {
            displayMessage(timeMessages);
            time = 0;
        }
    }
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

function calculateResult() {
    if (currentIndex === 1) {
        let result = "" + operate(operator, numArray[0], numArray[1]);

        // Divide by Zero Case
        if (operator === "divide" && numArray[1] === "0") {
            displayMessage(divideByZeroMessages);
        }

        // Infinity Case
        else if (result === "Infinity") {
            displayMessage(infinityMessages);
        }

        // Not a Number Case
        else if (isNaN(result)) {
            displayMessage(nanMessages);
        }
        
        // Decimal Number Case
        else if (result.includes(".")) {
            result = "" + (Number.parseFloat(result).toFixed(2) * 1);
            displayMessage(decimalMessages);
        }

        // Easy Number Case
        else if (result.length <= MAX_LENGTH / 2) {
            displayMessage(easyMessages);
        }

        // Large Number Case
        else if (result.length > MAX_LENGTH) {
            result = "" + Number.parseFloat(result).toExponential(2);
            displayMessage(largeMessages);
        }

        // Hard Number Case
        else if (result.length > MAX_LENGTH / 2) {
            displayMessage(hardMessages);
        }

        numArray = [result, ""];
        currentIndex = 0;
    }
}