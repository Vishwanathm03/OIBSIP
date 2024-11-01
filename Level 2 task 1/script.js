const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = null;

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            resetCalculator();
        } else if (value === '=') {
            calculateResult();
        } else if (['+', '-', '*', '/'].includes(value)) {
            handleOperator(value);
        } else {
            appendNumber(value);
        }
    });
});

// Reset the calculator
function resetCalculator() {
    currentInput = '';
    previousInput = '';
    operator = null;
    display.textContent = '0';
}

// Append numbers to the current input
function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
    currentInput += number;
    display.textContent = currentInput;
}

// Handle operators
function handleOperator(op) {
    if (currentInput === '') return; // Prevent invalid input

    if (previousInput !== '') calculateResult(); // Chain operations

    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Perform the calculation
function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return; // Ensure valid numbers

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }

    display.textContent = result;
    previousInput = result;
    currentInput = '';
    operator = null;
}
