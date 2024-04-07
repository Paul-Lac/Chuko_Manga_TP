/* eslint-disable prettier/prettier */
const AbstractManager = require("./AbstractManager");

class AdvertsManager extends AbstractManager {
  constructor() {
    super({ table: "advert" });
  }

  // async findCards() {
  //   const [rows] = await this.database.query(
  //     `SELECT advert.title_search_manga, advert.price, article_condition.name_condition, advert_image.image_path, user.pseudo, user.picture as user_picture, joint_table.average, joint_table.feedback_nber
  //     FROM ${this.table}
  //     LEFT JOIN advert_image ON advert.id=advert_image.advert_id AND advert_image.is_primary=1
  //     JOIN article_condition ON advert.article_condition_id=article_condition.id
  //     JOIN user ON advert.user_id=user.id
  //     JOIN (SELECT user.pseudo as rated_pseudo, AVG(feedback.rating) as average, COUNT(feedback.rating) as feedback_nber
  // 	    FROM user
  // 	    JOIN feedback ON user.id = feedback.user_id
  // 	    GROUP BY user.pseudo) as joint_table ON user.pseudo=joint_table.rated_pseudo;`
  //   );

  //   return rows;
  // }

  async findAdvertQuery(searchQuery) {
    console.info(`Manager Search query: ${searchQuery}`);

    // Constructing the SQL query dynamically
    const searchTerms = searchQuery.split(" "); // Split the search query into individual terms
    const likeConditions = searchTerms.map(
      () => `(title_search_manga LIKE ? OR description LIKE ?)`
    ); // Construct LIKE conditions for each term
    const sqlQuery = `SELECT * FROM advert WHERE ${likeConditions.join(
      " OR "
    )}`; // Join LIKE conditions with OR operator
    const queryParams = searchTerms.flatMap((term) => [
      `%${term}%`,
      `%${term}%`,
    ]); // Construct parameter array for each term

    const [rows] = await this.database.query(sqlQuery, queryParams);
    return rows;
  }

  async getAdvertById(id) {
    const [rows] = await this.database.query(
      `SELECT advert.id as advert_id, advert.price, advert.title_search_manga, advert.description, 
      article_condition.name_condition, advert.batch, advert.view_number, advert.publication_date_advert, 
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
      `SELECT advert.id as advert_id, advert.title_search_manga, advert.price, advert.publication_date_advert, article_condition.name_condition, advert_image.image_path, user.id as user_id, user.pseudo, user.picture as user_picture, COALESCE(joint_table.average, 0) as average, COALESCE(joint_table.feedback_nber, 0) as feedback_nber
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
      `INSERT INTO ${this.table} (price, description, alert, batch, title_search_manga, publication_date_advert, user_id, volume_id, article_condition_id, manga_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        advert.price,
        advert.description,
        advert.alert,
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

  async findAdverts({
    batch,
    genreId,
    conditionName,
    minPrice,
    maxPrice,
    searchQuery,
    searchVolume,
  }) {
    let whereConditions = "WHERE 1=1 AND advert.delete_advert = 0";
    const queryParams = [];

    if (batch !== null && batch !== undefined) {
      whereConditions += batch ? " AND advert.batch=1" : " AND advert.batch=0";
    }

    if (searchQuery) {
      whereConditions +=
        " AND (advert.title_search_manga LIKE ? OR manga.description LIKE ?)";
      const searchPattern = `%${searchQuery}%`;
      queryParams.push(searchPattern, searchPattern);
    } else if (batch !== null) {
      if (batch === true) {
        whereConditions += " AND advert.batch=1";
      } else {
        whereConditions += " AND advert.batch=0";
      }
    }

    if (genreId) {
      whereConditions += " AND manga.genre_id = ?";
      queryParams.push(genreId);
    }

    if (conditionName) {
      whereConditions += " AND article_condition.name_condition = ?";
      queryParams.push(conditionName);
    }

    if (minPrice !== undefined && minPrice !== null) {
      whereConditions += " AND advert.price >= ?";
      queryParams.push(minPrice);
    }

    if (maxPrice !== undefined && maxPrice !== null) {
      whereConditions += " AND advert.price <= ?";
      queryParams.push(maxPrice);
    }
    if (searchVolume) {
      whereConditions += " AND advert.volume_id = ?";
      queryParams.push(searchVolume);
    }
    if (batch !== null && batch !== undefined) {
      whereConditions += batch ? " AND advert.batch=1" : " AND advert.batch=0";
    }
    const query = `
    SELECT advert.id, advert.title_search_manga, advert.price, article_condition.name_condition,advert.volume_id, advert.batch,
    advert_image.image_path, user.pseudo, user.picture as user_picture, manga.genre_id,
    ROUND(joint_table.average, 1) as average, joint_table.feedback_nber, advert.publication_date_advert
    FROM ${this.table}
    LEFT JOIN advert_image ON advert.id=advert_image.advert_id AND advert_image.is_primary=1
    JOIN article_condition ON advert.article_condition_id=article_condition.id
    JOIN user ON advert.user_id=user.id 
   LEFT JOIN manga ON advert.manga_id = manga.id 
    JOIN (SELECT user.pseudo as rated_pseudo, ROUND(AVG(feedback.rating), 1) as average, COUNT(feedback.rating) as feedback_nber
          FROM user
          LEFT JOIN feedback ON user.id = feedback.user_id
          GROUP BY user.pseudo) as joint_table ON user.pseudo=joint_table.rated_pseudo
    ${whereConditions}
    ORDER BY advert.publication_date_advert DESC;
  `;

    const [rows] = await this.database.query(query, queryParams);
    return rows;
  }

  async deleteAdvert(id) {
    await this.database.query(
      `DELETE advert_image FROM advert
        LEFT JOIN advert_image ON advert.id = advert_image.advert_id
        WHERE advert.id = ?`,
      [id]
    );

    const [result] = await this.database.query(
      `DELETE FROM ${this.table} 
      WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0 ? id : null;
  }
}

// async findRecentUniqueItems() {
//   const [rows] = await this.database.query(
//     `SELECT advert.id, advert.title_search_manga, advert.price, article_condition.name_condition,
//     advert_image.image_path, user.pseudo, user.picture as user_picture,
//     ROUND(joint_table.average, 1) as average, joint_table.feedback_nber, advert.publication_date_advert
//     FROM ${this.table}
//     LEFT JOIN advert_image ON advert.id=advert_image.advert_id AND advert_image.is_primary=1
//     JOIN article_condition ON advert.article_condition_id=article_condition.id
//     JOIN user ON advert.user_id=user.id
//     JOIN (SELECT user.pseudo as rated_pseudo, ROUND(AVG(feedback.rating), 1) as average, COUNT(feedback.rating) as feedback_nber
//           FROM user
//           JOIN feedback ON user.id = feedback.user_id
//           GROUP BY user.pseudo) as joint_table ON user.pseudo=joint_table.rated_pseudo
//     WHERE advert.batch=0
//     ORDER BY advert.publication_date_advert DESC;`
//   );

//   return rows;
// }

// async findRecentBatch() {
//   const [rows] = await this.database.query(
//     `SELECT advert.id, advert.title_search_manga, advert.price, article_condition.name_condition, advert_image.image_path, user.id as user_id, user.pseudo, user.picture as user_picture, joint_table.average, joint_table.feedback_nber, advert.publication_date_advert
//   FROM ${this.table}
//   LEFT JOIN advert_image ON advert.id=advert_image.advert_id AND advert_image.is_primary=1
//   JOIN article_condition ON advert.article_condition_id=article_condition.id
//   JOIN user ON advert.user_id=user.id
//   JOIN (SELECT user.pseudo as rated_pseudo,  ROUND(AVG(feedback.rating), 1) as average, COUNT(feedback.rating) as feedback_nber
//       FROM user
//       JOIN feedback ON user.id = feedback.user_id
//       GROUP BY user.pseudo) as joint_table ON user.pseudo=joint_table.rated_pseudo
//   WHERE advert.batch=1
//   ORDER BY advert.publication_date_advert DESC;`
//   );

//   return rows;
// }

// async getMinMaxPrice(batch) {
//   let whereConditions = "";

//   if (batch !== undefined) {
//     whereConditions = batch ? "WHERE batch = 1" : "WHERE batch = 0";
//   }

//   const query = `
//     SELECT MIN(price) AS minPrice, MAX(price) AS maxPrice
//     FROM ${this.table}
//     ${whereConditions};
//   `;
//   const [rows] = await this.database.query(query);
//   return rows;
// }

module.exports = AdvertsManager;
