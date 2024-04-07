const express = require("express");
// http://localhost:4242/api/characters

const router = express.Router();

const { hashPassword, verifyToken } = require("./services/auth");

const multer = require("./middlewares/multerConfigMultiple");
const multerSingle = require("./middlewares/multerConfigSingle");

const validateAddress = require("./middlewares/validateAddress");
const validateAdvert = require("./middlewares/validateAdvert");
const validateUser = require("./middlewares/validateUser");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const advertsControllers = require("./controllers/advertsControllers");
const addressControllers = require("./controllers/addressControllers");
const conditionsControllers = require("./controllers/conditionsControllers");
const genresControllers = require("./controllers/genresControllers");
const mangasControllers = require("./controllers/mangasControllers");
const ordersControllers = require("./controllers/ordersControllers");
const publishersControllers = require("./controllers/publishersControllers");
const usersControllers = require("./controllers/usersControllers");
const volumesControllers = require("./controllers/volumesControllers");
// const itemControllers = require("./controllers/itemControllers");
// const charactersControllers = require("./controllers/charactersControllers");
// Import itemControllers module for handling item-related operations
// const searchControllers = require("./controllers/searchControllers");
// const moviesControllers = require("./controllers/moviesControllers");

/* ************************************************************************* */
// GET ROUTES
/* ************************************************************************* */
// GET ADDRESS
router.get("/address/:id", addressControllers.getAddressbyId);

// GET ADVERTS
router.get("/advert-cards", advertsControllers.recentAdverts);
router.get("/advert-cards/:id", advertsControllers.getAdvertById);
router.get("/advert-image", advertsControllers.getAdvertsImage);
router.get("/users/:id/adverts", advertsControllers.getAdvertsBySeller);
router.get("/explore", advertsControllers.getAllAdverts);
router.get("/explore/:query", advertsControllers.getSearchAdverts);
// NEVER USED IN FRONTEND
// Route to display advert table - NEVER USED IN FRONTEND
// router.get("/adverts", advertsControllers.getAllAdverts);
// Route to display advert card
// router.get("/display-adverts", advertsControllers.getAllCards);

// ROUTE TO GET CONDITIONS
router.get("/conditions", conditionsControllers.getAllConditions);

// ROUTES TO GET GENRES
router.get("/genres", genresControllers.getAllGenres);

// ROUTES TO GET MANGAS
router.get("/mangas", mangasControllers.getMangas);
router.get("/mangas/:id", mangasControllers.getMangaById);
router.get("/mangas-catalog", mangasControllers.getCatalogMangas);
router.get("/mangas-fk", mangasControllers.getMangasWithFK);

// ROUTE TO GET PUBLISHING HOUSES
router.get("/publishers", publishersControllers.getAllPublishers);

// ROUTES TO GET ORDERS
// Route to get all orders by buyer (page Profil/onglet my purchase history)
router.get(
  "/display-order-history-bybuyer/:id",
  ordersControllers.getHistoryOrderByBuyer
);

// ROUTES TO GET USERS
router.get("/users/:id", usersControllers.getUserById);
router.get("/user-profiles/:id", usersControllers.getUserProfilById);
// FROM FEEDBACKS TABLE ??
router.get("/users/:id/feedbacks", usersControllers.getUserProfilComById);
// NEVER USED IN FRONTEND
// Route to get all users table
// router.get("/users", usersControllers.getAllUsers);

// ROUTES TO GET VOLUMES
router.get("/mangas/:id/volumes", volumesControllers.getVolumesByMangaId);

/* ************************************************************************* */
// ROUTES POST
/* ************************************************************************* */

// ROUTE TO POST ADDRESS
router.post("/address/:id", validateAddress, addressControllers.addAddressbyId);

// ROUTE TO POST USERS => appelé dans inscription.jsx - Pourquoi pas de validateUser ici ???
router.post("/users", hashPassword, usersControllers.add);

/* ************************************************************************* */
// ROUTES PUT
/* ************************************************************************* */
// Route Update Address
router.put(
  "/address/user/:userId/address/:addressId",
  validateAddress,
  addressControllers.updateAddress
);

// Route Update User
router.put(
  "/user/:id",
  multerSingle,
  validateUser,
  usersControllers.updateUser
);

// Route Update manga
router.put("/mangas/:id", multerSingle, mangasControllers.updateManga);

// router.put("/update-advert/:id", multer, advertsControllers.updateAdvert);

/* ************************************************************************* */
// ROUTES DELETE
/* ************************************************************************* */
// Route to delete advert by user
router.delete("/adverts/:id", advertsControllers.deleteAdvert);
router.delete("/mangas/:id", mangasControllers.deleteManga);

// Import authControllers module for handling auth-related operations
const authControllers = require("./controllers/authControllers");
const cookieJwtAuth = require("./middlewares/cookieJwtAuth");

// /login appelé dans connexion.jsx => pourquoi pas de validateLogin ?? et cookieJwtAuth appelé nulle part ??
router.post("/login", authControllers.login);
// /add n'est appelé nulle part dans le front
router.post("/add", cookieJwtAuth, authControllers.login);

router.use(verifyToken);

// SUPPRIMER VERIFYTOKEN

// ROUTES TO POST MANGAS
router.post("/mangas", multerSingle, mangasControllers.createManga);

// ROUTE TO POST ADVERTS
router.post(
  "/adverts",
  multer,
  validateAdvert,
  advertsControllers.createAdvert
);

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

module.exports = router;
