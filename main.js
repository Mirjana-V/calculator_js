const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

const calculate = {
    '/' : (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*' : (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+' : (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-' : (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=' : (firstNumber, secondNumber) => secondNumber
}

let firstValue = 0;
let operatorValue = '';
let awaitnigNewValue = false;

function sendNumberValue(number) {
    console.log(number);

    // const displayValue = calculatorDisplay.textContent;
    // calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;

    if(awaitnigNewValue) {
        calculatorDisplay.textContent = number;
        awaitnigNewValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function useDecimal() {
    if(awaitnigNewValue) return;

    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);

    if(operatorValue && awaitnigNewValue) {
        operatorValue = operator;
        return;
    }

    if(!firstValue) {
        firstValue = currentValue;
    } else {
        console.log(firstValue, operatorValue, currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        firstValue = calculation;
        calculatorDisplay.textContent = calculation;
        console.log('calculation', calculation);
    }
    operatorValue = operator;
    awaitnigNewValue = true;
    calculatorDisplay.textContent = firstValue;
}

inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value))
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => useDecimal())
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    }
})

function clearAll() {
    firstValue = 0;
    operatorValue = '';
    awaitnigNewValue = false;
    calculatorDisplay.textContent = '0';
}

clearBtn.addEventListener('click', clearAll);