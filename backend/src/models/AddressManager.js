const AbstractManager = require("./AbstractManager");

class AddressManager extends AbstractManager {
  constructor() {
    super({ table: "address" });
  }

  async getAddressbyId(id) {
    const [rows] = await this.database.query(
      `SELECT address.id, address.country, address.name_adress, address.number_street, address.zip_code, address.city 
      FROM ${this.table}
      JOIN address_has_user ON address.id = address_has_user.address_id
      JOIN user ON address_has_user.user_id = user.id
      WHERE address_has_user.user_id = ?`,
      [id]
    );
    return rows;
  }

  async addAddressbyId(address, userId) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (country, name_adress, number_street, zip_code, city) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        address.country,
        address.nameAdress,
        address.numberStreet,
        address.zipCode,
        address.city,
      ]
    );

    const addressId = result.insertId;

    // Insérer l'ID de l'adresse et l'ID de l'utilisateur dans la table de jointure address_has_user
    await this.database.query(
      `INSERT INTO address_has_user (address_id, user_id) 
       VALUES (?, ?)`,
      [addressId, userId]
    );

    return addressId;
  }

  async updateAddress(address) {
    // Met à jour l'adresse dans la table 'address' seulement si elle appartient à l'utilisateur spécifié
    const [result] = await this.database.query(
      `UPDATE address 
       SET country = ?, name_adress = ?, number_street = ?, zip_code = ?, city = ? 
       WHERE id = ? 
       `,
      [
        address.country,
        address.nameAdress,
        address.numberStreet,
        address.zipCode,
        address.city,
        address.id,
      ]
    );
    return result;
  }

  async updateAddressUser(userId, addressId) {
    const [result2] = await this.database.query(
      `UPDATE address_has_user 
       SET user_id = ? 
       WHERE address_id = ?`,
      [userId, addressId]
    );
    return result2;
  }
}

module.exports = AddressManager;
