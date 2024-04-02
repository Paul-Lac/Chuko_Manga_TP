const AbstractManager = require("./AbstractManager");

class conditionsManager extends AbstractManager {
  constructor() {
    super({ table: "article_condition" });
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }
}

module.exports = conditionsManager;
