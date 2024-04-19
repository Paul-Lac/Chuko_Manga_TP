/* eslint-disable no-restricted-syntax */
const models = require("../modelsProviders");

// const getAllUsers = (req, res) => {
//   models.user
//     .findAll()
//     .then((users) => res.json(users))
//     .catch((err) => console.error(err));
// };

const addUser = async (req, res) => {
  const user = req.body;

  try {
    // Insert the item into the database
    const insertId = await models.user.createUser(user);
    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await models.user.getUserById(req.params.id);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    console.error(err);
  }
};

const getUserProfilById = async (req, res) => {
  try {
    const user = await models.user.getUserProfilById(req.params.id);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    console.error(err);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (req.file) {
    user.picture = `/static/${req.file.filename}`;
  }
  try {
    user.id = id;
    const result = await models.user.updateUser(user);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  addUser,
  getUserById,
  getUserProfilById,
  updateUser,
};
