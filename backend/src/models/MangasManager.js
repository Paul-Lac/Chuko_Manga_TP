const AbstractManager = require("./AbstractManager");

class MangasManager extends AbstractManager {
  constructor() {
    super({ table: "manga" });
  }

  async getMangaData() {
    const [rows] = await this.database
      .query(`SELECT m.title, m.description, m.id, m.image, p.name_publishing_house, g.genre, m.author, m.script_writer, m. illustrator, m.release_date 
      FROM manga m
      LEFT JOIN publishing_house p ON m.publishing_house_id = p.id
      LEFT JOIN genre g ON m.genre_id = g.id;`);
    return rows;
  }

  async getMangaQuery(searchQuery) {
    console.info(`Manager Manga query: ${searchQuery}`);
    // Constructing the SQL query dynamically
    const queryTerms = searchQuery.split(" "); // Split the search query into individual terms
    const titleLike = queryTerms
      .map((term) => `title LIKE '%${term}%'`)
      .join(" OR ");
    const sqlQuery = `SELECT id, title, image FROM manga WHERE ${titleLike}`; // Join LIKE conditions with OR operator
    const queryParams = queryTerms.flatMap((term) => [
      `%${term}%`,
      `%${term}%`,
    ]); // Construct parameter array for each term

    const [rows] = await this.database.query(sqlQuery, queryParams);
    return rows;
  }

  async findOne(id) {
    const [rows] = await this.database.query(
      `SELECT manga.id, manga.title, manga.description, manga.image, manga.author, manga.script_writer, manga.illustrator, manga.release_date, manga.genre_id, genre.genre AS genre_genre, manga.finish_japan, manga.finish_france, publishing_house.name_publishing_house
      FROM ${this.table}
      LEFT JOIN genre ON manga.genre_id = genre.id
      LEFT JOIN publishing_house ON manga.publishing_house_id = publishing_house.id
      WHERE manga.id = ?`,
      [id]
    );
    return rows;
  }

  async findOverview() {
    const [rows] = await this.database
      .query(`SELECT manga.id, manga.title, manga.image
    FROM ${this.table}
    ORDER BY manga.id;`);
    console.info("Result of findOverview:", rows);
    return rows;
  }

  async deleteManga(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0 ? id : null;
  }
}

module.exports = MangasManager;
