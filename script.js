// Display screen
const display = document.getElementById("display");

// All calculator buttons
const buttons = document.querySelectorAll(".buttons button");

// Addition
function add(a, b) {
    return a + b;
}

// Subtraction
function subtract(a, b) {
    return a - b;
}

// Multiplication
function multiply(a, b) {
    return a * b;
}

// Division
function divide(a, b) {

    // Prevent divide by zero
    if (b === 0) {
        alert("Cannot divide by zero.");
        return "";
    }

    return a / b;
}

// Percentage
function percentage(value) {
    return value / 100;
}

function calculateExpression(expression) {

    // Split expression into numbers and operators
    const numbers = expression.split(/[\+\-\*\/%]/).map(Number);

    const operators = expression.match(/[\+\-\*\/%]/g);

    if (!operators) {
        return expression;
    }

    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {

        switch (operators[i]) {

            case "+":
                result = add(result, numbers[i + 1]);
                break;

            case "-":
                result = subtract(result, numbers[i + 1]);
                break;

            case "*":
                result = multiply(result, numbers[i + 1]);
                break;

            case "/":
                result = divide(result, numbers[i + 1]);
                break;

            case "%":
                result = percentage(result);
                break;

        }

    }

    return result;

}

buttons.forEach(function(button){

    button.addEventListener("click", function(){

        const value = button.dataset.value;
        const action = button.dataset.action;

        // Clear Display
        if(action === "clear"){

            display.value = "";

            return;
        }

        // Backspace
        if(action === "backspace"){

            display.value =
            display.value.slice(0,-1);

            return;
        }

        // Calculate Result
        if(action === "calculate"){

            display.value =
            calculateExpression(display.value);

            return;
        }

        // Append button value
        if(value){

            display.value += value;

        }

    });

});

document.addEventListener("keydown", function(event){

    const key = event.key;

    // Allowed keys
    const allowedKeys = [
        "0","1","2","3","4","5","6","7","8","9",
        "+","-","*","/","%",
        ".","(",")",
        "Backspace",
        "Enter"
    ];


    // Invalid Key
    if(!allowedKeys.includes(key)){

        event.preventDefault();

        alert("Only numbers and calculator operators are allowed.");

        return;

    }


    // Backspace
    if(key === "Backspace"){

        display.value =
        display.value.slice(0,-1);

        event.preventDefault();

        return;

    }


    // Enter
    if(key === "Enter"){

        display.value =
        calculateExpression(display.value);

        event.preventDefault();

        return;

    }


    // Append Key
    display.value += key;

    event.preventDefault();

});
