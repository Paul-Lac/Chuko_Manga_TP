// const AbstractManager = require("./AbstractManager");

// class UsersManager extends AbstractManager {
//   constructor() {
//     super({ table: "user" });
//   }

//   async create(user) {
//     // Add blank line here
//     // Validate user data (optional but highly recommended)
//     // ... your validation logic here ...

//     // Execute the SQL INSERT query to add a new item to the "user" table
//     const [result] = await this.database.query(
//       `INSERT INTO ${this.table} (firstname, lastname, email, password) VALUES (?, ?, ?, ?)`,
//       [user.firstname, user.lastname, user.email, user.password]
//     );

//     // Return the ID of the newly inserted item
//     return result.insertId;
//   }
// }

// module.exports = UsersManager;
