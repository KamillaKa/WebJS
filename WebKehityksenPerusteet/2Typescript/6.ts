const reverseArray = <T>(taulukko: T[]): T[] => {
    const kaannetty = taulukko.reverse();
    return kaannetty;
}

const numberArray: number[] = [1, 2, 3, 4, 5];
const stringArray: string[] = ["apple", "banana", "cherry", "date"];
const mixedArray: (string | number | boolean)[] = [true, 42, "hello", false];

console.log(reverseArray(numberArray));
console.log(reverseArray(stringArray));
console.log(reverseArray(mixedArray));
