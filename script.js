const typeSelect = document.getElementById("type");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const inputValue = document.getElementById("inputValue");
const result = document.getElementById("result");

const units = {
  length: ["meter", "kilometer", "centimeter", "millimeter", "inch", "foot", "yard", "mile"],
  weight: ["kilogram", "gram", "milligram", "pound", "ounce"],
  temperature: ["celsius", "fahrenheit", "kelvin"],
  currency: ["USD", "EUR", "PHP", "JPY", "GBP"]
};

const conversionRates = {
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    inch: 39.3701,
    foot: 3.28084,
    yard: 1.09361,
    mile: 0.000621371
  },
  weight: {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462,
    ounce: 35.274
  },
  currency: {
    USD: 1,
    EUR: 0.85,
    PHP: 55,
    JPY: 145,
    GBP: 0.75
  }
};

function updateUnits() {
  const type = typeSelect.value;
  const unitOptions = units[type];

  fromUnit.innerHTML = unitOptions.map(u => `<option value="${u}">${u}</option>`).join('');
  toUnit.innerHTML = unitOptions.map(u => `<option value="${u}">${u}</option>`).join('');
}

typeSelect.addEventListener("change", updateUnits);
updateUnits();

function convert() {
  const type = typeSelect.value;
  const from = fromUnit.value;
  const to = toUnit.value;
  const value = parseFloat(inputValue.value);

  if (isNaN(value)) {
    result.textContent = "Result: Invalid input";
    return;
  }

  if (type === "temperature") {
    result.textContent = "Result: " + convertTemperature(value, from, to).toFixed(2);
  } else {
    const rateFrom = conversionRates[type][from];
    const rateTo = conversionRates[type][to];
    const converted = value / rateFrom * rateTo;
    result.textContent = "Result: " + converted.toFixed(2);
  }
}

function convertTemperature(value, from, to) {
  if (from === to) return value;
  let celsius;

  if (from === "celsius") celsius = value;
  else if (from === "fahrenheit") celsius = (value - 32) * 5/9;
  else if (from === "kelvin") celsius = value - 273.15;

  if (to === "celsius") return celsius;
  else if (to === "fahrenheit") return celsius * 9/5 + 32;
  else if (to === "kelvin") return celsius + 273.15;
}

