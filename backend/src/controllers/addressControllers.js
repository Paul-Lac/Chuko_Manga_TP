const models = require("../modelsProviders");

const getAddressbyId = async (req, res) => {
  try {
    const user = await models.address.getAddressbyId(req.params.id);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    console.error(err);
  }
};

const addAddressbyId = async (req, res) => {
  try {
    const address = req.body;
    const userId = req.params.id;
    const result = await models.address.addAddressbyId(address, userId);
    res.status(201).json({ result });
  } catch (err) {
    console.error(err);
  }
};

const updateAddress = async (req, res) => {
  try {
    // Récupère l'id de l'user et l'id de l'adresse
    const { userId } = req.params;
    const { addressId } = req.params;
    // Nouvelles données de l'adresse à mettre à jour
    const address = req.body;
    const result = await models.address.updateAddress(address, addressId);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Aucune adresse n'a été mise à jour." });
    } else {
      const result2 = await models.address.updateAddressUser(userId, addressId);
      res.status(204).json({ result, result2 });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  getAddressbyId,
  addAddressbyId,
  updateAddress,
};
