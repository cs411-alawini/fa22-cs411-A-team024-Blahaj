import React from 'react';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

const Bookdoctordone = (props) => {
    const { history } = props;
    return(
        <div style={{marginTop:"30vh"}}>
           <Typography variant="h3"> We've booked your appointment, get well soon :) </Typography>

           <div style={{marginTop:"50px"}}>

           <Button size="large" variant="contained" color="secondary" onClick={()=>history.push("/doctors")}>
                Alright, thank you!
            </Button>

           </div>
        </div>
    )
}

export default Bookdoctordone