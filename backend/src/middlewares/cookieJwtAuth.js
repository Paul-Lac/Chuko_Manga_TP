const jwt = require("jsonwebtoken");

const cookieJwtAuth = (req, res, next) => {
  console.info("req", req.cookies);
  const { token } = req.cookies;

  if (!token) {
    return res.redirect("/");
  }

  try {
    const user = jwt.verify(token, process.env.APP_SECRET);
    req.user = user;
    return next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};

module.exports = cookieJwtAuth;
