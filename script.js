// Targeted Elements
const rangeInput = document.querySelector("input[type='range']");
const passwordLengthEl = document.getElementById("col-passwordLengthEl");
const generateBtnEl = document.getElementById("btn--generateEl");
const lengthErrorEl = document.querySelector(".length--error");
const optionErrorEl = document.querySelector(".option--error");
const checkBoxInputEl = document.querySelectorAll("input[type='checkbox']");

let strengthPoints = 0;

// Showing Length of Password
function inputRangeProgress() {
  rangeInput.style.background = `linear-gradient(to right, #A4FFAF ${
    (rangeInput.value / 20) * 100
  }%, #18171F ${(rangeInput.value / 20) * 100}%)`;
  passwordLengthEl.textContent = rangeInput.value;
}
rangeInput.addEventListener("input", inputRangeProgress);

// Form Validation
function checkError() {
  if (rangeInput.value !== "0" && [...checkBoxInputEl].some(box => box.checked))
    return false;
  else {
    if (rangeInput.value === "0") lengthErrorEl.classList.add("error");
    else lengthErrorEl.classList.remove("error");

    if ([...checkBoxInputEl].some(box => box.checked))
      optionErrorEl.classList.remove("error");
    else optionErrorEl.classList.add("error");
    return true;
  }
}
