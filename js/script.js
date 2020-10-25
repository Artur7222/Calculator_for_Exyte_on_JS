const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
};
  
function inputValue(value) {
  const { displayValue, waitingForSecondOperand } = calculator;
  
  if (waitingForSecondOperand === true) {
      calculator.displayValue = value;
      calculator.waitingForSecondOperand = false;
  } else {
      calculator.displayValue = displayValue === '0' ? value : displayValue + value;
  }
}

function inputDecimal(dot) {

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}
    
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
    
    if (operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        return;
    }
    
    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        const result = performCalculation[operator](currentValue, inputValue);
    
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }
    
      calculator.waitingForSecondOperand = true;
      calculator.operator = nextOperator;
}

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
    '=': (firstOperand, secondOperand) => secondOperand
};
  
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}
  
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}
  
const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }
  
  if (target.classList.contains('operator')) {
    handleOperator(target.value);
      updateDisplay();
      return;
  }
  
  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
      updateDisplay();
      return;
  }
  
  if (target.classList.contains('all-clear')) {
    resetCalculator();
      updateDisplay();
      return;
  }
  
  inputValue(target.value);
  updateDisplay();
});