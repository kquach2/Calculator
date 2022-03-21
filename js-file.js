const add = function(num1, num2) {
    return round(Number(num1)+Number(num2));
}  

const subtract = function(num1, num2) {
    return round(Number(num1)-Number(num2));
}

const multiply = function(num1, num2) {
    return round(Number(num1)*Number(num2));
}

const divide = function(num1, num2) {
    return round(Number(num1)/Number(num2));
}

const operate = function(operator, num1, num2) {
    if (operator == '+') return add(num1, num2);
    else if (operator == '-') return subtract(num1, num2);
    else if (operator == '*') return multiply(num1, num2);
    else return divide(num1, num2);
}

let displayValue = '0';
let op;
let num1 = 0;
let num2 = 0;

const round = function(num) {
    return (num.toString().length > 14) ? 
        num.toExponential(2) :
        num;
}

const limit = function(displayNum, pressedNum) {
    return ((displayNum + pressedNum).length > 14) ? 
        displayNum :
        displayNum+pressedNum;
}
const handleEqualsPress = function() {
    if (op != null && num1 != null && displayValue != num1) {
        if (op == '/' && displayValue == 0) {
            displayValue = 'Can\'t divide!';
            document.querySelector('#displaynum').textContent = displayValue;
        }
        else {
            num2 = displayValue;
            result = operate(op, num1, num2);
            displayValue = result.toString();
            if (displayValue.includes('.')) document.querySelector('#decimalpt').disabled = true;
            op = null;
            num1 = result;
            num2 = 0;
            document.querySelector('#displaynum').textContent = displayValue;
        }
    }
    else if (op != null && num1 != null && displayValue == num1) {
        result = operate(op, num1, num1); 
        displayValue = result.toString();
        op = null;
        num1 = result;
        num2 = 0;
        document.querySelector('#displaynum').textContent = displayValue;
    }
}

const handleDecimalPtPress = function() {
    if (!displayValue.includes('.') && document.querySelector('#decimalpt').disabled == false) {
        displayValue = limit(displayValue, '.');
        if (displayValue.includes('.')) {
            document.querySelector('#decimalpt').disabled = true;
            document.querySelector('#displaynum').textContent = displayValue; 
        }
    }
}
const handleBackspacePress = function() {
    if (displayValue.length == 1) {
        if (displayValue != 0) {
            displayValue = '0';
            document.querySelector('#displaynum').textContent = displayValue;
        }
    }
    else {
        if (displayValue.charAt(displayValue.length-1) == '.') {
            document.querySelector('#decimalpt').disabled = false;
        }
        displayValue = displayValue.slice(0,displayValue.length-1);
        document.querySelector('#displaynum').textContent = displayValue;
    }
}

document.querySelector('#clear').addEventListener('click', function(e) {
    document.querySelector('#decimalpt').disabled = false;
    displayValue = '0';
    op = null;
    num1 = 0;
    num2 = 0;
    document.querySelector('#displaynum').textContent = displayValue;
    document.querySelector('#clear').blur();
});

document.querySelector('#delete').addEventListener('click', handleBackspacePress);

document.querySelectorAll('.number').forEach(number => number.addEventListener('click', function(e) {
    if (!op) { // generating num1
        if (displayValue == '0' || (displayValue == num1)) {
            displayValue = e.target.textContent;
            document.querySelector('#displaynum').textContent = displayValue;
        }
        else {
            displayValue = limit(document.querySelector('#displaynum').textContent, e.target.textContent);
            document.querySelector('#displaynum').textContent = displayValue;
        }
    }
    else { // generating num2
        if (num2 == 0) {
            displayValue = e.target.textContent;
            document.querySelector('#displaynum').textContent = displayValue;
            num2 = Number(displayValue);
            document.querySelector('#decimalpt').disabled = false;
        }
        else {
            displayValue = limit(document.querySelector('#displaynum').textContent, e.target.textContent);
            document.querySelector('#displaynum').textContent = displayValue;
        }
    }
}));

document.querySelectorAll('.operator').forEach(operator => operator.addEventListener('click', function(e) {
    if (!op) {
        num1 = Number(displayValue);
        op = e.target.textContent;
    }
    else if (op != null && num1 != null && displayValue == num1) {
        num1 = operate(op, num1, num1); 
        displayValue = num1.toString();
        document.querySelector('#displaynum').textContent = displayValue;
        op = e.target.textContent;
        num2 = 0;
    }
    else if (op != null && num1 != null && displayValue != num1) {
        if (op == '/' && displayValue == 0) {
            displayValue = 'Can\'t divide!';
            document.querySelector('#displaynum').textContent = displayValue;
        }
        else {
            num2 = displayValue;
            num1 = operate(op, num1, num2); 
            displayValue = num1.toString();
            document.querySelector('#displaynum').textContent = displayValue;
            op = e.target.textContent;
            num2 = 0;
        }
    }
}));

document.querySelector('#equals').addEventListener('click', handleEqualsPress);

document.querySelector('#decimalpt').addEventListener('click', handleDecimalPtPress);

document.addEventListener('keydown', function(e) {
    if (e.key == 'Backspace') handleBackspacePress();
    else if (e.key == '=' || e.key == 'Enter') handleEqualsPress();
    else if (e.key == '.') handleDecimalPtPress();
    else if (['+','-','*','/'].includes(e.key)) {
        //if (displayValue.includes('.')) document.querySelector('#decimalpt').disabled = true;
        if (!op) {
            num1 = Number(displayValue);
            op = e.key;
        }
        else if (op != null && num1 != null && displayValue == num1) {
            num1 = operate(op, num1, num1); 
            displayValue = num1.toString();
            document.querySelector('#displaynum').textContent = displayValue;
            op = e.key;
            num2 = 0;
        }
        else if (op != null && num1 != null && displayValue != num1) {
            if (op == '/' && displayValue == 0) {
                displayValue = 'Can\'t divide!';
                document.querySelector('#displaynum').textContent = displayValue;
            }
            else {
                num2 = displayValue;
                num1 = operate(op, num1, num2); 
                displayValue = num1.toString();
                document.querySelector('#displaynum').textContent = displayValue;
                op = e.key;
                num2 = 0;
            }
        }
    }
    else if (['0','1','2','3','4','5','6','7','8','9'].includes(e.key)) {
        if (!op) { // generating num1
            if (displayValue == '0' || (displayValue == num1)) {
                displayValue = e.key;
                document.querySelector('#displaynum').textContent = displayValue;
            }
            else {
                displayValue = limit(document.querySelector('#displaynum').textContent, e.key);
                document.querySelector('#displaynum').textContent = displayValue;
            }
        }
        else { // generating num2
            if (num2 == 0) {
                displayValue = e.key;
                document.querySelector('#displaynum').textContent = displayValue;
                num2 = Number(displayValue);
                document.querySelector('#decimalpt').disabled = false;
            }
            else {
                displayValue = limit(document.querySelector('#displaynum').textContent, e.key);
                document.querySelector('#displaynum').textContent = displayValue;
            }
        }
    }
})
