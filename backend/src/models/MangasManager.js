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
      `SELECT manga.id, manga.title, manga.description, manga.image, manga.author, manga.script_writer, manga.illustrator, manga.release_date, manga.genre_id, manga.publishing_house_id, manga.genre_id, genre.genre AS genre_genre, manga.finish_japan, manga.finish_france, publishing_house.name_publishing_house
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
    // console.info("Result of findOverview:", rows);
    return rows;
  }

  async findMangasWithFK() {
    const [rows] = await this.database.query(
      `SELECT 
      m.id, 
      m.title, 
      m.description,  
      m.image, 
      m.author, 
      m.script_writer, 
      m.illustrator, 
      m.release_date, 
      JSON_ARRAYAGG(v.id) as volume_ids, 
      JSON_ARRAYAGG(a.id) as advert_ids
    FROM ${this.table} m
    LEFT JOIN volume v ON m.id = v.manga_id
    LEFT JOIN advert a ON m.id = a.manga_id
    GROUP BY m.id
    ORDER BY m.title;`
    );
    return rows;
  }

  async addManga(manga) {
    const [result] = await this.database.query(
      `insert into manga (title, description, image, author, script_writer, illustrator, release_date, publishing_house_id, genre_id, finish_japan, finish_france) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        manga.title,
        manga.description,
        manga.image,
        manga.author,
        manga.script_writer,
        manga.illustrator,
        manga.release_date,
        manga.publishing_house_id,
        manga.genre_id,
        manga.finish_japan,
        manga.finish_france,
      ]
    );
    return result.insertId;
  }

  async modifyManga(manga) {
    const {
      title,
      description,
      image,
      author,
      scriptWriter,
      illustrator,
      releaseDate,
      publishingHouseId,
      genreId,
      finishJapan,
      finishFrance,
      id,
    } = manga;

    const [result] = await this.database.query(
      `UPDATE manga SET title = ?, description = ?, image = ?, author = ?, script_writer = ?, illustrator = ?, release_date = ?, publishing_house_id = ?, genre_id = ?, finish_japan = ?, finish_france = ? WHERE id = ?`,
      [
        title,
        description,
        image,
        author,
        scriptWriter,
        illustrator,
        releaseDate,
        publishingHouseId,
        genreId,
        finishJapan,
        finishFrance,
        id,
      ]
    );
    return result;
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
