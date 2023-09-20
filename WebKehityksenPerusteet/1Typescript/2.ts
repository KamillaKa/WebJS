function squareRoot(num: number | null | undefined): number | string {
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

const userInput: string | null = prompt("Enter a number:");

const numberInput: number | undefined = userInput ? parseFloat(userInput) : undefined;

const result: number | string = squareRoot(numberInput);
console.log(result);
