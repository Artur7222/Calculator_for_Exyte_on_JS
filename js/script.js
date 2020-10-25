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

inputValue(value);