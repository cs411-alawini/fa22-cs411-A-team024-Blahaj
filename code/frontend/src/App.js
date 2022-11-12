import './App.css';
import React from 'react';
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Hospital from './components/Hospital'
import Hospitaldetail from './components/Hospitaldetail'
import Bloodbank from './components/Bloodbank'
import Bloodbankdetail from './components/Bloodbankdetail'
import Bookhospitaldone from './components/Bookhospitaldone'
import Bookbloodbankdone from './components/Bookbloodbankdone'
import Doctor from './components/Doctor'
import Doctordetail from './components/Doctordetail'
import Bookdoctordone from './components/Bookdoctordone'
import History from './components/History'
import Appointment from './components/Appointment'
import Student from './components/Students'
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom'
import Urgent from './components/Urgent'
import Analysis from './components/Analysis'
import Hospital_New from './components/Hospital_New'

function App() {
 
  


  const [login,setLogin] = React.useState(0);
  
  

  return (
    
      

       
    <Router>
   

  
      {localStorage.getItem("token")?
      <Switch>
      
      <Route path="/home/:uid" component={Home} exact />
      <Route path="/hospital/book" component={Bookhospitaldone} exact />
      <Route path="/bloodbank/book" component={Bookbloodbankdone} exact />
      <Route path="/hospitals" component={Hospital_New} exact />
      <Route path="/students" component={Student} exact />
      <Route path="/hospital/:hospid" component={Hospitaldetail} exact />
      <Route path="/bloodbanks" component={Bloodbank} exact />
      <Route path="/bloodbank/:bbid" component={Bloodbankdetail} exact />
      <Route path="/doctors" component={Doctor} exact />
      <Route path="/Urgent" component={Urgent} exact />
      <Route path="/Analysis" component={Analysis} exact />
      <Route path="/doctor/book" component={Bookdoctordone} exact />
      <Route path="/doctor/:uid" component={Doctordetail} exact />
      <Route path="/history/:uid" component={History} exact />
      <Route path="/appointments" component={Appointment} exact />
      
      <Redirect from = '/' to = {`/home/${localStorage.getItem("uid")}`} component = {Register} />
      

      </Switch>:
      <Switch>
      <Route path="/register" component={Register}  />
      <Route path="/login" component={Login} exact/>
      
      <Redirect from = '/' to = '/login' component = {Login} />
      
        
      </Switch>}
      </Router>
      
  );
}

export default App;
