const { 
    getUnivs, 
    getUnivById, 
    getUserByUnivId, 
    getDoctorByUnivId, 
    searchUsers, 
    searchDoctors, 
    searchHospitals, 
    getNearestHospByUnivId, 
    getMedHisByUnivId,
    getHospByUnivId,
    login} = require("../controllers/university.js");

const router = require("express").Router();


router.get("/all",getUnivs);
router.get("/:univid",getUnivById);
router.get("/nearest/hosp/:univid",getNearestHospByUnivId);
router.get("/medicalhistory/user/:univid",getMedHisByUnivId);
router.get("/users/:univid",getUserByUnivId);
router.get("/doctor/:univid",getDoctorByUnivId);
router.get("/hospital/:univid",getHospByUnivId);
router.get("/search/users/:str",searchUsers);
router.get("/search/doctor/:str",searchDoctors);
router.get("/search/hosp/:univid/:str",searchHospitals);
router.post("/auth/login",login);

module.exports = router; 