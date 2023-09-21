function reverseArray(array) {
    return array.reverse();
}
var numberArray = [1, 2, 3, 4, 5];
var stringArray = ["apple", "banana", "cherry", "date"];
var mixedArray = [true, 42, "hello", false];
console.log("Reversed Array of Numbers:", reverseArray(numberArray));
console.log("Reversed Array of Strings:", reverseArray(stringArray));
console.log("Reversed Mixed Array:", reverseArray(mixedArray));
