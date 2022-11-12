import React, { useEffect, useState } from 'react';
import Drawer from './Drawer'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {useParams} from 'react-router-dom';
const axios = require("axios");
function Hospitaldetail(){
    const today = new Date().toISOString().slice(0, 10);
    const inithospData = {hospid:"",name:"",email:"",city:"",state:"",pincode:"",street:"",nbeds:0,contactno:""}//initalize with proper hospid
    const initBook = {uid:"2",hospid:"4",reason:"", admitDate : today};//initialise with proper uid and hospid
    const [hospData, changehospData]=useState(inithospData);
    const [bookBed, changebookBed] = useState(initBook);

    const params = useParams();
       React.useEffect(() => {
        
        axios.get(`https://healthcare-backend-api.herokuapp.com/api/hospital/${params.hospid}`)    
         
        
        
        .then(function(response){
        console.log(response.data.data); 
        changehospData(prevState => ({hospid:response.data.data.hospid,
            name:response.data.data.name,
            email:response.data.data.email,
            city:response.data.data.city,
            state:response.data.data.state,
            pincode:response.data.data.pincode,
            street:response.data.data.street,
            nbeds:response.data.data.nbeds,
            contactno:response.data.data.contactno})) 

        
        
        
        }).catch(function (error) {
            console.log("Invalid Request");
          });
       
        
       
      },[]);    

  

    const bookBedFunction = () =>{
        console.log(bookBed)
        axios.post(`https://healthcare-backend-api.herokuapp.com/api/hospital/book/${params.hospid}`,{
            newBeds:(hospData.nbeds-1),
            u_id:localStorage.getItem("uid"),
            admitDate:today,
            dischargeDate:0,
            cause:bookBed.reason,
            remarks:"",
            
            
           
        }).then(function(response){

          if(response.data.success === 1)
          {
          console.log('Data posted successfully');
          window.location.href='/hospital/book';
          }
          
            
            
            }).catch(function (error) {
                console.log("Invalid Post Request");
              });
    }
        return(
        <div>
          <Drawer />
          <div style = {{marginTop:"15vh", marginLeft:"16vw"}}>
        <Link href="/hospitals"><Typography align="left" variant = 'h5'>Back to hospitals page</Typography></Link>
        <br />
        <Grid container spacing={3}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                <Typography variant='h6'>Name</Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography variant='body1'>{hospData.name}</Typography>
                </Grid>
                <Grid item xs={2}>
                </Grid>
         </Grid>
         <Grid container spacing={3}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                <Typography variant='h6'>Email</Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography variant='body1'>{hospData.email}</Typography>
                </Grid>
                <Grid item xs={2}>
                </Grid>
         </Grid>
         <Grid container spacing={3}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                <Typography variant='h6'>Address</Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography variant='body1'>{`${hospData.street}, ${hospData.city}, ${hospData.state}, ${hospData.pincode}`}</Typography>
                </Grid>
                <Grid item xs={2}>
                </Grid>
         </Grid>
         <Grid container spacing={3}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                <Typography variant='h6'>Contact Number</Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography variant='body1'>{hospData.contactno}</Typography>
                </Grid>
                <Grid item xs={2}>
                </Grid>
         </Grid>
         <Grid container spacing={3}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                <Typography variant='h6'>Beds available</Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography variant='body1'>{hospData.nbeds}</Typography>
                </Grid>
                <Grid item xs={2}>
                </Grid>
         </Grid>
         <br />
        <Divider />
        <br />
         <Typography align="centre" variant="h4">Book a bed</Typography>
           <br />
           <TextField
          required
          id="outlined-required"
          label="Reason"
          defaultValue=""
          variant="outlined"
          onChange={(e)=>changebookBed({...bookBed, reason:e.target.value})}
        />
        <br />
        <br />
        <Button size="large" variant="contained" style = {{backgroundColor:"#F65798", color:"white"}} onClick={bookBedFunction}>
            BOOK
        </Button>
           
        </div>
        
        </div>
    )
}

export default Hospitaldetail