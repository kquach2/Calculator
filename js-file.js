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
let num1;
let num2;

const round = function(num) {
    return (num.toString().length > 14) ? 
        num.toExponential(2) :
        num
}

const limit = function(displayNum, pressedNum) {
    return ((displayNum + pressedNum).length > 14) ? 
        displayNum :
        displayNum+pressedNum;
}
const populate = function(e) {
    if (displayValue == '0' && !num2) {
        displayValue = e.target.textContent;
        document.querySelector('#displaynum').textContent = displayValue;
    }
    else if (num1 && op && !num2) {
        displayValue = e.target.textContent;
        num2 = Number(e.target.textContent);
        document.querySelector('#displaynum').textContent = displayValue;
    }
    else if (num1 && op && num2) {
            displayValue = limit(document.querySelector('#displaynum').textContent, e.target.textContent);

        num2 = Number(displayValue);
        document.querySelector('#displaynum').textContent = displayValue;
    }
    else {
        displayValue = limit(document.querySelector('#displaynum').textContent, e.target.textContent);
        document.querySelector('#displaynum').textContent = displayValue
    }
}

document.querySelector('#clear').addEventListener('click', 
function(e) {
    displayValue = '0';
    op = undefined;
    num1 = undefined;
    num2 = undefined;
    document.querySelector('#displaynum').textContent = displayValue;
})

document.querySelectorAll('.number').forEach(number => number.addEventListener('click', populate));

document.querySelectorAll('.operator').forEach(operator => operator.addEventListener('click', 
function(e) {
    if (!op && !num1) {
        num1 = Number(displayValue);
        op = e.target.textContent;
    }
    else if (op && num1 && !num2){
        num1 = operate(op, num1, num1); 
        displayValue = num1.toString();
        document.querySelector('#displaynum').textContent = displayValue;
    }
    else if (!num2 && !op) {
        op = e.target.textContent;
    }
    else {
        num1 = operate(op, num1, num2); 
        displayValue = num1.toString();
        document.querySelector('#displaynum').textContent = displayValue;
        op = e.target.textContent;
        num2 = undefined;
    }
}));

document.querySelector('#equals').addEventListener('click', 
function() {
    if (op != undefined && num1 != undefined && num2 != undefined) {
        console.log([num1,num2,op]);
        if (op == '/' && num2 == 0) {
            console.log("Hi");
            displayValue = 'Can\'t divide!';
            console.log(displayValue);
            document.querySelector('#displaynum').textContent = displayValue;
        }
        else {
            num1 = operate(op, num1, num2);
            displayValue = num1.toString();
            op = undefined;
            num2 = undefined;
            document.querySelector('#displaynum').textContent = displayValue;
        }
    }
    else if (op != undefined && num1 != undefined && !num2){
        num1 = operate(op, num1, num1); 
        displayValue = num1.toString();
        op = undefined;
        document.querySelector('#displaynum').textContent = displayValue;
    }
}
);

