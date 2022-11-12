import React ,{useState, useEffect} from 'react';
import Drawer from './Drawer'
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  container: {
    //display: "flex"
    marginTop:"10vh",
  },
}));
function NameFind(arr,id){
    for(var i = 0;i<arr.length;i++)
    {   
       if(arr[i].uid == id)
       {
           var namefull = arr[i].fname + " " + arr[i].lname;
           var contact = arr[i].contactno;
       }
    }
return {name:namefull,contactno:contact};
}
function Appointments(){
    const classes = useStyles();
    //FETCH DATA USING USEEFFECT IN THE FORMAT GIVEN BELOW
    const [data,setData] = React.useState([]);
    const [users,setUsers] = React.useState([]);
    const [check_val,setCheck] = React.useState(false);
        React.useEffect(() => {
        
        axios.get(`https://dataproj-backend-api.herokuapp.com/api/doctor/appointments/booked/${localStorage.getItem("uid")}`,{
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
        
          axios.get("https://dataproj-backend-api.herokuapp.com/api/users/all",{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
              
            }
    
          })    
         
        
        
        .then(function(response){
        console.log(response.data.message);  
        setUsers(response.data.message);
                  
        }).catch(function (error) {
            console.log("Invalid Request");
          });
      },[]);

      var temp;
      for(var i=0;i<data.length-1;i++)
      {

        for(var j=0;j<data.length-i-1;j++)
        {

           if(data[j].doa == data[j+1].doa)
           { 
           var x = parseInt(data[j].timeslot.substring(0,2));
          var y = parseInt(data[j+1].timeslot.substring(0,2))
          if(x > y)
          {
            temp = data[j];
            data[j] = data[j+1];
            data[j+1] = temp;
          } 
        }
        }
      }
      const handleCheck = (event) =>{
          console.log(event.target.checked);
          var j;
          for(var i=0;i<data.length;i++)
          {
              if(data[i].aid == parseInt(event.target.name))
              {
                  if(event.target.checked == true)
                  data[i].isDone = 1;
                  else if(event.target.checked == false)
                  data[i].isDone = 0;
                  j = i;
                  console.log("AID: " + data[i].aid + " isDone : "+ data[i].isDone);
              }
          }
          axios.put(`https://healthcare-backend-api.herokuapp.com/api/doctor/appointments/${parseInt(event.target.name)}`,{
            d_uid:data[j].d_uid,
            p_uid:localStorage.getItem("uid"),
            reason:data[j].reason,
            isBooked:data[j].isBooked,
            isDone:data[j].isDone,
            timeslot:data[j].timeslot,
            doa:data[j].doa.substring(0,10),
            remarks:""
            
            
           
        }).then(function(response){

          if(response.data.success === 1)
          {
          console.log('Data posted successfully');
          
          }
          
            
            
            }).catch(function (error) {
                console.log("Invalid Post Request");
              });

      }
    return(
        <div className={classes.container}>
        <Drawer />
        <br />
            <p
             className = "titlepage" align = "center" style={{fontSize: "4.1vw", color: "#11223E", marginLeft: "15vw" }}
            > 
            YOUR APPOINTMENTS
            </p>
            <Divider /><br />
            <Paper>
            <div style = {{background:"#f177aa"}}>

            <Grid container spacing={3}>
        <Grid item xs={1}>
        </Grid>

        <Grid item xs={1}>
          
        </Grid>
        
        
        </Grid>
            <Grid container spacing={3}>
        <Grid item xs={2}>
        </Grid>

        <Grid item xs={1}>
        <Typography variant='h5' style = {{color:"white"}}><u>Sr No.</u></Typography>
        </Grid>
        <Grid item xs={2}>
         <Typography variant='h5' style = {{color:"white"}}><u>Name</u></Typography>
        </Grid>
        <Grid item xs={1}>
         <Typography variant='h5' style = {{color:"white"}}><u>Contact</u></Typography>
        </Grid>
        <Grid item xs={1}>
        <Typography variant='h5' style = {{color:"white"}}><u>Time Slot</u></Typography>
        </Grid>
        <Grid item xs={2}>
        <Typography variant='h5' style = {{color:"white"}}><u>Reason</u></Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant='h5' style = {{color:"white"}}><u>isDone</u></Typography>
        </Grid>
        <Grid item xs={2}>
        <Typography variant='h5' style = {{color:"white"}}><u>Date</u></Typography>
        </Grid>

        

      </Grid>
      <Divider /> 

</div>
    
       {    
        
        data.map((currApp,i)=>{
         
          if(currApp.isDone == 0)
          

           return(  
                <div>
          <br />

              <Grid container spacing={3}>
              <Grid item xs={2}>
                 
              </Grid>

              <Grid item xs={1}>
           <Typography>{i+1}</Typography>
              </Grid>
              <Grid item xs={2}>
           <Typography>{currApp.fname} {currApp.lname}</Typography>
              </Grid>
              <Grid item xs={1}>
           <Typography>{currApp.Phone}</Typography>
              </Grid>
              <Grid item xs={1}>
              <Typography>{currApp.timeslot}</Typography>
              </Grid>
              <Grid item xs={2}>
              <Typography>{currApp.reason}</Typography>
              </Grid>
              <Grid item xs={1}>
                  
              
              
                   <Checkbox
                    value = {currApp.isDone}
                    name = {currApp.aid}
                    onChange = {handleCheck}
                    inputProps={{ id:'isp'}}
                   
                  />    
              
              </Grid>
              <Grid item xs={2}>
              <Typography>{currApp.doa.substring(0,10)}</Typography>
              </Grid>

              </Grid>
              <br />
              <Divider light/>
              </div>
           )})  
        }
</Paper>
         
            
       
      
        </div>
    )
}

export default Appointments;