const express = require("express");
const UsersController = require("../controllers/UsersController");
const AuthentificationController = require('../controllers/AuthentificationController');
const { authenticateToken } = require ("../middlewares/Auth");
const CardController = require("../controllers/CardController");

const router = express.Router();

router.get("/users", UsersController.index); //Get /users
router.post("/users", UsersController.store); //Post /users
router.get("/users/:id", UsersController.show);
router.put("/users/:id", UsersController.update);
router.delete("/users/:id", UsersController.delete);
router.post("/login", AuthentificationController.login);
router.get("/getMyProfile", authenticateToken, AuthentificationController.getMyProfile);
router.post("/user/booster/open", authenticateToken, CardController.openBooster);
router.put("/user/booster/reset", authenticateToken, CardController.resetBooster);
router.get("/user/cards", authenticateToken, CardController.getUserCards);


module.exports = router;
