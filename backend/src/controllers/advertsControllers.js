const models = require("../modelsProviders");

const getAdvertById = async (req, res) => {
  try {
    const advert = await models.advert.getAdvertById(req.params.id);
    if (advert == null) {
      res.sendStatus(404);
    } else {
      res.json(advert);
    }
  } catch (err) {
    console.error(err);
  }
};

const getAdvertsBySeller = async (req, res) => {
  try {
    const adverts = await models.advert.getAdvertsBySeller(req.params.id);
    if (adverts == null) {
      res.sendStatus(404);
    } else {
      res.json(adverts);
    }
  } catch (err) {
    console.error(err);
  }
};

const createAdvert = async (req, res) => {
  try {
    const advert = req.body;
    const advertId = await models.advert.addAdvert(advert);
    if (!advertId) {
      return res.status(500).json({ error: "Failed to create advert" });
    }
    const promises = [];
    for (let i = 1; i <= 3; i += 1) {
      const file = req.files[`image${i}`];
      if (file) {
        const isPrimary = i === 1 ? 1 : 0;
        const promise = models.advert_image.addImage({
          advert_id: advertId,
          image_path: `/static/${file[0].filename}`,
          is_primary: isPrimary,
        });
        promises.push(promise);
      }
    }
    const imageId = await Promise.all(promises);
    return res.status(201).json({ advertId, imageId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAdvertCards = async (req, res) => {
  const {
    batch,
    genreIds,
    conditionIds,
    minPrice,
    maxPrice,
    searchQuery,
    searchVolume,
  } = req.query;

  let isBatch = null;
  if (batch !== undefined) {
    if (batch === "true") {
      isBatch = true;
    } else if (batch === "false") {
      isBatch = false;
    }
  }

  try {
    const adverts = await models.advert.findAdvertCards({
      batch: isBatch,
      genreIds,
      conditionIds,
      minPrice,
      maxPrice,
      searchQuery,
      searchVolume,
    });

    return res.json(adverts);
  } catch (error) {
    console.error("Error retrieving advert cards:", error);
    return res.status(500).json({ error: "Internal servor error" });
  }
};

const deleteAdvert = async (req, res) => {
  try {
    const advert = await models.advert.removeAdvert(req.params.id);
    if (!advert) {
      return res.status(404).send({ error: "Advert not found" });
    }
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal servor error" });
  }
};

module.exports = {
  getAdvertById,
  getAdvertsBySeller,
  getAdvertCards,
  createAdvert,
  deleteAdvert,
};
