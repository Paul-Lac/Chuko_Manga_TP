/* eslint-disable prettier/prettier */
const AbstractManager = require("./AbstractManager");

class AdvertsManager extends AbstractManager {
  constructor() {
    super({ table: "advert" });
  }

  async getAdvertById(id) {
    const [rows] = await this.database.query(
      `SELECT advert.id as advert_id, advert.price, advert.title_advert, advert.description, 
      article_condition.name_condition, advert.batch, advert.publication_date_advert, 
      manga.id as manga_id, manga.title as manga_title, volume.title as volume_title, volume.ISBN, 
      user.pseudo, user.id as user_id, user.picture as user_picture, 
      joint_table.average, joint_table.feedback_nber, 
      JSON_ARRAYAGG(advert_image.image_path) as image_paths
      FROM ${this.table} 
      LEFT JOIN manga ON advert.manga_id=manga.id
      JOIN article_condition ON advert.article_condition_id=article_condition.id
      LEFT JOIN volume ON advert.volume_id=volume.id
      LEFT JOIN advert_image ON advert.id=advert_image.advert_id 
      JOIN user ON advert.user_id=user.id
      LEFT JOIN (SELECT user.id as rated_user_id, AVG(feedback.rating) as average, COUNT(feedback.rating) as feedback_nber
            FROM user
            LEFT JOIN feedback ON user.id = feedback.user_id
            GROUP BY user.id) as joint_table ON user.id=joint_table.rated_user_id
      WHERE advert.id = ?`,
      [id]
    );
    return rows;
  }

  async getAdvertsBySeller(id) {
    const [rows] = await this.database.query(
      `SELECT advert.id as id, advert.title_advert, advert.price, advert.publication_date_advert, article_condition.name_condition, advert_image.image_path, user.id as user_id, user.pseudo, user.picture as user_picture, COALESCE(joint_table.average, 0) as average, COALESCE(joint_table.feedback_nber, 0) as feedback_nber
    FROM ${this.table}
    LEFT JOIN advert_image ON advert.id=advert_image.advert_id AND advert_image.is_primary=1
    JOIN article_condition ON advert.article_condition_id=article_condition.id
    JOIN user ON advert.user_id=user.id 
    LEFT JOIN (SELECT feedback.user_id, AVG(feedback.rating) as average, COUNT(feedback.rating) as feedback_nber
              FROM feedback
              GROUP BY feedback.user_id) as joint_table ON user.id=joint_table.user_id
    WHERE advert.user_id = ?
    ORDER BY advert.publication_date_advert DESC`,
      [id]
    );
    return rows;
  }

  async addAdvert(advert) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (price, description, batch, title_advert, publication_date_advert, user_id, volume_id, article_condition_id, manga_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        advert.price,
        advert.description,
        advert.batch,
        advert.titleSearchManga,
        advert.publicationDate,
        advert.userId,
        advert.volumeId,
        advert.articleConditionId,
        advert.mangaId,
      ]
    );
    return result.insertId;
  }

  async findAdvertCards({
    batch,
    genreIds,
    conditionIds,
    minPrice,
    maxPrice,
    searchQuery,
    searchVolume,
  }) {
    let whereConditions = " WHERE a.delete_advert = 0";
    const queryParams = [];

    if (batch !== null && batch !== undefined) {
      whereConditions += batch ? " AND a.batch = 1" : " AND a.batch = 0";
    }

    if (searchQuery) {
      whereConditions += " AND a.title_advert LIKE ?";
      queryParams.push(`%${searchQuery}%`);
    }

    if (genreIds && genreIds.length > 0) {
      whereConditions += " AND m.genre_id IN (?)";
      queryParams.push(genreIds);
    }

    if (conditionIds && conditionIds.length > 0) {
      // vérifier si conditionId est un tableau non vide
      whereConditions += " AND a.article_condition_id IN (?)";
      queryParams.push(conditionIds); // ajouter le tableau conditionId aux paramètres de requête
    }

    if (minPrice !== undefined && minPrice !== null) {
      whereConditions += " AND a.price >= ?";
      queryParams.push(minPrice);
    }

    if (maxPrice !== undefined && maxPrice !== null) {
      whereConditions += " AND a.price <= ?";
      queryParams.push(maxPrice);
    }

    if (searchVolume) {
      whereConditions += " AND a.volume_id = ?";
      queryParams.push(searchVolume);
    }

    const query = `
    SELECT a.id, a.title_advert, a.batch, a.price, a.volume_id,  c.name_condition, 
    i.image_path, u.pseudo, u.picture as user_picture, m.genre_id,
    ROUND(joint_table.average, 1) as average, joint_table.feedback_nber, a.publication_date_advert
    FROM ${this.table} as a
    LEFT JOIN advert_image as i ON a.id=i.advert_id AND i.is_primary=1
    JOIN article_condition as c ON a.article_condition_id=c.id
    JOIN user as u ON a.user_id=u.id 
   LEFT JOIN manga as m ON a.manga_id = m.id 
    JOIN (SELECT u.pseudo as rated_pseudo, ROUND(AVG(f.rating), 1) as average, COUNT(f.rating) as feedback_nber
          FROM user as u
          LEFT JOIN feedback as f ON u.id = f.user_id
          GROUP BY u.pseudo) as joint_table ON u.pseudo=joint_table.rated_pseudo
    ${whereConditions}
    ORDER BY a.publication_date_advert DESC;
  `;

    const [rows] = await this.database.query(query, queryParams);
    return rows;
  }

  async removeAdvert(id) {
    try {
      // Delete images from advert_image table
      await this.database.query(
        `DELETE FROM advert_image WHERE advert_id = ?`,
        [id]
      );
      // Delete advert form advert table
      const [result] = await this.database.query(
        `DELETE FROM ${this.table} WHERE id = ?`,
        [id]
      );
      return result.affectedRows > 0 ? id : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = AdvertsManager;
