const AbstractManager = require("./AbstractManager");

class AdvertImagesManager extends AbstractManager {
  constructor() {
    super({ table: "advert_image" });
  }

  async addImage(image) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (image_path, is_primary, advert_id) values (?, ?, ?)`,
      [image.image_path, image.is_primary, image.advert_id]
    );

    return result.insertId;
  }
}

module.exports = AdvertImagesManager;
