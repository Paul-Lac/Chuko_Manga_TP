const jwt = require("jsonwebtoken");

const cookieJwtAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = jwt.verify(token, process.env.APP_SECRET);
    req.user = user;
    return next();
  } catch (err) {
    res.clearCookie("token");
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = cookieJwtAuth;

// correspond au auth du repo -> dossier middleware
