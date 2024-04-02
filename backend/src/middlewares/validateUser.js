const validateUser = (req, res, next) => {
  const { firstname, lastname, email, phone, pseudo } = req.body;
  const errors = [];

  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+.[a-z]{2,3}/;

  if (firstname == null) {
    errors.push({
      field: "firstname",
      message: "The field 'firstname' is required",
    });
  }
  if (lastname == null) {
    errors.push({
      field: "lastname",
      message: "The field 'lastname' is required",
    });
  }
  if (email == null) {
    errors.push({ field: "email", message: "The field 'email' is required" });
  } else if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  }
  if (phone == null) {
    errors.push({ field: "phone", message: "The field 'phone' is required" });
  }
  if (pseudo == null) {
    errors.push({ field: "pseudo", message: "The field 'pseudo' is required" });
  }

  if (errors.length) {
    console.error(errors);
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = validateUser;
