// Targeted Elements
const rangeInput = document.querySelector("input[type='range']");
const passwordLengthEl = document.getElementById("col-passwordLengthEl");
const generateBtnEl = document.getElementById("btn--generateEl");
const lengthErrorEl = document.querySelector(".length--error");
const optionErrorEl = document.querySelector(".option--error");
const checkBoxInputEl = document.querySelectorAll("input[type='checkbox']");
const generatedPasswordEl = document.getElementById("col-passwordEl");
const copyBtnEl = document.getElementById("btn--copyEl");
const coptStatusEl = document.getElementById("col-copyStatusEl");

// Charset
const chars =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~`!@#$%^&*()_-+={[}]|:;\"'<,>.?/";

// Set of Patterns
const patterns = {
  uppercase: "A-Z",
  lowercase: "a-z",
  number: "0-9",
  symbol: "\\W",
};

let strengthPoints = 0;

// Showing Length of Password
function inputRangeProgress() {
  rangeInput.style.background = `linear-gradient(to right, #A4FFAF ${
    (rangeInput.value / 20) * 100
  }%, #18171F ${(rangeInput.value / 20) * 100}%)`;
  passwordLengthEl.textContent = rangeInput.value;
}

rangeInput.addEventListener("input", function () {
  inputRangeProgress();
  if (!checkError()) {
  }
});

// Check for errors
// Still can be refactor
function checkError() {
  if (
    rangeInput.valueAsNumber >= 8 &&
    [...checkBoxInputEl].some(box => box.checked)
  )
    return false;
  else {
    return true;
  }
}

// Error Message Handling
function errorMessage() {
  if (rangeInput.valueAsNumber < 8) lengthErrorEl.classList.add("error");
  else lengthErrorEl.classList.remove("error");

  if ([...checkBoxInputEl].some(box => box.checked))
    optionErrorEl.classList.remove("error");
  else optionErrorEl.classList.add("error");
}

// Check Expected Pattern
function userExpectedPattern() {
  let result = "";
  let patternToCheck = "";
  const checkedBoxes = [...checkBoxInputEl]
    .filter(box => box.checked)
    .map(box => box.id);
  for (const box of checkedBoxes) {
    result += patterns[box];
    patternToCheck += `(?=.*[${patterns[box]}])`;
  }
  return [result, `^${patternToCheck}[${result}]+$`];
}

// Generate Password Function
function generatePassword(patterns, passLength) {
  const [expectedPatternInStr, checkPatternInStr] = patterns();
  const expectedPatterns = RegExp(`[${expectedPatternInStr}]`, "g");
  const setOfChars = chars.match(expectedPatterns);
  const checkPattern = RegExp(`${checkPatternInStr}`, "g");
  let pWord = "";
  while (!checkPattern.test(pWord)) {
    pWord = "";
    for (let i = 0; i < Number(passLength); i++) {
      pWord += setOfChars[Math.floor(Math.random() * setOfChars.length)];
    }
  }
  return pWord;
}

// Function to copy text
function copyText() {
  navigator.clipboard.writeText(generatedPasswordEl.textContent);
}

copyBtnEl.addEventListener("click", function () {
  if (!checkError()) {
    copyText();
    coptStatusEl.textContent = "Copied";
  }
});

generateBtnEl.addEventListener("click", function () {
  if (!checkError()) {
    generatedPasswordEl.textContent = generatePassword(
      userExpectedPattern,
      passwordLengthEl.textContent
    );
    generatedPasswordEl.classList.remove("text--disabled");
    coptStatusEl.textContent = "";
  }
  errorMessage();
});
