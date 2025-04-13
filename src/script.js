const yearSelect = document.getElementById("yearSelect");
const makeSelect = document.getElementById("makeSelect");
const modelSelect = document.getElementById("modelSelect");

let carData = [];

fetch(".data/car-dataset.json")
  .then((res) => res.json())
  .then((data) => {
    carData = data;
    populateYears(data);
  });

function populateYears(data) {
  const years = [...new Set(data.map((car) => car.year))].sort((a, b) => b - a);
  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  });
}

yearSelect.addEventListener("change", () => {
  const selectedYear = parseInt(yearSelect.value);
  const makes = [
    ...new Set(
      carData
        .filter((car) => car.year === selectedYear)
        .map((car) => car.Manufacturer.toLowerCase())
    ),
  ];
  makeSelect.innerHTML = '<option value="">Vehicle Make</option>';
  modelSelect.innerHTML = '<option value="">Vehicle Model</option>';
  modelSelect.disabled = true;

  makes.forEach((make) => {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = capitalize(make);
    makeSelect.appendChild(option);
  });

  makeSelect.disabled = false;
});

makeSelect.addEventListener("change", () => {
  const selectedYear = parseInt(yearSelect.value);
  const selectedMake = makeSelect.value.toLowerCase();
  const models = [
    ...new Set(
      carData
        .filter(
          (car) =>
            car.year === selectedYear &&
            car.Manufacturer.toLowerCase() === selectedMake
        )
        .map((car) => car.model)
    ),
  ];

  modelSelect.innerHTML = '<option value="">Vehicle Model</option>';
  models.forEach((model) => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    modelSelect.appendChild(option);
  });

  modelSelect.disabled = false;
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
