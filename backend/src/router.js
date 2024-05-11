const express = require("express");

const router = express.Router();

const { hashPassword } = require("./services/auth");

const cookieJwtAuth = require("./middlewares/cookieJwtAuth");
const multerMultiple = require("./middlewares/multerConfigMultiple");
const multerSingle = require("./middlewares/multerConfigSingle");
const validateAddress = require("./middlewares/validateAddress");
const validateAdvert = require("./middlewares/validateAdvert");
const validateLogin = require("./middlewares/validateLogin");
const validateOrder = require("./middlewares/validateOrder");
const validateUserRegistration = require("./middlewares/validateUserRegistration");
const validateUserUpdate = require("./middlewares/validateUserUpdate");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const advertsControllers = require("./controllers/advertsControllers");
const addressControllers = require("./controllers/addressControllers");
const authControllers = require("./controllers/authControllers");
const conditionsControllers = require("./controllers/conditionsControllers");
const feedbacksControllers = require("./controllers/feedbacksControllers");
const genresControllers = require("./controllers/genresControllers");
const mangasControllers = require("./controllers/mangasControllers");
const ordersControllers = require("./controllers/ordersControllers");
const publishersControllers = require("./controllers/publishersControllers");
const usersControllers = require("./controllers/usersControllers");
const volumesControllers = require("./controllers/volumesControllers");

/* ************************************************************************* */
// PUBLIC ROUTES
/* ************************************************************************* */

// ADVERT TABLE
router.get("/adverts", advertsControllers.getAdvertCards);
router.get("/adverts/:id", advertsControllers.getAdvertById);
router.get("/users/:id/adverts", advertsControllers.getAdvertsBySeller);

// CONDITIONS TABLE
router.get("/conditions", conditionsControllers.getAllConditions);

// GENRES TABLE
router.get("/genres", genresControllers.getAllGenres);

// MANGA TABLE
router.get("/mangas", mangasControllers.getMangas);
router.get("/mangas/:id", mangasControllers.getMangaById);
router.get("/mangas-catalog", mangasControllers.getCatalogMangas);
router.get("/mangas-fk", mangasControllers.getMangasWithFK);

// PUBLISHING_HOUSE TABLE
router.get("/publishers", publishersControllers.getAllPublishers);

// VOLUME TABLE
router.get("/mangas/:id/volumes", volumesControllers.getVolumesByMangaId);

// USER TABLE AND AUTHENTIFICATION
router.post(
  "/users",
  validateUserRegistration,
  hashPassword,
  usersControllers.addUser
);
router.post("/login", validateLogin, authControllers.login);
router.get("/logout", authControllers.logout);

// Check if token is valid
// router.get("/api/verify", cookieJwtAuth, (req, res) => {
//   res.sendStatus(200);
// });

/* ************************************************************************* */
// PROTECTED ROUTES
/* ************************************************************************* */

router.use(cookieJwtAuth);

// ADDRESS TABLE
router.get("/address/:id", addressControllers.getAddressbyId);
router.post("/address/:id", validateAddress, addressControllers.addAddressbyId);
router.put(
  "/users/:userId/address/:addressId",
  validateAddress,
  addressControllers.updateAddress
);

// ADVERT TABLE
router.post(
  "/adverts",
  multerMultiple,
  validateAdvert,
  advertsControllers.createAdvert
);
router.delete("/adverts/:id", advertsControllers.deleteAdvert);

// FEEDBACK TABLE
router.get("/users/:id/feedbacks", feedbacksControllers.getFeedbacksById);

// ORDER TABLE
// Route to get all orders by buyer (page Profil/onglet my purchase history)
router.get("/buyers/:id/orders", ordersControllers.getHistoryOrderByBuyer);
router.post("/orders", validateOrder, ordersControllers.addOrder);

// USER TABLE AND AUTHENTIFICATION
// => fetchdata for update detail
router.get("/users/:id", usersControllers.getUserById);
// => fetchdata for profile head
router.get("/user-profiles/:id", usersControllers.getUserProfilById);
router.put(
  "/user/:id",
  multerSingle,
  validateUserUpdate,
  usersControllers.updateUser
);

module.exports = router;

// MANGA TABLE
// router.post("/mangas", multerSingle, mangasControllers.createManga);
// router.put("/mangas/:id", multerSingle, mangasControllers.updateManga);
// router.delete("/mangas/:id", mangasControllers.deleteManga);
