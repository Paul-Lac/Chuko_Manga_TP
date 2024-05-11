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

      // Create access token
      const accessToken = await jwt.sign(
        { sub: user.id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );

      // Create refresh token
      const refreshToken = await jwt.sign(
        { sub: user.id, role: user.role },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      // Send tokens in cookies
      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.cookie("refreshToken", refreshToken, { httpOnly: true });

      res.status(200).json({
        user: {
          id: user.id,
          pseudo: user.pseudo,
        },
        expiresIn: 24 * 60 * 60 * 1000, // 1 day in milliseconds
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
  res
    .clearCookie("accessToken", { httpOnly: true, path: "/" })
    .clearCookie("refreshToken", { httpOnly: true, path: "/" })
    .sendStatus(200);
};

const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Create new access token
    const accessToken = await jwt.sign(
      { sub: user.sub, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    // Send new access token in a cookie
    res.cookie("accessToken", accessToken, { httpOnly: true });

    return res.status(200).json({
      user: {
        id: user.id,
        pseudo: user.pseudo,
      },
    });
  } catch (err) {
    res.clearCookie("refreshToken", { httpOnly: true, path: "/" });
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  login,
  logout,
  refresh,
};
