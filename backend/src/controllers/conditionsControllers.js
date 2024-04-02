const models = require("../modelsProviders");

const getAllConditions = (req, res) => {
  models.article_condition
    .readAll()
    .then((conditions) => res.json(conditions))
    .catch((err) => console.error(err));
};

module.exports = {
  getAllConditions,
};
