import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import profile from './profile.png';
import { InputLabel, Menu, MenuItem } from "@material-ui/core";
import AccountCircleRounded from "@material-ui/icons/AccountCircleRounded";
import "./mystyles.css";

const drawerWidth = "15vw";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth})`,
    left: drawerWidth,
    backgroundColor: "white",
    
    
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: "#11223E",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#11223E"
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));



const Drawer1 = props => {
  const { history } = props;
  
  const role = localStorage.getItem("role");
  const classes = useStyles();
  let itemsList = [
    {
      text: "Home",
      onClick: () => history.push(`/home/${localStorage.getItem("uid")}`)
    },
    {
      text: "Hospitals",
      onClick: () => history.push("/hospitals")
      
    },
    {
      text: "Bloobanks",
      onClick: () => history.push("/bloodbanks")
    },
    {
      text: "History",
      onClick: () => history.push(`/history/${localStorage.getItem("uid")}`)
    },
    {
      text: "Doctors",
      onClick: () => history.push("/doctors")
    }
  ];
  if(localStorage.getItem("role")==='Doctor') itemsList.push({text:"Appointments", onClick : ()=> history.push(`/appointments`)})
  if(localStorage.getItem("role")==='Univ') itemsList.push({text:"Students", onClick : ()=> history.push(`/students`)})
  if(localStorage.getItem("role")==='Univ') itemsList.push({text:"Urgent", onClick : ()=> history.push(`/Urgent`)})
  if(localStorage.getItem("role")==='Univ') itemsList.push({text:"Analysis", onClick : ()=> history.push(`/Analysis`)})
  if(localStorage.getItem("role")==='Patient') itemsList.splice(1,1);   
  if(localStorage.getItem("role")==='Univ') itemsList.splice(3,1);
  if(localStorage.getItem("role")==='Univ') itemsList.splice(2,1);


  const logoutfun = () => {
    
    localStorage.clear();
   localStorage.setItem("status",0);  
 }
 
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} >
        <Toolbar style={{ height: "100%" }}>
          <div className="navbar-input-box">
            <div className="city-search">
              <div>
                
              </div>
              <p className = "titlepage" style={{fontSize: "2.1vw", color: "#11223E" }}>
                <strong>quicure.com</strong>
              </p>
            </div>
          </div>
          <Divider
            orientation="vertical"
            style={{
              margin: "1rem",
              background: "#F65798",
              width: "0.16vw",
              height: "8vh",
            }}
          />
        
         
          
          <div className="navbar-input-box">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                  }}
                >
                  <div>
                   
                  </div>
                
                  <div>
                  <p  className = "desc1">Working towards a healthier tomorrow</p>
                  
                  </div>
                  
                </div>{" "}
              </div>
              
            </div>
          </div>
          <Button style = {{left:"30vw",  color: "#11223E" , fontWeight:"600", fontSize:"1.2vw"}} onClick = {logoutfun} href = "/" >LOGOUT</Button>
        </Toolbar>
      </AppBar>
    
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
      <Grid container>


        <Grid item xs = {2}></Grid>
        <Grid item xs = {9}>
        <AccountCircleRounded
                  className="user_logo"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  
                  style={{
                    margin: "6px 0 0 0",
                    color: "#F65798",
                    
                    fontSize:"10vw"
                  }}
                ></AccountCircleRounded>
        </Grid>
<Grid item xs = {1}></Grid>
        </Grid>
        <Grid container>


        <Grid item xs = {1}></Grid>
        <Grid item xs = {10}>
      <p className = "name" align = "center"  style = {{fontSize: "1.3vw", color: "#F65798" ,fontWeight:250,marginBottom: "1vh"}}><strong>{localStorage.getItem("fname")} </strong></p>
      <p className = "name" align = "center"  style = {{fontSize: "1.3vw", color: "#F65798" ,fontWeight:250,marginBottom: "1vh"}}><strong>{localStorage.getItem("lname")} </strong></p>
      <Divider
            orientation="horizontal"
            style={{
              
              align:"center",
              background: "#F65798",
              width: "12vw",
              height: "0.5vh",
            }}
          />
        
        </Grid>
<Grid item xs = {1}></Grid>
        </Grid>
      
        <Divider />
        <List>
        {itemsList.map((item, index) => {
          const { text,  onClick } = item;
          return (
            <div>
            <ListItem button key={text} onClick={onClick}>
              
              <p className = "navlist" style={{fontSize: "1.1vw", color: "white" }}>{text}</p>
            </ListItem>
           
        
            </div>
          );
        })}
      </List>  
        
      </Drawer>
      
    </div>
  );
};

export default withRouter(Drawer1);

