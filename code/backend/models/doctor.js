const pool = require("../config/database.js");

module.exports = class allDoctors {

    static insertAppointment(data) {
        const result = pool.execute(`INSERT INTO APPOINTMENT (d_uid,p_uid,reason,remarks,isBooked,isDone,timeslot,doa) VALUES (?,?,?,?,?,?,?,?)`
            , [data.d_uid, data.p_uid, data.reason, data.remarks, data.isBooked, data.isDone, data.timeslot, data.doa]);
        return result;
    }
    static updateAppointment(data, id) {
        return pool.execute(`UPDATE APPOINTMENT SET d_uid = ?,p_uid = ?,reason = ?,remarks = ?,isBooked = ?,isDone = ?,timeslot = ?,doa = ? WHERE aid = ?`
            , [data.d_uid, data.p_uid, data.reason, data.remarks, data.isBooked, data.isDone, data.timeslot, data.doa, id]);

    }

    static fetchDoctor() {

        return pool.execute(`SELECT * FROM DOCTOR`);

    }
    static fetchDoctorById(id) {

        return pool.execute(`SELECT * FROM DOCTOR WHERE uid = ?`
            , [id]);
    }


    static fetchPrivateDoctors() {

        return pool.execute(`SELECT * FROM DOCTOR`);
    }

    static fetchPrivateDoctorById(id) {

        return pool.execute(`SELECT * FROM DOCTOR WHERE Doctor_ID = ?`
            , [id]);
    }

    static fetchAppointment(date) {
        return pool.execute("SELECT * FROM APPOINTMENT WHERE doa >= ? ORDER BY doa", [date]);
    }

    static deleteAppointmentbyID(id) {
        pool.execute("DELETE FROM APPOINTMENT WHERE aid = ?", [id]);
        return pool.execute("SELECT * FROM APPOINTMENT WHERE aid = ?", [id]);
    }
    static fetchAppointmentById(id, date) {
        //console.log(id);
        //console.log(date);
        return pool.execute(`
        SELECT aid,d_uid,p_uid,reason,remarks,isBooked,isDone,timeslot,doa,UserID,fname,lname,Phone FROM APPOINTMENT INNER JOIN users ON APPOINTMENT.p_uid = users.UserID WHERE d_uid = ? AND doa >= ? ORDER BY doa
        `, [id, date]);


    }
    static fetchAppointmenHistoryById(id) {
        return pool.execute(`
        SELECT app.aid, app.d_uid, app.p_uid, app.reason, app.remarks, app.isBooked, app.isDone, app.doa, app.timeslot, d.fname, d.lname, d.Street, d.City, d.County, d.State, d.Zip, d.Phone, d.Specialization, d.Degree
        FROM APPOINTMENT as app INNER JOIN DOCTOR d ON app.d_uid = d.Doctor_ID WHERE p_uid = ? ORDER BY doa;`

            , [id]);

    }

    

    static fetchDoctorUniv(id) {
        return pool.execute(`
        SELECT u.Doctor_ID, univ.University_ID, univ.Name, univ.Address 
        FROM DOCTOR AS u INNER JOIN UNIVERSITY AS univ ON u.University_ID = univ.University_ID;`
            , [id]);

    }


    static login(data) {

        return pool.execute(`SELECT * FROM DOCTOR WHERE Doctor_ID = ?`, [data.email]);
    }

}


