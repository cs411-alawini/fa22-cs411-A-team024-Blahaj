import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';

import Divider from '@material-ui/core/Divider';

const axios = require('axios');
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}




function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Quicure
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(14),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    appBar: {
      
     
      backgroundColor: "white",
      
      
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));

function Register(){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [email1,setEmail1] = React.useState('');
    const [password1,setPassword1] = React.useState('');
    const [emailValid,setEmailValid] = React.useState(0);
    const [passValid,setPassValid] = React.useState(0);
    const [fnameValid,setFNameValid] = React.useState(0);
    const [lnameValid,setLNameValid] = React.useState(0);
    const [emailTouched,setEmailTouched] = React.useState(0);
    const [passTouched,setPassTouched] = React.useState(0);
    const [fnameTouched,setFNameTouched] = React.useState(0);
    const [lnameTouched,setLNameTouched] = React.useState(0);
    const [detailWrong,setDetailWrong] = React.useState('');
    const [fname1,setFName1] = React.useState('');
    const [lname1,setLName1] = React.useState('');
    const [role1,setRole1] = React.useState('');
    
    const handleEmailChange = (event) =>{
        
        setEmail1(event.target.value);
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email1))
        {
            setEmailValid(0);
        }
        else
        {
            setEmailValid(1);
        }
        

    }

    const handleEmailBlur = () =>{
        
        setEmailTouched(1);
     
    }
    const handlePassChange = (event) =>{
        setPassword1(event.target.value);
        if(password1.length < 8)
        setPassValid(0);
        else 
        setPassValid(1);
    }
    const handlePassBlur = () => {
        setPassTouched(1);

    }
    const handleFNameChange = (event) =>{
        setFName1(event.target.value);
        setFNameValid(1);
    }
    const handleFNameBlur = () =>{
        
        setFNameTouched(1);
     
    }
    const handleLNameChange = (event) =>{
      setLName1(event.target.value);
      setLNameValid(1);
  }
  const handleLNameBlur = () =>{
      
      setLNameTouched(1);
   
  }


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    window.location.href='/login'
  };
    const handleSubmit = (event) =>{
      
        event.preventDefault();
        
        if(emailValid === 1 && fnameValid === 1 && passValid === 1)
        {
          setOpen(true);  
        axios.post('https://healthcare-backend-api.herokuapp.com/api/users',{
            fname:fname1,
            mname:"",
            lname:lname1,
            email:email1,
            aadharid:"",
            contactno:"",
            street:"",
            city:"",
            state:"",
            pincode:"",
            dob:"2000-04-05",
            blood_group:"",
            role:role1,
            password:password1
            
            
           
        }).then(function(response){

          if(response.data.success == 1)  
          console.log('Data posted successfully');
            
            
            }).catch(function (error) {
                console.log("Invalid Post Request");
              });

            }
            else
            {
                setDetailWrong('Please Enter Valid Details!');
            }
        
   
    }
        
        
        
    const handleRole = (event) => {
        console.log(event.target.value);
        setRole1(event.target.value);
   
    
    }

  return (
    <Container component="main" maxWidth="xs">
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
          
        </Toolbar>
      </AppBar>
      <div className={classes.paper}>
        <Avatar style = {{backgroundColor:"#F65798", color:"white"}} className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                value = {fname1}
                id="firstName"
                label="First Name"
                autoFocus
                onBlur = {handleFNameBlur}
                onChange = {handleFNameChange}
              />
              {fnameTouched === 0 ? <p></p> : (fname1.length > 0 && fnameValid === 1 ? <p></p>:<p style = {{color:"red"}}>Field is required</p>)}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value = {lname1}
                autoComplete="lname"
                onBlur = {handleLNameBlur}
                onChange = {handleLNameChange}
              />
              {lnameTouched === 0 ? <p></p> : (lname1.length > 0 && lnameValid === 1 ? <p></p>:<p style = {{color:"red"}}>Field is required</p>)}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value = {email1}
                autoComplete= "off"
                
                onBlur = {handleEmailBlur}
                onChange = {handleEmailChange}
              />
               {emailTouched === 0 ? <p></p> : (email1.length > 0 && emailValid === 1 ? <p></p>:<p style = {{color:"red"}}>Please enter a valid email id!</p>)}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value = {password1}
                onBlur = {handlePassBlur}
                onChange = {handlePassChange}
              />
             {passTouched === 0 ? <p></p> : (password1.length > 0 && passValid === 1 ? <p></p>:<p style = {{color:"red"}}>Please enter a valid password!</p>)} 
            </Grid>
            <Grid item xs={4}>
             <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    
                    onChange = {handleRole}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value="Patient">Patient</MenuItem>
                    <MenuItem value="Doctor">Doctor</MenuItem>
                    <MenuItem value="University">University</MenuItem>
                </Select>
                <FormHelperText>You are?</FormHelperText>
            </FormControl>

            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style = {{backgroundColor:"#F65798", color:"white"}}
            className={classes.submit}
            onClick = {handleSubmit}
          >
            Sign Up
          </Button>
          
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Sign Up Successful!
        </Alert>
      </Snackbar>
          <Grid container justify="flex-start">
            <Grid item>
                Already have an account?&nbsp;
              <Link   onMouseDown={event =>  window.location.href='/login'} variant="body1">
                Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Register