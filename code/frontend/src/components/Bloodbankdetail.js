import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Drawer from './Drawer'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {useParams} from 'react-router-dom';
const axios = require("axios");

function Bloodbankdetail(){
    const initBook = {uid:"2",bbid:"4",blood_group:"A+ve",nunits:1};//initialise with proper uid , bbid and bloodgroup
    const initbbData = {bbid:"",name:"",email:"",city:"",state:"",pincode:"",street:"",contactno:""}//initalize with proper bbid
    const [bbData, changebbData] = useState(initbbData)
    
    const params = useParams();
    React.useEffect(() => {
        
        axios.get(`https://healthcare-backend-api.herokuapp.com/api/bloodbank/${params.bbid}`)    
         
        
        
        .then(function(response){
        console.log(response.data.data); 
        
        changebbData(prevState => ({bbid:response.data.data.bbid,
            name:response.data.data.name,
            email:response.data.data.email,
            city:response.data.data.city,
            state:response.data.data.state,
            pincode:response.data.data.pincode,
            street:response.data.data.street,
            contactno:response.data.data.contactno})) 

        
        
        
        }).catch(function (error) {
            console.log("Invalid Request");
          });
       
        
       
      },[]);    
    const donateBloodFunction = () => {
        axios.post(`https://healthcare-backend-api.herokuapp.com/api/bloodbank/book/${params.bbid}`,{
            
            uid:localStorage.getItem("uid"),
            blood_group:localStorage.getItem("blood_group"),
            nunits:1
            
            
           
        }).then(function(response){

          if(response.data.success === 1)
          {
          console.log('Data posted successfully');
          window.location.href='/bloodbank/book';
          }
          
            
            
            }).catch(function (error) {
                console.log("Invalid Post Request");
              });
    }
    
    return(
        <div>
            <Drawer />
        <div style = {{marginTop:"15vh", marginLeft:"16vw"}}>
            <Link href="/bloodbanks"><Typography align="left" variant = 'h5'>Back to bloodbanks page</Typography></Link>
        <br />
        <Grid container spacing={3}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                <Typography variant='h6'>Name</Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography variant='body1'>{bbData.name}</Typography>
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
                <Typography variant='body1'>{bbData.email}</Typography>
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
                <Typography variant='body1'>{`${bbData.street}, ${bbData.city}, ${bbData.state}, ${bbData.pincode}`}</Typography>
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
                <Typography variant='body1'>{bbData.contactno}</Typography>
                </Grid>
                <Grid item xs={2}>
                </Grid>
         </Grid>
         <br />
         <Divider />
        <br />
         <Typography align="centre" variant="h4">Donate blood, save a life</Typography>
           <br />
           <br />
        <Button size="large" variant="contained" style = {{backgroundColor:"#F65798", color:"white"}} onClick={donateBloodFunction}>
            DONATE A UNIT OF BLOOD
        </Button>
        </div>
        </div>
    )
}

export default Bloodbankdetail