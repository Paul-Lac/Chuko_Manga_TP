const Joi = require("joi");

const schema = Joi.object({
  pseudo: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  picture: Joi.string().optional(),
}).options({ abortEarly: false });

const validateUserUpdate = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(422).json({ validationErrors: error.details });
    error.details.forEach((errorItem) => {
      console.error("Error list :", errorItem.message);
    });
  } else {
    console.info("Data validated successfully");
    next();
  }
};

module.exports = validateUserUpdate;
