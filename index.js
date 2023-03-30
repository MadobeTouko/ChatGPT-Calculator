const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('.button');

let currentNumber = '';
let previousNumber = '';
let currentOperator = null;
let shouldResetScreen = false;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.number) {
      appendNumber(button.dataset.number);
      updateScreen();
    }

    if (button.dataset.operator) {
      setOperator(button.dataset.operator);
    }

    if (button.dataset.action) {
      performAction(button.dataset.action);
      updateScreen();
    }
  });
});

function appendNumber(number) {
  if (currentNumber === '0' || shouldResetScreen) {
    resetScreen();
  }

  currentNumber += number;
}

function resetScreen() {
  screen.value = '';
  currentNumber = '';
  shouldResetScreen = false;
}

function updateScreen() {
  screen.value = currentNumber;
}

function setOperator(operator) {
  if (currentOperator !== null) {
    calculate();
  }

  previousNumber = currentNumber;
  currentNumber = '';
  currentOperator = operator;
}

function calculate() {
  let result = null;
  switch (currentOperator) {
    case '+':
      result = parseFloat(previousNumber) + parseFloat(currentNumber);
      break;
    case '-':
      result = parseFloat(previousNumber) - parseFloat(currentNumber);
      break;
    case '*':
      result = parseFloat(previousNumber) * parseFloat(currentNumber);
      break;
    case '/':
      if (parseFloat(currentNumber) === 0) {
        result = "Can't divide by zero";
      } else {
        result = parseFloat(previousNumber) / parseFloat(currentNumber);
      }
      break;
    default:
      return;
  }

  currentNumber = result.toString();
  currentOperator = null;
  shouldResetScreen = true;
}

function performAction(action) {
  if (action === 'clear') {
    resetCalculator();
  }

  if (action === 'calculate') {
    calculate();
  }
}

function resetCalculator() {
  resetScreen();
  previousNumber = '';
  currentOperator = null
}
