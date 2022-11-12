const pool = require("../config/database.js");

module.exports = class allUnivs {

    static fetchAllUnivs(){
        return pool.execute("SELECT University_ID,NAME,TELEPHONE,ADDRESS FROM UNIVERSITY");
    }
    static fetchUnivById(univid){
        return pool.execute(`SELECT University_ID,NAME,TELEPHONE,ADDRESS FROM UNIVERSITY WHERE University_ID = ?`,[univid]);

    }

    static fetchUserbyUnivId(univid){
        return pool.execute(`SELECT * FROM users WHERE University_ID = ?`,[univid]);

    }

    static fetchDoctorbyUnivId(univid){
        return pool.execute(`SELECT * FROM DOCTOR WHERE University_ID = ?`,[univid]);

    }

    static fetchHospitalbyUnivId(univid){
        return pool.execute(`SELECT * FROM hospital WHERE University_ID = ? ORDER BY Distance_From_Univ`,[univid]);

    }

    static searchUser(str){

        return pool.execute(`SELECT fname,lname,Address,Phone,Medical_History FROM users WHERE fname LIKE '%${str}%' OR lname LIKE '%${str}%' OR Address LIKE '%${str}%' OR Medical_History LIKE '%${str}%'`);

    }

    static searchDoctor(str){

        return pool.execute(`SELECT fname,lname,Street,City,State,Zip,Phone,Specialization,Degree FROM DOCTOR WHERE fname LIKE '%${str}%' OR lname LIKE '%${str}%' OR Specialization LIKE '%${str}%' OR Degree LIKE '%${str}%'`);

    }

    static searchHospital(str,univid){
        console.log(str=="");
        return pool.execute(`SELECT Name,Address FROM hospital WHERE University_ID = ? AND (Name LIKE '%${str}%' OR Address LIKE '%${str}%')`,[univid]);

    }


    
    static login(data){
        
        return pool.execute(`SELECT * FROM UNIVERSITY WHERE University_ID = ?`,[data.email]);
    }

    static fetchNearestHospbyUnivId(univid){
        return pool.execute(`
        SELECT uni.University_ID, uni.Name, q.ID, q.Hospital_Name, q.No_of_Beds,MIN(Distance_From_Univ) as Min_Distance
        FROM UNIVERSITY uni INNER JOIN hospital h ON uni.University_ID = h.University_ID INNER JOIN 
       (SELECT hospital.Hospital_ID as ID, hospital.Name as Hospital_Name, hospital.Bed_Availaibility as No_of_Beds, hospital.University_ID as univ_id, hospital.Distance_From_Univ as dis FROM hospital) q ON (q.univ_id = uni.University_ID AND q.dis = (SELECT MIN(hospital.Distance_From_Univ) FROM hospital WHERE hospital.University_ID = uni.University_ID GROUP BY hospital.University_ID ))
        GROUP BY uni.University_ID, uni.Name HAVING uni.University_ID = ?
        ORDER BY Min_Distance DESC;
       `
        ,[univid]);

    }

    static fetchMedHisbyUnivId(univid){
        return pool.execute(`
        SELECT uni.University_ID, uni.Name, u.Medical_History, COUNT(*) as Count_Users
        FROM users u INNER JOIN UNIVERSITY uni ON u.University_ID = uni.University_ID
        GROUP BY uni.University_ID, u.Medical_History, uni.Name HAVING uni.University_ID = ?
        ORDER BY Count_Users DESC, uni.Name ASC;

       `
        ,[univid]);

    }
}
