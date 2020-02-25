
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+><,.?/"\':;{[}]|\\*';

const isUpperEl = document.getElementById('isUpper');
const isLowerEl = document.getElementById('isLower');
const isNumberEl = document.getElementById('isNumber');
const isSymbolEl = document.getElementById('isSymbol');
const passLengthEl = document.getElementById('passLength');
const passGenerateBtn = document.getElementById('passGenerate');
const outputPassEl = document.getElementById('outputPassword');
const copyClipboardBtn = document.getElementById('copyClipboard');

function generatePassword() {
    
    let outputPass = '';
    let passLength = parseInt(passLengthEl.value) > 0 ? parseInt(passLengthEl.value) : 8;

    if(passLength && passLength > 0) {

        let charList = '';

        isUpperEl.checked ? charList += upperLetters : charList;
        isLowerEl.checked ? charList += lowerLetters : charList;
        isNumberEl.checked ? charList += numbers : charList;
        isSymbolEl.checked ? charList += symbols : charList;

        charList = charList.split('');
        
        if(charList.length > 0) {

            for(let i = 1; i <= passLength; i++) {

                const randIndex = Math.floor(Math.random() * charList.length);

                outputPass += charList[randIndex];

            };
        };
    };
    
    outputPassEl.value = outputPass;
};

function copyToClipboard() {
  
  outputPassEl.select();
  outputPassEl.setSelectionRange(0, 99999); /*For mobile devices*/

  if(outputPassEl.value.length > 0) {
    /* Copy the text inside the text field */
    document.execCommand("copy");

    alert("Copied the text: " + outputPassEl.value);
  };
  
}

passGenerateBtn.addEventListener('click', generatePassword);
copyClipboardBtn.addEventListener('click', copyToClipboard);
