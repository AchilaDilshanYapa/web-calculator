const display = document.getElementById('result');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value >= '0' && value <= '9' || value === '.') {
            if (waitingForSecondOperand) {
                display.value = value;
                waitingForSecondOperand = false;
            } else {
                display.value = display.value === '0' ? value : display.value + value;
            }
            currentInput = display.value;
        } else if (['+', '-', '*', '/'].includes(value)) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            waitingForSecondOperand = true;
        } else if (value === '=') {
            if (operator && firstOperand !== null) {
                const secondOperand = parseFloat(currentInput);
                let result;

                switch (operator) {
                    case '+':
                        result = firstOperand + secondOperand;
                        break;
                    case '-':
                        result = firstOperand - secondOperand;
                        break;
                    case '*':
                        result = firstOperand * secondOperand;
                        break;
                    case '/':
                        result = secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
                        break;
                }

                display.value = result;
                firstOperand = result;
                currentInput = result.toString();
                waitingForSecondOperand = true;
            }
        } else if (value === 'C') {
            display.value = '0';
            currentInput = '';
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
        }
    });
});