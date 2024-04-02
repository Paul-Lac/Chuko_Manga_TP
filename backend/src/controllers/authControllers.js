/* eslint-disable import/no-extraneous-dependencies */
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Import access to database tables
const models = require("../modelsProviders");

const login = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided email
    const user = await models.user.readByEmailWithPassword(req.body.email);

    if (user == null) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password
    );

    if (verified) {
      // Respond with the user and a signed token in JSON format (but without the hashed password)
      delete user.hashed_password;
      const token = await jwt.sign(
        { sub: user.id, role: user.role },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.cookie("token", token, {
        httpOnly: true,
      });
      res.json({
        token,
        user: {
          id: user.id,
          pseudo: user.pseudo,
        },
      });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  login,
};
