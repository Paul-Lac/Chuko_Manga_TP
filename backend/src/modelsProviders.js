/* eslint-disable prettier/prettier */
/* ************************************************************************* */
// Register Data Managers for Tables
/* ************************************************************************* */

// Import the manager modules responsible for handling data operations on the tables
const ItemManager = require("./models/ItemManager");
// ------
const CharactersManager = require("./models/CharactersManager");
// const housesManager = require("./models/housesManager");
const MangasManager = require("./models/MangasManager");
const UsersManager = require("./models/UsersManager");
const AdvertsManager = require("./models/AdvertsManager");
const ConditionsManager = require("./models/ConditionsManager");
const OrdersManager = require("./models/OrdersManager");
const AddressManager = require("./models/AddressManager");
const VolumesManager = require("./models/VolumesManager");
const AdvertImagesManager = require("./models/advertImagesManager");

const managers = [
  ItemManager,
  // Add other managers here
  CharactersManager,
  // housesManager,
  MangasManager,
  AdvertsManager,
  UsersManager,
  ConditionsManager,
  OrdersManager,
  AddressManager,
  VolumesManager,
  AdvertImagesManager,
];

// Create an empty object to hold data managers for different tables
const models = {};

// Register each manager as data access point for its table
managers.forEach((ManagerClass) => {
  const manager = new ManagerClass();
  models[manager.table] = manager;
});

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(models, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
