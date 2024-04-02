const validateAddress = (req, res, next) => {
  // eslint-disable-next-line camelcase
  const { country, nameAdress, numberStreet, zipCode, city } = req.body;
  const errors = [];
  if (country == null) {
    errors.push({
      field: "country",
      message: "The field 'country' is required",
    });
  }
  if (nameAdress === null) {
    errors.push({
      field: "name_adress",
      message: "The field 'name_adress' is required",
    });
  }
  if (numberStreet == null) {
    errors.push({
      field: "number_street",
      message: "The field 'number_street' is required",
    });
  }
  if (zipCode == null) {
    errors.push({
      field: "zip_Code",
      message: "The field 'zip_Code' is required",
    });
  }

  if (city == null) {
    errors.push({ field: "city", message: "The field 'city' is required" });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = validateAddress;
