import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
import {Box, Grid, TextField, Paper, Button, Typography, ButtonBase} from '@mui/material';
//import Layout from "../components/Layout/layout";
import CssBaseline from '@mui/material/CssBaseline';
import { NavLink, useNavigate, useLocation,useParams} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import JobLogo from '../assets/images/Cooler.png';
import { getSingleJob } from "../redux/actions/job.action";
import Skeleton from '@mui/material/Skeleton';


const theme = createTheme();

export default function CViewJob() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();


    const { userDetails, error,message, isLoading } = useSelector((state) => state.loggedIn);
    
    useEffect(() => {
      console.log(userDetails)
     if(userDetails === '' ){
       
        navigate('/login')
        
      }
       
       
    }, [])

   
   
    const { job } = useSelector((state) => state.jobs);

    useEffect(() => {
      dispatch(getSingleJob(params.id));  
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
    const mystyle = {
      fontFamily: 'Arial',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '22px',
      color: 'black',
      marginTop: '5px'
    };

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      });
  return (
      
         <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
          {job != undefined && job != null ?
          
          <>
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
            <img alt="Job-Logo" src={JobLogo} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <br/><br/>
            <Grid item xs>
              <p style={myHeader}>
                 {(job.firstName + " " + job.lastName).toUpperCase()}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </Grid>  
           
             <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4></h4>
            </Grid>
            <Grid item xs={12} md={8} lg={6} style={{height: '40%', marginTop: '14px'}}>
             <img src={job.imageUrl} style={{borderRadius: '15px', height:'250px'}}/>
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
              
            </Grid>


             <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>EMAIL</h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%', marginTop: '14px'}}>
             <p style={{color: 'black'}}>{job.email}</p>
            </Grid>
             
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
             
             </Grid>
             <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
              <h4>REGISTERED ON</h4>
             </Grid>
              <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
              <p style={{color: 'black'}}>{job.accountCreated && (new Date(job.accountCreated.seconds*1000)).toLocaleDateString()}
                 </p>
             </Grid>



            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
             
            </Grid>
            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>WALLET BALANCE</h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
             <p style={{color: 'black'}}>${job.walletBalance}
                </p>
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
            </Grid>
           {/* <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>LOAN BALANCE</h4>
            </Grid>
            <Grid item xs={12} md={8} lg={6} style={{height: '40%', marginTop: '14px'}}>
             <p style={{color: 'black'}}>${job.loanBalance}</p>
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>   
            </Grid>*/}

            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>ACCRUED AMOUNT</h4>
            </Grid>
            <Grid item xs={12} md={8} lg={6} style={{height: '40%', marginTop: '14px'}}>
             <p style={{color: 'black'}}>${job.amountAccrued}</p>
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
              
            </Grid>

           
          </Grid>
                 <br/>
          <center>
                 <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                    //   width: "30%",
                      fontSize: "15px",
                    }}
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {
                      navigate(`/dashboard/update-users/${params.id}`);
                    }}
                  >
                    UPDATE
                  </Button>
          </center>
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
