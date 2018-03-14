// alienNumber sourceLanguage targetLanguage
// N test cases, 1 <= N <= 100
// 1 <= alienNumber <= 4
// 2 <= sourceLanguage <= 16
// 2 <= targetLanguage <= 16

// to convert to decimal
// Dn*Nd^n-1 + ... + D3*Nd^2 + D2*Nd^1 + D1*Nd^0
// FF -> 15*16^1 + 15*16^0
// https://code.google.com/codejam/contest/32003/dashboard

var run = require('../../../utils/run');

function convertToDecimal(sourceLanguage, sourceNumber) {
    // todo: check uniqueness of source languageBase
    // todo: check source number is a subset of source language

    const sourceLanguageElements = sourceLanguage.split('');
    const languageBase = sourceLanguageElements.length;

    const sourceDigitsReversed = sourceNumber.split('').reverse();

    const sourceNumberAsDecimal = sourceDigitsReversed.reduce((decimalValue, currentDigit, currentIndex) => {
        const currentDigitAsDecimal = sourceLanguageElements.indexOf(currentDigit);
        return decimalValue + currentDigitAsDecimal * Math.pow(languageBase, currentIndex);
    }, 0);

    return sourceNumberAsDecimal;
}

function convertFromDecimal(sourceLanguage, decimalNumber) {
    const sourceLanguageElements = sourceLanguage.split('');
    const languageBase = sourceLanguageElements.length;

    const sourceDigitsReversed = [];
    let division, reminder;

    while (division !== 0) {
        if (division === undefined) {
            division = decimalNumber;
        }

        reminder = division % languageBase;
        division = Math.floor(division / languageBase);

        sourceDigitsReversed.push(sourceLanguage[reminder]);
    }

    return sourceDigitsReversed.reverse().join('');
}

function convertToSystem(alienNumber, sourceLanguage, targetLanguage) {
    const asDecimal = convertToDecimal(sourceLanguage, alienNumber);
    const asInTargetSystem = convertFromDecimal(targetLanguage, asDecimal);

    return asInTargetSystem;
}

run((inputLines) => {
    const numLines = inputLines.shift();

    return inputLines.map((inputLine) => {
        const [alienNumber, sourceLanguage, targetLanguage] = inputLine.split(' ');
        return convertToSystem(alienNumber, sourceLanguage, targetLanguage);
    });
});