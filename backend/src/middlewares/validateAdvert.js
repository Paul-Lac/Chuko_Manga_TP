const Joi = require("joi");

const advertSchema = Joi.object({
  titleSearchManga: Joi.string().max(40).required(),
  description: Joi.string().max(255).required(),
  articleConditionId: Joi.number().required(),
  price: Joi.number().required(),
  mangaId: Joi.number(),
  volumeId: Joi.number(),
  batch: Joi.number().required(),
  publicationDate: Joi.date().required(),
  userId: Joi.number().required(),
}).options({ abortEarly: false });

const validateAdvert = (req, res, next) => {
  const validationResult = advertSchema.validate(req.body);

  if (validationResult.error) {
    res.status(422).json({ validationErrors: validationResult.error.details });
    validationResult.error.details.forEach((errorItem) => {
      console.info("Error list :", errorItem.message);
    });
  } else {
    console.info("Data validated successfully:", req.body);
    next();
  }
};

module.exports = validateAdvert;
