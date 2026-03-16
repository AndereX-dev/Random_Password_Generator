const characterAmountRange = document.getElementById("characterAmountRange");
const characterAmountNumber = document.getElementById("characterAmountNumber");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountRange.value = value;
  characterAmountNumber.value = value;
}

characterAmountRange.addEventListener("input", syncCharacterAmount);
characterAmountNumber.addEventListener("input", syncCharacterAmount);

const form = document.getElementById("passwordGeneratorForm");
const includeUppercaseElement = document.getElementById("includeUppercase");
const includeNumbersElement = document.getElementById("includeNumbers");
const includeSymbolsElement = document.getElementById("includeSymbols");
const passwordDisplay = document.getElementById("passwordDisplay");

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = characterAmountNumber.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;

  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols,
  );
  passwordDisplay.innerText = password;

  updateStrengthMeter(
    password,
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols,
  );
});

function updateStrengthMeter(password, length, upper, num, sym) {
  let score = 0;
  if (length > 8) score += 1;
  if (length > 12) score += 1;
  if (length > 16) score += 1;
  if (upper) score += 1;
  if (num) score += 1;
  if (sym) score += 1;

  let width = (score / 5) * 100;
  let color = "";
  let text = "";

  if (score <= 2) {
    color = "#ff4d4d";
    text = "Weak";
  } else if (score <= 4) {
    color = "#ffd93d";
    text = "Medium";
  } else {
    color = "#4ade80";
    text = "Strong";
  }

  strengthBar.style.width = width + "%";
  strengthBar.style.backgroundColor = color;
  strengthText.innerText = text;
  strengthText.style.color = color;
}

function generatePassword(
  characterAmont,
  includeUppercase,
  includeNumbers,
  includeSymbols,
) {
  let charCodes = LOWERCASE_CHAR_CODES;
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);

  const passwordCharacters = [];
  for (let i = 0; i < characterAmont; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

const copyBtn = document.getElementById("copyBtn");

copyBtn.addEventListener("click", () => {
  const password = passwordDisplay.innerText;
  if (
    !password ||
    password === "Click Generate Password" ||
    password === "✅ Copied!"
  )
    return;

  navigator.clipboard.writeText(password).then(() => {
    const originalPassword = password;
    const originalColor = passwordDisplay.style.color;
    passwordDisplay.innerText = "✅ Copied!";
    passwordDisplay.style.color = "white";
    setTimeout(() => {
      passwordDisplay.innerText = originalPassword;
      passwordDisplay.style.color = originalColor;
    }, 2000);
  });
});
