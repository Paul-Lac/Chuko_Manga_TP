const AbstractManager = require("./AbstractManager");

class OrdersManager extends AbstractManager {
  constructor() {
    super({ table: "order" });
  }

  async getHistoryOrderByBuyer(id) {
    const [rows] = await this.database.query(
      `SELECT total_price, order_date, status_order, title_advert, advert_image.image_path, article_condition.name_condition 
      FROM \`order\` as o
      JOIN advert on advert.id = o.advert_id
      LEFT JOIN advert_image ON advert.id=advert_image.advert_id AND advert_image.is_primary=1
      LEFT JOIN article_condition ON advert.article_condition_id=article_condition.id
      WHERE id_user_buy = ?`,
      [id]
    );
    return rows;
  }

  async addOrder(orderDetails) {
    const connection = await this.database.getConnection();
    try {
      await connection.beginTransaction();

      // Ajout de la commande
      const sqlOrder = `INSERT INTO \`${this.table}\` 
                        (id_user_buy, total_price, order_date, status_order, feedback_order, advert_id, user_id) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const valuesOrder = [
        orderDetails.id_user_buy,
        orderDetails.total_price,
        orderDetails.order_date,
        orderDetails.status_order,
        orderDetails.feedback_order,
        orderDetails.advert_id,
        orderDetails.user_id,
      ];
      const [resultOrder] = await connection.query(sqlOrder, valuesOrder);

      // Mise à jour de l'annonce comme étant supprimée
      const sqlAdvert = `UPDATE \`advert\` SET delete_advert = true WHERE id = ?`;
      const valuesAdvert = [orderDetails.advert_id];
      await connection.query(sqlAdvert, valuesAdvert);

      await connection.commit();
      return resultOrder;
    } catch (error) {
      await connection.rollback();
      throw new Error(`Error processing transaction: ${error.message}`);
    } finally {
      connection.release();
    }
  }
}
module.exports = OrdersManager;
