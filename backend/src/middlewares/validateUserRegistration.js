const Joi = require("joi");

const registrationSchema = Joi.object({
  pseudo: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
}).options({ abortEarly: false });

const validateUserRegistration = (req, res, next) => {
  const validationResult = registrationSchema.validate(req.body);

  if (validationResult.error) {
    res.status(422).json({ validationErrors: validationResult.error.details });
    validationResult.error.details.forEach((errorItem) => {
      console.error("Error list :", errorItem.message);
    });
  } else {
    console.info("Data validated successfully");
    next();
  }
};

module.exports = validateUserRegistration;
