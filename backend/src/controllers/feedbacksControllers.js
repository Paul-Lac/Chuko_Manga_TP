const models = require("../modelsProviders");

const getFeedbacksById = async (req, res) => {
  try {
    const user = await models.feedback.findFeedbacksById(req.params.id);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    console.error(err);
  }
};
module.exports = {
  getFeedbacksById,
};
