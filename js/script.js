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

inputValue(value);