const express = require("express");
// http://localhost:4242/api/characters

const router = express.Router();

const { hashPassword, verifyToken } = require("./services/auth");

const multer = require("./middlewares/multer-config");
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
const mangasControllers = require("./controllers/mangasControllers");
const ordersControllers = require("./controllers/ordersControllers");
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
// Route to display advert table
router.get("/adverts", advertsControllers.getAllAdverts);
// Route to display advert card
router.get("/display-adverts", advertsControllers.getAllCards);
router.get("/advert-image", advertsControllers.getAdvertsImage);
router.get("/find-recent-adverts", advertsControllers.recentAdverts);
// Route to get detailed information for one specific advert (page on detail advert)
router.get("/display-adverts/:id", advertsControllers.getAdvertById);
// Route to get all adverts for one specific seller (page on detailed advert)
router.get(
  "/display-adverts-byseller/:id",
  advertsControllers.getAdvertsBySeller
);
// !!! A mettre en place ? ""/users/:id/adverts"
// Routes for search feature
router.get("/explore", advertsControllers.getAllAdverts);
router.get("/explore/:query", advertsControllers.getSearchAdverts);

// // ROUTE TO GET CONDITIONS
router.get("/conditions", conditionsControllers.getAllConditions);

// ROUTES TO GET MANGAS
router.get("/mangas", mangasControllers.getMangas);
router.get("/mangas/:id", mangasControllers.getMangaById);
router.get("/mangas-catalog", mangasControllers.getCatalogMangas);

// ROUTES TO GET ORDERS
// Route to get all orders by buyer (page Profil/onglet my purchase history)
router.get(
  "/display-order-history-bybuyer/:id",
  ordersControllers.getHistoryOrderByBuyer
);

// ROUTES TO GET USERS
// Route to get all users table
router.get("/users", usersControllers.getAllUsers);
// Route to get all users for one specific user
router.get("/user/:id", usersControllers.getUserById);
// Route to get profil user for one specific user
router.get("/user-profil/:id", usersControllers.getUserProfilById);
// Route to get comment profil user for one specific user
router.get("/user-profil-com/:id", usersControllers.getUserProfilComById);

// ROUTES TO GET VOLUMES
// Route to get all volumes by manga ID (page manga details)
router.get("/volumes/:mangaId", volumesControllers.getVolumesByMangaId);

/* ************************************************************************* */
// ROUTES POST
/* ************************************************************************* */

// ROUTES TO POST ADDRESS
router.post("/address/:id", validateAddress, addressControllers.addAddressbyId);

// ROUTES TO POST ADVERTS
router.post(
  "/new-advert",
  multer,
  validateAdvert,
  advertsControllers.createAdvert
);

// ROUTES TO POST USERS
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

// router.put("/update-advert/:id", multer, advertsControllers.updateAdvert);

/* ************************************************************************* */
// ROUTES DELETE
/* ************************************************************************* */
// Route to delete advert by user
router.delete("/advert/:id", advertsControllers.deleteAdvert);
router.delete("/mangas/:id", mangasControllers.deleteManga);

// Import authControllers module for handling auth-related operations
const authControllers = require("./controllers/authControllers");
const cookieJwAuth = require("./middlewares/cookieJwtAuth");

router.post("/login", authControllers.login);
router.post("/add", cookieJwAuth, authControllers.login);
router.use(verifyToken);

// Thoses routes are protected

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
