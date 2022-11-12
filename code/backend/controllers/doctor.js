const allDoctors = require('../models/doctor.js');
const { sign } = require("jsonwebtoken");
const { genSaltSync,hashSync, compareSync } = require('bcrypt');

exports.postAppointment = (req,res,next) =>{
    const body = req.body;
    
    allDoctors.insertAppointment(body)

    .then(
        
     res.status(200).json({
         success:1,
         message:"Data inserted successfully"
     })   

    )
    .catch(err => {
        console.log(err);
        return res.status(501).json({
            success:0,
            message:"Database Connection Error"
        });
        }
            );
};

exports.updateAppointmentById = (req,res,next) =>{
    const id = req.params.id;
    const body = req.body;
    allDoctors.updateAppointment(body,id)
    .then(
     res.status(200).json({
         success:1,
        
         message:"Data updated successfully"
     })
    
    
    )
    
    .catch(err => {
        console.log(err);
        return res.status(501).json({
            success:0,
            message:"Database Connection Error"
        });
        }
            );
};


exports.getAllDoctors = (req,res,next) =>{
    
    allDoctors.fetchDoctor()
    .then(result => {
        
     res.status(200).json({
         success:1,
         message:result[0]
     });   
    }
    )
    
    .catch(err => {
        console.log(err);
        return res.status(501).json({
            success:0,
            message:"Database Connection Error"
        });
        }
            );
};

exports.getDoctorById = (req,res,next) =>{
    const id = req.params.id;
    allDoctors.fetchDoctorById(id)
    .then(result => {
     if(result[0].length != 0)
     {

     res.status(200).json({
         success:1,
        
         data:result[0][0]
     });
    }
    else if(result[0].length == 0)
    {

        res.status(501).json({
            success:0,
           
            message:"No User Found"
        });
       }   
    }
    )
    
    .catch(err => {
        console.log(err);
        return res.status(501).json({
            success:0,
            message:"Database Connection Error"
        });
        }
            );
};


exports.getPrivateDoctors = (req,res,next) =>{
    
    allDoctors.fetchPrivateDoctors()
    .then(result => {
        
     res.status(200).json({
         success:1,
         message:result[0]
     });   
    }
    )
    
    .catch(err => {
        console.log(err);
        return res.status(501).json({
            success:0,
            message:"Database Connection Error"
        });
        }
            );
};


exports.getPrivateDoctorById = (req,res,next) =>{
    const id = req.params.id;
    allDoctors.fetchPrivateDoctorById(id)
    .then(result => {
     if(result[0].length != 0)
     {

     res.status(200).json({
         success:1,
        
         data:result[0][0]
     });
    }
    else if(result[0].length == 0)
    {

        res.status(501).json({
            success:0,
           
            message:"No User Found"
        });
       }   
    }
    )
    
    .catch(err => {
        console.log(err);
        return res.status(501).json({
            success:0,
            message:"Database Connection Error"
        });
        }
            );
};


exports.getAppointments = (req,res,next) =>{
    
    var date = new Date();
    date = date.toJSON().slice(0,10);
    allDoctors.fetchAppointment(date)

    .then(result => {
        
     res.status(200).json({
         success:1,
         message:result[0]
     });   
    }
    )
    
    .catch(err => {
        console.log(err);
        return res.status(501).json({
            success:0,
            message:"Database Connection Error"
        });
        }
            );
};

exports.getAppointmentById = (req,res,next) =>{
    var date = new Date();
    date = date.toJSON().slice(0,10);
    const id = req.params.id;
    allDoctors.fetchAppointmentById(id,date)
    .then(result => {
     
     if(result[0].length != 0)
     {
    var slots = result[0];
    // console.log(result[0]);
     res.status(200).json({
         success:1,
        
         data:slots 
     });
    }
    else if(result[0].length == 0)
    {

        res.status(501).json({
            success:0,
           
            message:"No User Found"
        });
       }   
    }
    )
    
    .catch(err => {
        console.log(err);
        return res.status(501).json({
            success:0,
            message:"Database Connection Error"
        });
        }
            );
};

exports.deleteAppointmentById = (req,res,next) =>{
    const id = req.params.id;
    allDoctors.deleteAppointmentbyID(id)
    .then(
        res.status(200).json({
            success:1,
            message:"Data Deleted Successfully"
        })
    )
    
    .catch(err => {
        console.log(err);
        return res.status(501).json({
            success:0,
            message:"Database Connection Error"
        });
        }
            );
};

exports.getAppointmentHistoryById = (req,res,next) =>{
    var date = new Date();
    date = date.toJSON().slice(0,10);
    const id = req.params.id;
    allDoctors.fetchAppointmenHistoryById(id)
    .then(result => {
     if(result[0].length != 0)
     {

     res.status(200).json({
         success:1,
        
         data:result[0] 
     });
    }
    else if(result[0].length == 0)
    {

        res.status(501).json({
            success:0,
           
            message:"No User Found"
        });
       }   
    }
    )
    
    .catch(err => {
        console.log(err);
        return res.status(501).json({
            success:0,
            message:"Database Connection Error"
        });
        }
            );
};

exports.getDoctorUnivById = (req,res,next) =>{
    const id = req.params.id;
    allDoctors.fetchDoctorUniv(id)
    .then(result => {
     if(result[0].length != 0)
     {

     res.status(200).json({
         success:1,
        
         data:result[0][0]
     });
    }
    else if(result[0].length == 0)
    {

        res.status(501).json({
            success:0,
           
            message:"No User Found"
        });
       }   
    }
    )
    
    .catch(err => {
        console.log(err);
        return res.status(501).json({
            success:0,
            message:"Database Connection Error"
        });
        }
            );
};

exports.login = (req,res,next) =>{
    const body = req.body;
    console.log(body.email);
    allDoctors.login(body)
    .then(results => {
     //console.log(results);
     if(results[0].length !=0)
     {
     /*    
     var obj = JSON.parse(JSON.stringify(results[0]));    
     console.log(obj[0].Password);

     */
    

     const check = compareSync(body.password,results[0][0].Password);
     if(body.password == results[0][0].Password)
     {
     results.password = undefined;      
     const jsonwebtoken = sign({result:results[0]},process.env.JWT_AUTH,{
         expiresIn: "24h"
     });       
     res.status(200).json({
         success:1,
         message:"Login was successful",
         data:{uid:results[0][0].Doctor_ID,fname:results[0][0].fname,lname:results[0][0].lname, role:"Doctor"},
         token:jsonwebtoken

     })
     }
     else if(body.password != results[0][0].Password){
        res.status(501).json({
            success:0,
            message:"Invalid Password"
   
        })

     }
    }
    
     else if(results[0].length == 0)
     {
        res.status(501).json({
            success:0,
            message:"Invalid Details"
        })
     }   
    }
    )
    .catch(err => {
        console.log(err);
        return res.status(501).json({
            success:0,
            message:"Database Connection Error"
        });
        }
            );
};
