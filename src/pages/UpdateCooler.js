import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
import {Box, Grid, TextField, Paper, Button, Typography, ButtonBase} from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';
import { NavLink, useHistory, useLocation,useNavigate,useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import JobLogo from '../assets/images/Cooler.png';
import { getSingleCooler, updateCooler } from "../redux/actions/cooler.action";
import Skeleton from '@mui/material/Skeleton';


const theme = createTheme();



export default function UpdateCooler() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const locationV = useLocation();
    const { cooler } = useSelector((state) => state.coolers);
    const [loading, setLoading] = useState(false);

   // const initialState = {
   //     amountAccrued: job ? job.amountAccrued : "",
   //     groups: job ? job.groups : "",
   //     walletBalance: job ? job.walletBalance : "",
   //     loanBalance: job ? job.loanBalance : ""
   //   };
//
   // const [
   //     { amountAccrued,groups, walletBalance , loanBalance },
   //     setState
   //   ] = useState(initialState);

 //  const clearState = () => {
 //   setState({ ...initialState });
 // };
//
 // const onChange = e => {
 //   const { name, value } = e.target;
 //   setState(prevState => ({  [name]: value }));
 // };
  
      const [amount,setAmount] = useState(cooler.amount)
      const [noOfSavers,setNoOfSavers] = useState(cooler.startDate)
      
      const [admin,setAdmin] = useState(cooler.groupName)
      const [members,setMembers] = useState(cooler.members)

      


    useEffect(() => {
      dispatch(getSingleCooler(params.id));  
     
     }, [])
      

    const myHeader = {
      fontFamily: 'Arial',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '37px',
      lineHeight: '30px',
      color: 'black',
      marginLeft: '50px',
      marginTop: '10px'
    };

    const updateCoolerFxn = (e) => {
        e.preventDefault()
       
        const id  = params.id
        const cooler = {id, amount, noOfSavers, admin,members}
        console.log(cooler)
        dispatch(updateCooler(cooler, setLoading, navigate))
       
       
        setLoading(true)
        
       
        

       
    }

  return (
      
         <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
          {cooler !== undefined && cooler !== null ?
          
          <>
          <form component="form" onSubmit={(e)=>{updateCoolerFxn(e)}}>
          <Grid container spacing={2}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
          <Paper
            sx={{
                border: '1px solid black',
                p: 1,
                margin: 'auto',
                // maxWidth: 2000,
                minWidth: 600,
                flexGrow: 1,
               
                 }}
             >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 148, height: 148 , backgroundColor:"black"}}>
            <img alt="Job-Logo"  src={cooler.imageUrl} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <br/><br/>
            <Grid item xs>
              <p style={myHeader}>
                 {cooler &&(cooler.groupName)}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </Grid>         
             <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>COOLER NUMBER</h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
             <TextField fullWidth
              label="Enter Total Amount Saved"
               id="fullWidth"
              
               value={amount}
               name="amount "
               onChange={(e)=>setAmount(e.target.value)}
               error={amount === ""}
               />
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
              
            </Grid>
            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>CREATED </h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
             <TextField fullWidth
              label="Ammend Number of Savers"
              id="fullWidth"  
              
              value={noOfSavers}
              name="number of savers"
              onChange={(e)=>setNoOfSavers(e.target.value)}
              error={noOfSavers === ""}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
            </Grid>
            

            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>COOLER NAME </h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
             <TextField 
             fullWidth 
             multiline
              rows={6}
              maxRows={12}
              
             label="Change Admins" 
             id="fullWidth"
             value={admin}
             name="Admin"
             onChange={(e)=>setAdmin(e.target.value)}
             error={admin === ""}
             />
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
              
            </Grid>

            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>ADMIN EMAIL </h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
             <TextField 
             fullWidth 
             multiline
             rows={6}
             maxRows={12}

             label="Change members" 
             id="fullWidth"
             value={members}
             name="Members"
             onChange={(e)=>setMembers(e.target.value)}
             error={members === ""}
             />
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
              
            </Grid>
          </Grid>

          <center>
                 <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    style={{
                      backgroundColor:"#60A1EC" ,
                      color: "white",
                    //   width: "30%",
                      fontSize: "15px",
                      padding:"20px",
                    }}
                    sx={{ mt: 7, mb: 2 }}
                    // onClick={addJobFxn}
                  >
                   {loading ? "Loading..." : "UPDATE"}
                  </Button>
          </center>

        </form>
          </>
          : 
          <center>
            <Box sx={{ width: 300 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
          </center>
}

                  
        </Container>

  );
}
