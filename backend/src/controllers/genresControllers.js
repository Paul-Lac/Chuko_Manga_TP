const models = require("../modelsProviders");

const getAllGenres = (req, res) => {
  models.genre
    .readAll()
    .then((genres) => res.json(genres))
    .catch((err) => console.error(err));
};

module.exports = {
  getAllGenres,
};
