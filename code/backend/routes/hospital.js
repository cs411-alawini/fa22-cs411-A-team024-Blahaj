const { getHospitals, getHospitalById, bookHospitalBed,hospitalHistoryOfUser } = require("../controllers/hospital.js");

const router = require("express").Router();


router.get("/all",getHospitals);
router.get("/:hospid",getHospitalById);
router.post("/book/:hospid",bookHospitalBed);
//router.get("/history/:uid",hospitalHistoryOfUser);

module.exports = router; 