const pool = require("../config/database.js");

module.exports = class allHospitals {

    static fetchAllHospitals(){
        return pool.execute("SELECT * FROM hospital where Bed_Availaibility > 0");
    }
    static fetchHospitalById(hospid){
        return pool.execute(`SELECT * FROM hospital WHERE Hospital_ID = ?`,[hospid]);

    }
    static bookHospitalBed(data,hospid){
        pool.execute("LOCK TABLE hospital WRITE");
        pool.execute(`UPDATE hospital SET Bed_Availaibility = ? WHERE Hospital_ID = ?`,[data.newBeds,hospid]);
        pool.execute("UNLOCK TABLES");
        return pool.execute(`SELECT * FROM hospital WHERE Hospital_ID = ?`,[hospid]);

    }
    // static hospitalHistoryOfUser(uid){
    //     return pool.execute(`SELECT b.hospid,b.name,a.admitDate,a.dischargeDate,a.reason,a.remarks FROM(
    //         SELECT hospid, admitDate,dischargeDate,reason,remarks
    //         FROM BOOK_HOSPITAL where uid = ? GROUP BY hospid) a INNER JOIN HOSPITAL b
    //         on b.hospid = a.hospid`,[uid]);

    // }
}
