const { postUsers } = require("../controllers/user.js");
const { getUsers } = require("../controllers/user.js");
const { getUsersbyId } = require("../controllers/user.js");
const { updateUsersbyId } = require("../controllers/user.js");
const { getUsersUnivbyId } = require("../controllers/user.js");
const { getUsersDoctorbyId } = require("../controllers/user.js");
const { updateDoctor } = require("../controllers/user.js");
const { login } = require("../controllers/user.js");


const router = require("express").Router();

const { checkToken } = require("../auth/token_validation.js");

router.post("/",postUsers);

router.get("/",checkToken,getUsers);
router.get("/:id",checkToken,getUsersbyId);
router.get("/univ/:id",checkToken,getUsersUnivbyId);
router.get("/doctor/:id",checkToken,getUsersDoctorbyId);
router.get("/univ/:id",checkToken,getUsersUnivbyId);
router.put("/:id",updateUsersbyId);


router.post("/auth/login",login);


module.exports = router; 
