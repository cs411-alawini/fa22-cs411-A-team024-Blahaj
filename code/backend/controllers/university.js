const allUnivs = require('../models/university.js');
const { sign } = require("jsonwebtoken");
const { genSaltSync,hashSync, compareSync } = require('bcrypt');

exports.getUnivs=(req,res,next)=>{

    allUnivs.fetchAllUnivs()
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
        })

}

exports.getUnivById = (req,res,next)=>{
    const id = req.params.univid;
    allUnivs.fetchUnivById(id)
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

}

exports.getUserByUnivId = (req,res,next)=>{
    const id = req.params.univid;
    allUnivs.fetchUserbyUnivId(id)
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

}

exports.getDoctorByUnivId = (req,res,next)=>{
    const id = req.params.univid;
    allUnivs.fetchDoctorbyUnivId(id)
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

}

exports.getHospByUnivId = (req,res,next)=>{
    const id = req.params.univid;
    allUnivs.fetchHospitalbyUnivId(id)
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

}


exports.searchUsers = (req,res,next)=>{
    const str1 = req.params.str;
    console.log(str1);
    allUnivs.searchUser(str1)
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

}

exports.searchDoctors = (req,res,next)=>{
    const str1 = req.params.str;
    console.log(str1);
    allUnivs.searchDoctor(str1)
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

}

exports.searchHospitals = (req,res,next)=>{
    console.log(req.params.str);
    const str1 = req.params.str;
    const univid = req.params.univid;
    console.log(str1);
    allUnivs.searchHospital(str1,univid)
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

}

exports.getNearestHospByUnivId = (req,res,next)=>{
    const id = req.params.univid;
    allUnivs.fetchNearestHospbyUnivId(id)
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

}

exports.getMedHisByUnivId = (req,res,next)=>{
    const id = req.params.univid;
    allUnivs.fetchMedHisbyUnivId(id)
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

}

exports.login = (req,res,next) =>{
    const body = req.body;
    console.log(body.email);
    allUnivs.login(body)
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
            data:{uid:results[0][0].University_ID,fname:results[0][0].NAME,lname:"", role:"Univ"},
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
