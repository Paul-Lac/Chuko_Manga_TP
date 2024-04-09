const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
}).options({ abortEarly: false });

const validateLogin = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(422).json({ validationErrors: error.details });
    error.details.forEach((errorItem) => {
      console.info("Error list :", errorItem.message);
    });
  } else {
    console.info("Data validated successfully:", req.body);
    next();
  }
};

module.exports = validateLogin;
