const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const allowedEl = document.getElementById('allowed-symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    numbers: getRandomNumber,
    symbols: getRandomSymbol,
};

generateEl.addEventListener('click', (e) => {
    e.preventDefault;
    const length = +lengthEl.value;
    const upper = upperEl.checked;
    const lower = lowerEl.checked;
    const numbers = numbersEl.checked;
    const symbols = symbolsEl.checked;
    
    resultEl.value = generatePassword(length, upper, lower, numbers, symbols);
});

symbolsEl.addEventListener('click', () => {
    allowedEl.style.display = (symbolsEl.checked) ? "initial" : "none";
});

clipboardEl.addEventListener('click', () => {
    const password = resultEl.value;
    
    if(!password)
    return;

    const textArea = document.createElement('textarea');
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();

    alert('Password copied to clipboard');
});

// Generate Password
function generatePassword(length, upper, lower, numbers, symbols){
    let password = '';

    const typesCount = lower + upper + numbers + symbols;
    if(typesCount === 0) {
        return '';
    }

    const typesArray = [{lower}, {upper}, {numbers}, {symbols}].filter(type => Object.values(type)[0]);

    for(let i = 0; i < length; i += typesCount)
    {
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0];
            
            password += randomFunc[funcName]();
        })
    }

    return password.slice(0,length);
}

//#region Generator Functions
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = allowedEl.value;
    return symbols[Math.floor(Math.random() * symbols.length)];
}
//#endregion
