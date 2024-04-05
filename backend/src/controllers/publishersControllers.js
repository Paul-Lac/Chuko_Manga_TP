const models = require("../modelsProviders");

const getAllPublishers = (req, res) => {
  models.publishing_house
    .readAll()
    .then((publishers) => res.json(publishers))
    .catch((err) => console.error(err));
};

module.exports = {
  getAllPublishers,
};
