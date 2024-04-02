const models = require("../modelsProviders");

const getHistoryOrderByBuyer = async (req, res) => {
  try {
    const order = await models.order.getHistoryOrderByBuyer(req.params.id);
    if (order == null) {
      res.sendStatus(404);
    } else {
      res.json(order);
    }
  } catch (err) {
    console.error(err);
  }
};

const addOrder = async (req, res) => {
  try {
    const orderDetails = req.body;
    const result = await models.order.addOrder(orderDetails);
    res
      .status(201)
      .json({ orderId: result.insertId, message: "Order added successfully" });
  } catch (err) {
    console.error("Error adding order:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  getHistoryOrderByBuyer,
  addOrder,
};
