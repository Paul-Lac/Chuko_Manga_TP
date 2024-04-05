const AbstractManager = require("./AbstractManager");

class publishersManager extends AbstractManager {
  constructor() {
    super({ table: "publishing_house" });
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }
}

module.exports = publishersManager;
