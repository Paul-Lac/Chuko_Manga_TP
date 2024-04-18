const models = require("../modelsProviders");

const getAdvertById = async (req, res) => {
  try {
    const advert = await models.advert.getAdvertById(req.params.id);
    // console.info("dans le back:", advert);
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
  // console.info("req.body is:", req.body);
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

// const createAdvert = async (req, res) => {
//   // console.info("image1 uploaded:", req.files["image1"][0]);
//   // console.info("image2 uploaded:", req.files["image2"][0]);
//   // console.info("image3 uploaded:", req.files["image3"][0]);
//   console.info("req.body is:", req.body);
//   const advert = req.body;
//   const imageId = [];
//   let imageId1 = null;
//   let imageId2 = null;
//   let imageId3 = null;
//   try {
//     const advertId = await models.advert.addAdvert(advert);
//     if (advertId !== null) {
//       if (req.files.image1) {
//         imageId1 = await models.advert_image.addImage({
//           advert_id: advertId,
//           image_path: `/static/${req.files.image1[0].filename}`,
//           is_primary: 1,
//         });
//         imageId.push(imageId1);
//       }
//       if (req.files.image2) {
//         imageId2 = await models.advert_image.addImage({
//           advert_id: advertId,
//           image_path: `/static/${req.files.image2[0].filename}`,
//           is_primary: 0,
//         });
//         imageId.push(imageId2);
//       }
//       if (req.files.image3) {
//         imageId3 = await models.advert_image.addImage({
//           advert_id: advertId,
//           image_path: `/static/${req.files.image3[0].filename}`,
//           is_primary: 0,
//         });
//         imageId.push(imageId3);
//       }
//     } else {
//       res.status(500).json({ error: "Failed to create advert" });
//     }
//     if (advertId !== null || imageId !== null) {
//       res.status(201).json({ advertId, imageId });
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

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
  console.info("req.query !!!!", req.query);

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
