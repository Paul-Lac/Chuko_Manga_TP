const AbstractManager = require("./AbstractManager");

class FeedbacksManager extends AbstractManager {
  constructor() {
    super({ table: "feedback" });
  }

  async findFeedbacksById(id) {
    const [rows] = await this.database.query(
      `SELECT u.pseudo, u.picture AS picture_buyer, f.user_id, f.created_on, f.user_buyer, f.rating, f.\`comment\`, 
      (SELECT AVG(feedback.rating) FROM feedback WHERE user_id = ?) AS average_rating
       FROM feedback as f
      INNER JOIN user as u ON f.user_buyer = u.id
      WHERE user_id=?;`,
      [id, id]
    );
    return rows;
  }
}

module.exports = FeedbacksManager;
