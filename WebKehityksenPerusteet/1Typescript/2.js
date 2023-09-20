function squareRoot(num) {
    if (num === undefined || num === null) {
        return 'Input is undefined or null.';
    }
    if (isNaN(num)) {
        return 'Invalid input. Please enter a valid number.';
    }
    if (num < 0) {
        return 'Cannot calculate square root of a negative number.';
    }
    return Math.sqrt(num);
}
var userInput = prompt("Enter a number:");
var numberInput = userInput ? parseFloat(userInput) : undefined;
var result = squareRoot(numberInput);
console.log(result);
