const allHospitals = require('../models/hospital.js');


exports.getHospitals=(req,res,next)=>{

    allHospitals.fetchAllHospitals()
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

exports.getHospitalById = (req,res,next)=>{
    const hospid = req.params.hospid;
    allHospitals.fetchHospitalById(hospid)
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

exports.bookHospitalBed = (req,res,next)=>{

    const data = req.body;
    const hospid = req.params.hospid;

    allHospitals.bookHospitalBed(data,hospid)
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

// exports.hospitalHistoryOfUser = (req,res,next)=>{
//     const uid = req.params.uid;
//     allHospitals.hospitalHistoryOfUser(uid)
//     .then(result => {
//      if(result[0].length != 0)
//      {

//      res.status(200).json({
//          success:1,
        
//          data:result[0]
//      });
//     }
//     else if(result[0].length == 0)
//     {

//         res.status(501).json({
//             success:0,
           
//             message:"No History Found"
//         });
//        }   
//     }
//     )
    
//     .catch(err => {
//         console.log(err);
//         return res.status(501).json({
//             success:0,
//             message:"Database Connection Error"
//         });
//         }
//             );
// }
