import React ,{useState, useEffect} from 'react';
import Drawer from './Drawer'
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  container: {
    //display: "flex"
    marginTop:"10vh",
    
  },
}));

function Bloodbank(){
    const classes = useStyles();
    //FETCH DATA USING USEEFFECT IN THE FORMAT GIVEN BELOW
    const [data,setData] = React.useState([]);
    React.useEffect(() => {
        
        axios.get("https://healthcare-backend-api.herokuapp.com/api/bloodbank/all")    
         
        
        
        .then(function(response){
        console.log(response.data.message); 
        setData(response.data.message); 

        
        
        
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
            BLOODBANKS
            </p>
            <Divider />
            <Paper elevation = {3}>
            <div style = {{background:"#f177aa"}}>
            <br />
          
            <Grid container spacing={3}  >
        <Grid item xs={2}>
        </Grid>

        <Grid item xs={1}>
       
        </Grid>
        <Grid item xs={2}>
         <Typography variant='h5' style = {{color:"white"}}><u>Bloodbank</u></Typography>
        </Grid>
        <Grid item xs={2}>
        <Typography variant='h5' style = {{color:"white"}}><u>City</u></Typography>
        </Grid>
        <Grid item xs={2}>
        <Typography variant='h5' style = {{color:"white"}}><u>State</u></Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant='h5' style = {{color:"white"}}><u>Contact</u></Typography>
        </Grid>
        <Grid item xs={0}>
          
        </Grid>

        

      </Grid>
      <br />
      <Divider />

      </div>
      {
          data.map((currBb,i)=>{
              return(
                  <div>
            <br />

                <Grid container spacing={3}  >
                <Grid item xs={2}>
                </Grid>

                <Grid item xs={1}>
                <Typography>{i+1}</Typography>
                </Grid>
                <Grid item xs={2}>
                <Link href={`/bloodbank/${currBb.bbid}`}>  <Typography>{currBb.name}</Typography> </Link>
                </Grid>
                <Grid item xs={2}>
                <Typography>{currBb.city}</Typography>
                </Grid>
                <Grid item xs={2}>
                <Typography>{currBb.state}</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography>{currBb.contactno}</Typography>
                </Grid>
                <Grid item xs={0}>
                    
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

export default Bloodbank