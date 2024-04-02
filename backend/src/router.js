const express = require("express");
// http://localhost:4242/api/characters

const router = express.Router();
const multer = require("./middlewares/multer-config");

// const { hashPassword } = require("./services/auth");
const multerSingle = require("./middlewares/multerConfigSingle");
const { hashPassword, verifyToken } = require("./services/auth");

const validateAddress = require("./middlewares/validateAddress");
const validateAdvert = require("./middlewares/validateAdvert");
const validateUser = require("./middlewares/validateUser");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const mangasControllers = require("./controllers/mangasControllers");
const advertsControllers = require("./controllers/advertsControllers");
const itemControllers = require("./controllers/itemControllers");
const charactersControllers = require("./controllers/charactersControllers");
const usersControllers = require("./controllers/usersControllers");
const conditionsControllers = require("./controllers/conditionsControllers");
const ordersControllers = require("./controllers/ordersControllers");
const addressControllers = require("./controllers/addressControllers");
const volumesControllers = require("./controllers/volumesControllers");
// const searchControllers = require("./controllers/searchControllers");
// const moviesControllers = require("./controllers/moviesControllers");

// Route to get mangas
router.get("/mangas", mangasControllers.getMangas);
router.get("/manga/catalog", mangasControllers.getCatalogMangas);
router.get("/mangas/:id", mangasControllers.getMangaById);

// ROUTES TO GET ADVERTS
// Route to display advert table
router.get("/adverts", advertsControllers.getAllAdverts);
// router.get("/adverts/:id", advertsControllers.getAllAdvertsById);
// Route to display advert card
router.get("/display-adverts", advertsControllers.getAllCards);
router.get("/advert-image", advertsControllers.getAdvertsImage);
// Route to get only adverts for one item, ordered by date of publication (homepage)
router.get(
  "/unique-adverts-date-desc",
  advertsControllers.getRecentUniqueAdverts
);
router.get("/find-recent-adverts", advertsControllers.recentAdverts);
// Route to get only adverts for batch, ordered by date of publication (homepage)
router.get("/batch-adverts-date-desc", advertsControllers.getRecentBatch);
// Route to get detailed information for one specific advert (page on detail advert)
router.get("/display-adverts/:id", advertsControllers.getAdvertById);
// Route to get all adverts for one specific seller (page on detailed advert)
router.get(
  "/display-adverts-byseller/:id",
  advertsControllers.getAdvertsBySeller
);
// Route to filter adverts by genre (page explorer)
router.get(
  "/display-adverts-bygenre/:id",
  advertsControllers.getAdvertsByGenre
);
// Route to filter adverts by condition (page explorer)
router.get(
  "/display-adverts-bycondition/:id",
  advertsControllers.getAdvertsByCondition
);
// Route to filter adverts by max price (page explorer)
router.get("/display-adverts-byprice", advertsControllers.getAdvertsByPrice);
router.get(
  "/display-adverts-byprice/:price",
  advertsControllers.getAdvertsByPrice
);

// ROUTES TO POST ADVERTS
// Route to add a new advert (page advert creation)
router.post(
  "/new-advert",
  multer,
  validateAdvert,
  advertsControllers.createAdvert
);

// router.put("/update-advert/:id", multer, advertsControllers.updateAdvert);

// Route to get all orders by buyer (page Profil/onglet my purchase history)
router.post("/parcel-order", verifyToken, ordersControllers.addOrder);
router.get(
  "/display-order-history-bybuyer/:id",
  ordersControllers.getHistoryOrderByBuyer
);
// Route to get all volumes by manga ID (page manga details)
router.get("/volumes/:mangaId", volumesControllers.getVolumesByMangaId);
// Route to delete advert by user
router.delete("/advert/:id", advertsControllers.deleteAdvert);

// // ROUTE TO GET CONDITIONS
router.get("/conditions", conditionsControllers.getAllConditions);

/* ************************************************************************* */
// ROUTES USERS
/* ************************************************************************* */

// Route to get all users table
router.get("/users", usersControllers.getAllUsers);

// Route to get all users for one specific user
router.get("/user/:id", usersControllers.getUserById);
// Route to get profil user for one specific user
router.get("/user-profil/:id", usersControllers.getUserProfilById);
// Route to get comment profil user for one specific user
router.get("/user-profil-com/:id", usersControllers.getUserProfilComById);
router.post("/users", hashPassword, usersControllers.add);
// route post Update Profil User
router.put(
  "/user/:id",
  multerSingle,
  validateUser,
  usersControllers.updateUser
);

/* ************************************************************************* */
// ROUTES ADDRESS
/* ************************************************************************* */

router.get("/address/:id", addressControllers.getAddressbyId);
router.post("/address/:id", validateAddress, addressControllers.addAddressbyId);
router.put(
  "/address/user/:userId/address/:addressId",
  validateAddress,
  addressControllers.updateAddress
);

/* ************************************************************************* */

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

router.get("/characters", charactersControllers.browse);

// Search route, post and retrieve search queries for advert
// router.get("/search", searchControllers.getSearchQuery);
// router.post("/explore", searchControllers.postSearchQuery);

// --------------------------------ROUTES SEARCH--------------------------------

router.get("/explore", advertsControllers.getAllAdverts);
router.get("/explore/:query", advertsControllers.getSearchAdverts);

// Import authControllers module for handling auth-related operations
const authControllers = require("./controllers/authControllers");
const cookieJwAuth = require("./middlewares/cookieJwtAuth");

router.post("/login", authControllers.login);
router.post("/add", cookieJwAuth, authControllers.login);
router.use(verifyToken);

// Thoses routes are protected

module.exports = router;
