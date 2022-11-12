import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {useParams} from 'react-router-dom';
import Select from '@material-ui/core/Select';
import Drawer from './Drawer'
import InputLabel from '@material-ui/core/InputLabel';
const axios = require("axios");
function DoctorDetail(){
    const today = new Date().toISOString().slice(0, 10);
    const initdocData = {uid:"",fname:"",lname:"",email:"",work_city:"",work_state:"",work_pincode:"",work_street:"",degree:"",contactno:"",specialization:""}//initalize with proper hospid
    const initBook = {uid:"2",hospid:"4",reason:"", admitDate : today};//initialise with proper uid and hospid
    const [docData, changedocData]=useState(initdocData);
    const [bookApp, changebookApp] = useState(initBook);
    const [booked,setBooked] = useState([]);
    const [timeset,setTimeSet] = useState("");
    const [date,setDate] = useState("");
    const [reason1,setReason1] = useState("");
    const params = useParams();
    const timeSlot = ["8.00-9.00","9.00-10.00","10.00-11.00","11.00-12.00","17.00-18.00","18.00-19.00","19.00-20.00","20.00-21.00"];
       React.useEffect(() => {
       

    //     axios.delete(`https://dataproj-backend-api.herokuapp.com/api/doctor/appointments/delapp/30}`,{
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("token")
            
    //       }

    //     })    
   
  
   
    // .then(function(response){
   
    // console.log(response.data);


    
    // }).catch(function (error) {
    //     console.log("Invalid Request");
    //   });

        axios.get(`https://dataproj-backend-api.herokuapp.com/api/doctor/private/${params.uid}`,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
                
              }
        })    
        .then(function(response){
        console.log(response.data); 
        
        changedocData(prevState => ({
            uid:response.data.data.Doctor_ID,
            fname:response.data.data.fname,
            lname:response.data.data.lname,
           
            Street:response.data.data.Street,
            degree:response.data.data.degree,
            Specialization:response.data.data.Specialization,
            Phone:response.data.data.Phone})) 

        
        
        
        }).catch(function (error) {
            console.log("Invalid Request");
          });
       
          axios.get("https://dataproj-backend-api.herokuapp.com/api/doctor/appointments",{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
                
              }
  
        })    
         
        
        
        .then(function(response){
        console.log(response.data.message); 
        setBooked(response.data.message);
       
        
        
        }).catch(function (error) {
            console.log("Invalid Request");
          });
        
       
      },[]);   
      
      var i,j;

      for(i=0;i<booked.length;i++)
      {
          if(booked[i].doa.substring(0,10) == date)
          for(j=0;j<timeSlot.length;j++)
          {
              if(booked[i].timeslot == timeSlot[j])
              timeSlot[j] = "";
          }
      }
      
      
      
      const bookAppointment = () => {
        console.log(timeset);
      var date1;
      if(((parseInt(date.substring(8)) + 1).toString()).length == 1)
         date1 = date.substring(0,8).concat("0").concat((parseInt(date.substring(8)) + 1).toString());
        else 
        date1 = date.substring(0,8).concat((parseInt(date.substring(8)) + 1).toString());
        console.log(date1);
        console.log(reason1);
        setDate(date1);
        axios.post("https://dataproj-backend-api.herokuapp.com/api/doctor/book/appointments",{
            d_uid:docData.uid,
            p_uid:localStorage.getItem("uid"),
            reason:reason1,
            isBooked:1,
            isDone:0,
            timeslot:timeset,
            doa:date1,
            remarks:""
        }).then(function(response){
          
          if(response.data.success === 1)
          {
          console.log('Data posted successfully');
          
          }
          
            
            
            }).catch(function (error) {
                console.log("Invalid Post Request");
              });

              window.location.href='/doctor/book';
      }

  

    
        return(
          <div>
            <Drawer />
        <div style = {{marginTop:"15vh", marginLeft:"16vw"}}>
        <Link href="/doctors"><Typography align="left" variant = 'h5'>Back to doctors page</Typography></Link>
        <br />
        <Grid container spacing={3}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                <Typography variant='h6'>Name</Typography>
                </Grid>
                <Grid item xs={4}>
        <Typography variant='body1'>{docData.fname} {docData.lname}</Typography>
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
                <Typography variant='body1'>{docData.Street} </Typography>
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
                <Typography variant='body1'>{docData.Phone}</Typography>
                </Grid>
                <Grid item xs={2}>
                </Grid>
         </Grid>
         <Grid container spacing={3}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                <Typography variant='h6'>Specialization</Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography variant='body1'>{docData.Specialization}</Typography>
                </Grid>
                <Grid item xs={2}>
                </Grid>
         </Grid>
        
         <br />
        <Divider />
        <br />
         <Typography align="centre" variant="h4">Book an Appointment</Typography>
           <br />
           <Grid container>
               <Grid item xs = {4}>
           <TextField
          required
          id="outlined-required"
          label="Reason"
          value={reason1}
          variant="outlined"
          onChange={(e)=>setReason1(e.target.value)}
          
        />
        </Grid>
        
        <Grid item xs = {4}>
        <TextField
                id="date"
                label="Date"
                type="date"
                onChange={(e)=>setDate(e.target.value.substring(0,10))}
                InputLabelProps={{
                  shrink: true,
                  }}
                />
        </Grid>

        <Grid item xs = {4}>
        <InputLabel htmlFor="time-slot">Time Slot</InputLabel>
            <Select
          native
          
          onChange={(e)=>setTimeSet(e.target.value)}
          inputProps={{
            name: 'time-slot',
            id: 'time-slot',
          }}
        >
          <option aria-label="None" value="" />
          {timeSlot.map((slot) => {
          if(slot!="")
          return( 
                 
          <option value={slot}>{slot}</option>    
          );  
        })}
         
        </Select>


        </Grid>
        </Grid>
        <br />
        <br />
        <Button size="large" variant="contained" color="secondary" onClick = {bookAppointment}>
            BOOK
        </Button>
           
        
        
        </div>
        </div>
    )
}

export default DoctorDetail