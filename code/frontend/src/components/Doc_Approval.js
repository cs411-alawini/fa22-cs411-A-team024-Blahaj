import React ,{useState, useEffect} from 'react';
import Drawer from './Drawer'
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  container: {
    //display: "flex"
    marginTop:"10vh",
  },
}));

function DocApproval(){
    const classes = useStyles();
    //FETCH DATA USING USEEFFECT IN THE FORMAT GIVEN BELOW
    const [data,setData] = React.useState([]);

    const approveData = (appId) => {
        
        axios.put(`http://localhost:5000/api/doctor/appr/vacc/${appId}`,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
            
          }

    })    
     
    
    
    .then(function(response){
    console.log(response); 
    //setData(response.data.data);
     

    
    
    
    }).catch(function (error) {
        console.log("Invalid Request");
      });

      window.location.reload();
       
    }
    

    React.useEffect(() => {
    
      axios.get(`http://localhost:5000/api/doctor/vacc/${localStorage.getItem('uid')}`,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
            
          }

    })    
     
    
    
    .then(function(response){
    console.log(response.data.data); 
    setData(response.data.data);
     

    
    
    
    }).catch(function (error) {
        console.log("Invalid Request");
      });
    
       
      },[]);



    return(
        <div className={classes.container}>
        <Drawer />
        <br />
            <p
            className = "titlepage" align = "center" style={{fontSize: "4.1vw", color: "#11223E", marginLeft: "15vw" }}
            > 
            VACCINATION FORM APPROVAL
            </p>
            <Divider />
            <Paper>
            <div style = {{background:"#f177aa"}}>
            <br />
            <Grid container spacing={3}>
        <Grid item xs={1}>
        </Grid>

        <Grid item xs={1}>
          
        </Grid>
        <Grid item xs={1}>
         <Typography variant='h5' style = {{color:"white"}}><u>UserID</u></Typography>
        </Grid>
        <Grid item xs={1}>
         <Typography variant='h5' style = {{color:"white"}}><u>Vaccine 1</u></Typography>
        </Grid>
        <Grid item xs={2}>
        <Typography variant='h5' style = {{color:"white"}}><u>Vaccine 1 Proof</u></Typography>
        </Grid>
        <Grid item xs={1}>
        <Typography variant='h5' style = {{color:"white"}}><u>Vaccine 2</u></Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h5' style = {{color:"white"}}><u>Vaccine 2 Proof</u></Typography>
        </Grid>
        <Grid item xs={2}>
        <Typography variant='h5' style = {{color:"white"}}><u>Approve Form</u></Typography>
        </Grid>
        

        

      </Grid>
      <Divider />


      </div>
      {
          data.map((vacc,i)=>{
           
              return(
                  <div>
            <br />

                <Grid container spacing={3}>
                <Grid item xs={1}>
                </Grid>

                <Grid item xs={1}>
                <Typography>{i+1}</Typography>
                </Grid>
                <Grid item xs={1}>
              <Typography>{vacc.User_ID}</Typography>
                </Grid>
                <Grid item xs={1}>
              <Typography>{vacc.Vaccine_1}</Typography>
                </Grid>
                <Grid item xs={2}>
                <Link href={vacc.Vaccine_1_Proof}>  <Typography>PROOF</Typography> </Link>
                
                </Grid>
                <Grid item xs={1}>
                <Typography>{vacc.Vaccine_2}</Typography>
                </Grid>
                <Grid item xs={3}>
                <Link href={vacc.Vaccine_2_Proof}>  <Typography>PROOF</Typography> </Link>
                </Grid>
                <Grid item xs={2}>
                <Button size="large"  variant="contained" style = {{backgroundColor:"#F65798", color:"white"}} onClick = {() => approveData(vacc.Form_ID)}>
                APPROVE
            </Button>
                </Grid>
              

                </Grid>
                <br />
                <Divider light/>
                </div>
              )
          })

      }</Paper>
      
        </div>
    )
}

export default DocApproval;