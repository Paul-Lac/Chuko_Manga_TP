const express = require("express");

const router = express.Router();

const { hashPassword } = require("./services/auth");

const multer = require("./middlewares/multerConfigMultiple");
const multerSingle = require("./middlewares/multerConfigSingle");
const cookieJwtAuth = require("./middlewares/cookieJwtAuth");

const validateAddress = require("./middlewares/validateAddress");
const validateAdvert = require("./middlewares/validateAdvert");
const validateLogin = require("./middlewares/validateLogin");
const validateUser = require("./middlewares/validateUser");

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
router.get("/advert-cards", advertsControllers.getAdvertCards);
router.get("/advert-cards/:id", advertsControllers.getAdvertById);

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

// AUTHENTIFICATION
router.post("/login", validateLogin, authControllers.login);

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
router.get("/users/:id/adverts", advertsControllers.getAdvertsBySeller);
router.post(
  "/adverts",
  multer,
  validateAdvert,
  advertsControllers.createAdvert
);
router.delete("/adverts/:id", advertsControllers.deleteAdvert);

// FEEDBACK TABLE
router.get("/users/:id/feedbacks", feedbacksControllers.getFeedbacksById);

// MANGA TABLE
router.post("/mangas", multerSingle, mangasControllers.createManga);
router.put("/mangas/:id", multerSingle, mangasControllers.updateManga);
router.delete("/mangas/:id", mangasControllers.deleteManga);

// ORDER TABLE
// Route to get all orders by buyer (page Profil/onglet my purchase history)
router.get("/buyers/:id/orders", ordersControllers.getHistoryOrderByBuyer);
router.post("/parcel-order", ordersControllers.addOrder);

// USER TABLE
// => fetchdata for update detail
router.get("/users/:id", usersControllers.getUserById);
// => fetchdata for profile head
router.get("/user-profiles/:id", usersControllers.getUserProfilById);
router.post("/users", validateUser, hashPassword, usersControllers.add);

router.put(
  "/user/:id",
  multerSingle,
  validateUser,
  usersControllers.updateUser
);

// AUTHENTIFICATION
router.get("/logout", authControllers.logout);

module.exports = router;

// OLD :
// router.get("/advert-cards-old", advertsControllers.recentAdverts);
// NEVER USED IN FRONTEND
// router.get("/explore/:query", advertsControllers.getSearchAdverts);
// router.get("/explore", advertsControllers.getAllAdverts);
// router.get("/advert-image", advertsControllers.getAdvertsImage);
// Route to display advert table - NEVER USED IN FRONTEND
// router.get("/adverts", advertsControllers.getAllAdverts);
// Route to display advert card
// router.get("/display-adverts", advertsControllers.getAllCards);

// NEVER USED IN FRONTEND
// Route to get all users table
// router.get("/users", usersControllers.getAllUsers);

// SUPPRIMER VERIFYTOKEN

// Thoses routes are protected
// Mettre toutes les routes POST, PUT, etc....
// CHANGER LES AXIOS

// Search route, post and retrieve search queries for advert
// router.get("/search", searchControllers.getSearchQuery);
// router.post("/explore", searchControllers.postSearchQuery);

// router.get("/adverts/:id", advertsControllers.getAllAdvertsById);

// Route to get only adverts for one item, ordered by date of publication (homepage)
// router.get(
//   "/unique-adverts-date-desc",
//   advertsControllers.getRecentUniqueAdverts
// );
// Route to get only adverts for batch, ordered by date of publication (homepage)
// router.get("/batch-adverts-date-desc", advertsControllers.getRecentBatch);
// Route to filter adverts by genre (page explorer)
// router.get(
//   "/display-adverts-bygenre/:id",
//   advertsControllers.getAdvertsByGenre
// );
// Route to filter adverts by condition (page explorer)
// router.get(
//   "/display-adverts-bycondition/:id",
//   advertsControllers.getAdvertsByCondition
// );
// Route to filter adverts by max price (page explorer)
// router.get("/display-adverts-byprice", advertsControllers.getAdvertsByPrice);
// router.get(
//   "/display-adverts-byprice/:price",
//   advertsControllers.getAdvertsByPrice
// );

/* ************************************************************************* */
// EXAMPLES
// Route to get a list of items
// router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
// router.get("/items/:id", itemControllers.read);

// Route to add a new item
// router.post("/items", itemControllers.add);

// router.get("/characters", charactersControllers.browse);
