const jwt = require("jsonwebtoken");

const cookieJwtAuth = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    return next();
  } catch (err) {
    res.clearCookie("accessToken", { httpOnly: true, path: "/" });
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = cookieJwtAuth;

// correspond au auth du repo -> dossier middleware
