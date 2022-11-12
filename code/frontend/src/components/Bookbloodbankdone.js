import React from 'react';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

const Bookbloodbankdone = (props) => {
    const { history } = props;
    return(
       
            <div style={{marginTop:"30vh"}}>
           <Typography variant="h3"> Congratulations on saving a life! #ThankYou  </Typography>

           <div style={{marginTop:"50px"}}>

           <Button size="large" variant="contained" color="secondary" onClick={ ()=> history.push("/bloodbanks")}>
                I feel blessed :)
            </Button>

           </div>
        </div>
        
    )
}

export default Bookbloodbankdone