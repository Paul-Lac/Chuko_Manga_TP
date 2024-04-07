const AbstractManager = require("./AbstractManager");

class VolumesManager extends AbstractManager {
  constructor() {
    super({ table: "volume" });
  }

  async getVolumesByMangaId(id) {
    const [rows] = await this.database.query(
      `SELECT volume.id, volume.title, volume.number_volume, volume.publication_year, volume.image, volume.ISBN, volume.manga_id, JSON_ARRAYAGG(advert.id) as advert_ids
       FROM volume
       LEFT JOIN advert ON advert.volume_id = volume.id
       WHERE volume.manga_id = ?
       GROUP BY volume.id
       ORDER BY volume.number_volume ASC`,
      [id]
    );
    return rows;
  }
}

module.exports = VolumesManager;
