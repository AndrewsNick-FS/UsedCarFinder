// Imports your SCSS stylesheet
import "./styles/style.scss";
import data from "./car-dataset.json";

const carData = new Array(data); // golbal variables/arrays
const disableMake = document.querySelector("#make");
const disableModel = document.querySelector("#model");

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

    this.getYears();
  }

  buildDom() {
    //building dom elements for JSON data
    if (this.setState === 0) {
      this.yearArray.forEach((year) => {
        //loop through array
        let option = document.createElement("option");
        option.textContent = year;
        option.setAttribute("value", year);

        const findYearDropDown = document.querySelector("#year");
        findYearDropDown
          ? findYearDropDown.append(option)
          : console.error("Element not found");
      });
    } else if (this.setState === 1) {
      disableMake.disabled = false;
      disableMake.style.cursor = "pointer";

      this.makeArray.forEach((make) => {
        //loop through array for data
        let option = document.createElement("option");
        option.textContent = make;
        option.setAttribute("value", make);

        const findMakeDropDown = document.querySelector("#make");
        findMakeDropDown
          ? findMakeDropDown.append(option)
          : console.error("Element not found");
      });
    } else if (this.setState == 2) {
      disableModel.disabled = false;
      disableModel.style.cursor = "pointer";

      this.modelArray.forEach((model) => {
        let option = document.createElement("option");
        option.textContent = model;
        option.setAttribute("value", model);

        const findModelDropDown = document.querySelector("#model");
        findModelDropDown
          ? findModelDropDown.append(option)
          : console.error("Element not found");
      });
    }
  }

  getYears() {
    const findYearDropDown = document.querySelector("#year");
    const findMakeDropDown = document.querySelector("#make");
    findYearDropDown.addEventListener("change", (e) => {
      this.getYearInput = e.target.value;
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
    this.buildDom();
  }

  getMakes() {
    const findMakeDropDown = document.querySelector("#make");
    const findModelDropDown = document.querySelector("#model");
    findMakeDropDown.addEventListener("change", (e) => {
      this.getMakeInput = e.target.value;

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

    this.buildDom();
  }

  getModels() {
    const findModelDropDown = document.querySelector("#model");
    findModelDropDown.addEventListener("change", (e) => {
      this.getModelInput = e.target.value;

      this.setState = 3;
      if (this.setState === 3) {
        const car = new Car(
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

    console.log(this.finalArray);
  }
}

const main = new Main();
