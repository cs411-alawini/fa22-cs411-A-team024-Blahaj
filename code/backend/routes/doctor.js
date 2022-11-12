const { getAllDoctors, 
    getDoctorById, 
    getPrivateDoctors, 
    getPrivateDoctorById, 
    getAppointments, 
    getAppointmentById, 
    updateAppointmentById, 
    getAppointmentHistoryById, 
    deleteAppointmentById, 
    getDoctorUnivById,
    login} = require("../controllers/doctor.js");




const router = require("express").Router();

const { checkToken } = require("../auth/token_validation.js");
const { postAppointment } = require("../controllers/doctor.js");



router.post("/auth/login",login);
router.get("/all",checkToken,getAllDoctors);
router.get("/all/:id",checkToken,getDoctorById);
router.get("/private",checkToken,getPrivateDoctors);
router.get("/private/:id",checkToken,getPrivateDoctorById);
router.get("/appointments",checkToken,getAppointments);
router.get("/appointments/booked/:id",checkToken,getAppointmentById); //new route added for appointment booking
router.delete("/appointments/delapp/:id",checkToken,deleteAppointmentById); // new route added for deleting booked appointment
router.get("/appointments/history/:id",checkToken,getAppointmentHistoryById);
router.post("/book/appointments",postAppointment);
router.put("/appointments/:id",updateAppointmentById);
router.get("/univ/:id",checkToken,getDoctorUnivById);


/*
router.get("/pridoc",getPrivateDoctors);
router.get("/pridoc/:id",getPrivateDoctorById);
*/

module.exports = router; 