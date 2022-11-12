const pool = require("../config/database.js");

module.exports = class allUsers {
    static insertUsers(data){
        
        
       
    const results =  pool.execute(`INSERT INTO USER(fname,Address,Phone,Medical_History,lname,University_ID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [data.fname,data.Address,data.Phone,data.Medical_History,data.lname,data.University_ID]);
    
    
        return results; 

        
    /*
    TRIGGER USED:

    mysql> CREATE TRIGGER DOCTOR_INSERT1
    -> AFTER INSERT
    -> ON USER
    -> FOR EACH ROW
    -> IF NEW.role = "Doctor" THEN
    ->
    -> INSERT INTO DOCTOR (uid) VALUES (NEW.uid);
    -> END IF;
    -> //
     */    
    }
    static fetchUsers(){
        
        return pool.execute("SELECT * FROM users");
    }

    static fetchUsersbyId(id){
        
        return pool.execute(`SELECT UserID,Password,Phone,fname,lname,Medical_History,University_ID FROM users WHERE UserID = ?`,[id]);
    }
    static updateUsers(data,id){
        
        return pool.execute(`UPDATE users SET fname,lname,Address,Phone,Medical_History WHERE UserID = ?`,
        [data.fname,data.lname,data.street,data.contactno,data.medical_history,id]);
    }

    static fetchUsersUniv(id){
        
        return pool.execute(`
        SELECT u.UserID, univ.University_ID, univ.Name, univ.Address 
        FROM users AS u INNER JOIN UNIVERSITY AS univ ON u.University_ID = univ.University_ID
        WHERE u.UserID = ?;
        `, [id]);
    }

    static fetchUsersDoctor(id){
        
        return pool.execute(`
        SELECT * FROM DOCTOR WHERE University_ID = (SELECT University_ID FROM users WHERE UserID = ?);
        `, [id]);
    }

    
    static login(data){
        
        return pool.execute(`SELECT * FROM users WHERE UserID = ?`,[data.email]);
    }
   
}


