// Imports your SCSS stylesheet
import "./styles/index.scss";
import data from "./car-dataset.json";

const carData = new Array(data); // golbal variables/arrays
const disableMake = document.querySelector("#make");
const disableModel = document.querySelector("#model");

console.log(carData, "Car Data");
console.log(carData[0].length, "Car Data");

class Main {
  constructor() {
    //arrays/var for car data
    this.yearArray = [];
    this.makeArray = [];
    this.modelArray = [];

    this.getYearInput = null;
    this.getMakeInput = null;
    this.getModelInput = null;

    //disable other options unil selections are made
    disableMake.disabled = true;
    disableModel.disabled = true;

    //start app & use state  management
    this.setInit = false;
    this.setState = 0;
    this.init();
  }

  init() {
    this.setInit = true;
    console.log("Application Successfully Started:", this.setInit);

    const exitDevMode = document.querySelector("#exit-dev-mode");
    const exitDevViewer = document.querySelector("#results-section");
    exitDevMode.addEventListener("click", () => {
      exitDevMode.style.display = "none";
      exitDevViewer.style.display = "none";
    });

    this.getYears();
  }

  buildDom() {
    //building dom elements for JSON data
    if (this.setState === 0) {
      console.log("DOM >>> Years Appended");
      console.log("Dropdown Years Total:", this.yearArray.length);
      this.yearArray.forEach((year) => {
        //loop through array
        let option = document.createElement("option");
        option.textContent = year;
        option.setAttribute("value", year);

        console.log(option);

        const findYearDropDown = document.querySelector("#year");
        findYearDropDown
          ? findYearDropDown.append(option)
          : console.error("Element not found");
      });
    } else if (this.setState === 1) {
      console.log("DOM >>> Make Appended");

      disableMake.disabled = false;
      disableMake.style.cursor = "pointer";

      console.log("Dropdown Make Total:", this.makeArray.length);
      this.makeArray.forEach((make) => {
        //loop through array for data
        let option = document.createElement("option");
        option.textContent = make;
        option.setAttribute("value", make);

        console.log(option);
        const findMakeDropDown = document.querySelector("#make");
        findMakeDropDown
          ? findMakeDropDown.append(option)
          : console.error("Element not found");
      });
    } else if (this.setState == 2) {
      console.log("DOM >>> Model Appended");

      disableModel.disabled = false;
      disableModel.style.cursor = "pointer";

      console.log("Dropdown Models Total:", this.modelArray.length);
      this.modelArray.forEach((model) => {
        let option = document.createElement("option");
        option.textContent = model;
        option.setAttribute("value", model);

        console.log(option);
        const findModelDropDown = document.querySelector("#model");
        findModelDropDown
          ? findModelDropDown.append(option)
          : console.error("Element not found");
      });
    }
  }

  getYears() {
    console.log("Fetch Years");

    const findYearDropDown = document.querySelector("#year");
    const findMakeDropDown = document.querySelector("#make");
    findYearDropDown.addEventListener("change", (e) => {
      this.getYearInput = e.target.value;
      console.log("Year Input Stored", this.getYearInput);

      this.setState = 1;
      if (this.setState === 1) {
        findMakeDropDown.innerHTML =
          '<option value="select-a-make">select a make</option>';
        this.getMakes();
      }
    });

    // create new array for years
    const storeYears = [];
    carData[0].forEach((items) => {
      storeYears.push(items.year);
    });

    // organize the years array to be in order
    storeYears.sort();

    // remove repeated arrays after they've been sorted
    const filterYears = [...new Set(storeYears)];

    // reverse the array so the highest year is at index value 0
    filterYears.reverse();

    // store the years into an instance array
    this.yearArray = filterYears;
    console.log(this.yearArray, "Years Ready for Use!");

    this.buildDom();
  }

  getMakesA() {
    console.log("Fetch Makes");

    const findMakeDropDown = document.querySelector("#make");
    const findModelDropDown = document.querySelector("#model");
    findMakeDropDown.addEventListener("change", (e) => {
      this.getMakeInput = e.target.value;
      console.log("Make Input Stored:", this.getMakeInput);

      this.setState = 2;
      if (this.setState === 2) {
        findModelDropDown.innerHTML =
          '<option value="select-a-model">select a model</option>';
        this.getModels();
      }
    });

    //new array for the make
    const filterMakesByYear = [
      ...new Set(data.filter((car) => car.year == this.getYearInput)),
    ];

    const storeMakes = [];
    //find in the carData JSON
    filterMakesByYear.forEach((items) => {
      //push all makes to the new array
      storeMakes.push(items.Manufacturer);
    });

    //sort the array so they're not random
    storeMakes.sort();

    // takes out all repeated makes
    const noRepeatMakes = [...new Set(storeMakes)];

    this.makeArray = noRepeatMakes;
    console.log(this.makeArray, "Makes Ready for Use!");

    this.buildDom();
  }

  getModels() {
    console.log("Fetch Models");

    const findModelDropDown = document.querySelector("#model");
    findModelDropDown.addEventListener("change", (e) => {
      this.getModelInput = e.target.value;
      console.log("Model Input Stored:", this.getModelInput);

      this.setState = 3;
      if (this.setState === 3) {
        const car = new CaretPosition(
          this.getYearInput,
          this.getMakeInput,
          this.getModelInput
        );
        car.displaySelectedCar();
      }
    });

    const storeModels = [];
    // new array for make
    const filterModelsByYear = Array.from(
      new Set(data.filter((car) => car.year == this.getYearInput))
    );
    const filterModelsByMakes = [
      ...new Set(
        filterModelsByYear.filter(
          (car) => car.Manufacturer == this.getMakeInput
        )
      ),
    ];
    //find in the JSON file for car data
    filterModelsByMakes.forEach((items) => {
      // push all filtered models to the new array made
      storeModels.push(items.model);
    });

    storeModels.sort();

    //filter all repeated models into a new array
    const noRepeatModels = [...new Set(storeModels)];

    this.modelArray = noRepeatModels;
    console.log(this.modelArray, "Models Ready for Use");

    this.buildDom();
  }
}

class Year {
  constructor(year) {
    this.year = year;
    this.finalArray = [];
  }
}

class Make extends Year {
  constructor(year, make) {
    super(year);
    this.make = make;
  }
}

class Model extends Make {
  constructor(year, make, model) {
    super(year, make);
    this.model = model;
  }
}

class Car extends Model {
  constructor(year, make, model) {
    super(year, make, model);
  }

  displaySelectedCar() {
    const filterFinalByYear = Array.from(
      new Set(data.filter((car) => car.year == this.year))
    );

    const filterFinalByMakes = Array.from(
      new Set(filterFinalByYear.filter((car) => car.Manufacturer == this.make))
    );

    const filterFinalByModel = [
      ...new Set(filterFinalByMakes.filter((car) => car.model == this.model)),
    ];

    filterFinalByModel.sort();
    this.finalArray = filterFinalByModel;
    let length = this.finalArray.length;

    this.displayList();
  }

  displayList() {
    console.log("Results", this.finalArray);
    const list = document.querySelector("#list-results");
    list.innerHTML = "<li><h3>Results Listed Here - Dev Mode<h3></li>";

    this.finalArray.map((item) => {
      //use data array
      let li = document.createElement("li");
      li.textContent = `Price: $${item.price}    | Transmission: ${item.transmission}    | Mileage: ${item.mileage}`;

      list ? list.append(li) : console.error("Element Not Found");
    });

    console.log(
      `You searched for a ${this.year} ${this.make}, ${this.model}. Excellent!`
    );
  }
}

const main = new Main();
