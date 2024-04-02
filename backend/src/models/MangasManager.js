const AbstractManager = require("./AbstractManager");

class MangasManager extends AbstractManager {
  constructor() {
    super({ table: "manga" });
  }

  async getMangaById(id) {
    const [rows] = await this.database.query(
      `SELECT manga.id, manga.title, manga.description, manga.image, manga.author, manga.script_writer, manga.illustrator, manga.release_date, manga.publishing_house_id, manga.genre_id, genre.genre AS genre_genre, manga.finish_japan, manga.finish_france, manga.date_france, manga.date_japan
      FROM ${this.table}
      LEFT JOIN genre ON manga.genre_id = genre.id
      WHERE manga.id = ?`,
      [id]
    );

    return rows;
  }

  async getMangaData() {
    const [rows] = await this.database
      .query(`SELECT m.title, m.description, m.id, m.image, p.name_publishing_house, g.genre, m.author, m.script_writer, m. illustrator, m.release_date, m.date_japan, m.date_france 
      FROM manga m
      LEFT JOIN publishing_house p ON m.publishing_house_id = p.id
      LEFT JOIN genre g ON m.genre_id = g.id;`);
    return rows;
  }

  async getMangaOverview() {
    const [rows] = await this.database
      .query(`SELECT manga.id, manga.title, manga.image
    FROM ${this.table}
    ORDER BY manga.id;`);
    console.info("Result of getMangaOverview:", rows);
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
}

module.exports = MangasManager;
