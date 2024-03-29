import React from 'react';
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

function Hospital(){
    const classes = useStyles();
    const [data,setData] = React.useState([]);
    const role = localStorage.getItem("role");
    React.useEffect(() => {
        if(role == "Univ"){
          axios.get("http://localhost:5000/api/univ/hospital/" + localStorage.getItem('uid'))     
          .then(function(response){
          console.log(response.data.data); 
          setData(response.data.data); 

          }).catch(function (error) {
              console.log("Invalid Request");
            });
         
        }
        else {
        axios.get("http://localhost:5000/api/hospital/all")    
        .then(function(response){
        console.log(response.data.message); 
        setData(response.data.message); 

        }).catch(function (error) {
            console.log("Invalid Request");
          });
        }
        
},[]);
      
    return(
        <div className={classes.container}>
        <Drawer />
        <br />
            <p
            className = "titlepage" align = "center" style={{fontSize: "4.1vw", color: "#11223E", marginLeft: "15vw" }}
            > 
            HOSPITALS
            </p>
            <Divider />
            <Paper elevation = {3}>
            <div style = {{background:"#f177aa"}}>
           <br />
            
            <Grid container spacing={3} >
        <Grid item xs={2}>
        </Grid>

        <Grid item xs={1}>
          
        </Grid>
        <Grid item xs={3}>
        <Typography variant='h5' style = {{color:"white"}}><u>Hospital</u></Typography>
        </Grid>
        <Grid item xs={2}>
        <Typography variant='h5' style = {{color:"white"}}><u>Address</u></Typography>
        </Grid>
        <Grid item xs={2}>
        <Typography variant='h5' style = {{color:"white"}}><u>Distance (miles)</u></Typography>
        </Grid>
        <Grid item xs={2}>
        <Typography variant='h5' style = {{color:"white"}}><u>Beds</u></Typography>
        </Grid>
        {/* <Grid item xs={2}>
          <Typography variant='h5' style = {{color:"white"}}><u>Beds Available</u></Typography>
        </Grid> */}
        <Grid item xs={1}>
          
        </Grid></Grid>
      <Divider />
      </div>
      {
          data.map((currHos,i)=>{
              return(
                  <div>
            <br />

                <Grid container spacing={3}>
                <Grid item xs={2}>
                </Grid>

                <Grid item xs={1}>
                <Typography>{i+1}</Typography>
                </Grid>
                <Grid item xs={3}>
                <Link href={`/hospital/${currHos.ID}`}>  <Typography>{currHos.Name}</Typography> </Link>
                </Grid>
                <Grid item xs={2}>
                <Typography>{currHos.Address}</Typography>
                </Grid>
                <Grid item xs={2}>
                <Typography>{currHos.Distance_From_Univ}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>{currHos.Bed_Availaibility}</Typography>
                </Grid>
                <Grid item xs={1}>
                    
                </Grid>

                </Grid>
               
                <Divider light/>
                </div>
              )
          })

      }
      </Paper>
        </div>
    )
}

export default Hospital