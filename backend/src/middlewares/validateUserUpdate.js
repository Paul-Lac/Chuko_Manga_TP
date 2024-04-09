const Joi = require("joi");

const schema = Joi.object({
  pseudo: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
}).options({ abortEarly: false });

const validateUserUpdate = (req, res, next) => {
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

module.exports = validateUserUpdate;
