const jwt = require("jsonwebtoken");

const cookieJwtAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const user = jwt.verify(token, process.env.APP_SECRET);
    req.user = user;
    return next();
  } catch (err) {
    res.clearCookie("token");
    return res.sendStatus(401);
  }
};

module.exports = cookieJwtAuth;

// correspond au auth du repo -> dossier middleware
