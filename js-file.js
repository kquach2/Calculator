const add = function(num1, num2) {
    return num1+num2;
}  

const subtract = function(num1, num2) {
    return num1-num2;
}

const multiply = function(num1, num2) {
    return num1*num2;
}

const divide = function(num1, num2) {
    return num1/num2;
}

const operate = function(operator, num1, num2) {
    if (operator == 'add') return add(num1, num2);
    else if (operator == 'subtract') return subtract(num1, num2);
    else if (operator == 'multiply') return multiply(num1, num2);
    else return divide(num1, num2);
}

const populate = function(a) {
    document.querySelector('#displaynum').textContent = document.querySelector('#displaynum').textContent + this.textContent;
}

document.querySelectorAll('.number').forEach(number => number.addEventListener('click', populate));

