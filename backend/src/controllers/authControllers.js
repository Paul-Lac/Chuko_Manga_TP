/* eslint-disable import/no-extraneous-dependencies */
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Import access to database tables
const models = require("../modelsProviders");

const login = async (req, res) => {
  try {
    // Fetch a specific user from the database based on the email provided
    const user = await models.user.readByEmail(req.body.email);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const verifyPassword = await argon2.verify(
      user.hashed_password,
      req.body.password
    );

    if (verifyPassword) {
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
      res.status(200).json({
        user: {
          id: user.id,
          pseudo: user.pseudo,
        },
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token").sendStatus(200);
};

module.exports = {
  login,
  logout,
};
