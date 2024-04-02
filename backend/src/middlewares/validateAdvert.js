/* eslint-disable import/no-unresolved */
const Joi = require("joi");

const advertSchema = Joi.object({
  titleSearchManga: Joi.string().max(40).required(),
  description: Joi.string().max(255).required(),
  articleConditionId: Joi.number().required(),
  price: Joi.number().required(),
  mangaId: Joi.number(),
  volumeId: Joi.number(),
  batch: Joi.number().required(),
  alert: Joi.number().required(),
  publicationDate: Joi.date().required(),
  userId: Joi.number().required(),
});

const validateAdvert = (req, res, next) => {
  const {
    titleSearchManga,
    description,
    price,
    articleConditionId,
    mangaId,
    volumeId,
    batch,
    alert,
    publicationDate,
    userId,
  } = req.body;
  const { error } = advertSchema.validate(
    {
      titleSearchManga,
      description,
      price,
      articleConditionId,
      mangaId,
      volumeId,
      batch,
      alert,
      publicationDate,
      userId,
    },
    { abortEarly: false }
  );

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

module.exports = validateAdvert;
