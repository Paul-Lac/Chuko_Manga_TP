const Joi = require("joi");

const schema = Joi.object({
  id_user_buy: Joi.number().required(),
  total_price: Joi.string().required(),
  order_date: Joi.date().required(),
  status_order: Joi.string().required(),
  feedback_order: Joi.number().required(),
  advert_id: Joi.number().required(),
  user_id: Joi.number().required(),
}).options({ abortEarly: false });

const validateOrder = (req, res, next) => {
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

module.exports = validateOrder;
