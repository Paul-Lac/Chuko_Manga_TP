const AbstractManager = require("./AbstractManager");

class genresManager extends AbstractManager {
  constructor() {
    super({ table: "genre" });
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }
}

module.exports = genresManager;
