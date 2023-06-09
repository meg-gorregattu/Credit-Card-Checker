// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

// VALIDATE CREDIT CARD FUNCTION USING THE LUHN ALGORITHM
const validateCred = arr => {
    let numsToAdd= [];
    for (let i = arr.length-1; i >= 0; i-=2) {
        numsToAdd.push(arr[i])
    }
    for (let i = arr.length-2; i >= 0; i-=2) {
        let doubledNum = arr[i] * 2;
        if (doubledNum >= 10) {
            numsToAdd.push(doubledNum-=9);
        } else {
            numsToAdd.push(doubledNum);
        }
    }
    sum = numsToAdd.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    })
    if (sum % 10 === 0) {
        return 'true'  
    } else {
        return 'false'
    }
}




// FIND INVALID CARDS
let invalidCards = [];
const findInvalidCards = nestedArray  => {
    nestedArray.forEach(array => {
        if (validateCred(array) === 'false') {
            invalidCards.push(array);
        }
    })
    return invalidCards;
}

//Test Function

console.log(findInvalidCards(batch));

// ID INVALID CARD COMPANIES

const idInvalidCardCompanies = invalidCardsArr => {
    let invalidCardCompanies = []
    invalidCardsArr.forEach(array => {
        if (array[0] === 3 && !invalidCardCompanies.includes('Amex')) {
            invalidCardCompanies.push('Amex');
        } else if (array[0] === 4 && !invalidCardCompanies.includes('Visa')) {
            invalidCardCompanies.push('Visa');
        } else if (array[0] === 5 && !invalidCardCompanies.includes('Mastercard')) {
            invalidCardCompanies.push('Mastercard');
        } else if (array[0] === 6 && !invalidCardCompanies.includes('Discover')) {
            invalidCardCompanies.push('Discover');
        } else if ((array[0] < 3) || (array[0] > 6)) {
            console.log('Company not found.');
        }
    })
    return invalidCardCompanies;

}

//Test Functions

console.log(idInvalidCardCompanies(invalidCards)); // Should return ['Visa', 'Mastercard', 'Amex', 'Discover']
console.log(idInvalidCardCompanies([invalid1])); // Should return ['Visa']
console.log(idInvalidCardCompanies([invalid2])) // Should return ['Mastercard']