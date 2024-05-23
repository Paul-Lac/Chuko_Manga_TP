/* eslint-disable prettier/prettier */
/* ************************************************************************* */
// Register Data Managers for Tables
/* ************************************************************************* */

// Import the manager modules responsible for handling data operations on the tables
const AdvertImagesManager = require("./models/advertImagesManager");
const AdvertsManager = require("./models/AdvertsManager");
const AddressManager = require("./models/AddressManager");
const ConditionsManager = require("./models/ConditionsManager");
const FeedbacksManager = require("./models/FeedbacksManager");
const GenresManager = require("./models/GenresManager");
const MangasManager = require("./models/MangasManager");
const OrdersManager = require("./models/OrdersManager");
const PublishersManager = require("./models/PublishersManager");
const UsersManager = require("./models/UsersManager");
const VolumesManager = require("./models/VolumesManager");

const managers = [
  // Add other managers here
  AdvertsManager,
  AdvertImagesManager,
  AddressManager,
  ConditionsManager,
  FeedbacksManager,
  GenresManager,
  MangasManager,
  OrdersManager,
  PublishersManager,
  UsersManager,
  VolumesManager,
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
