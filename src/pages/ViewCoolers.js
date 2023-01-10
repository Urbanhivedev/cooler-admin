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
import { getSingleCooler } from "../redux/actions/cooler.action";
import Skeleton from '@mui/material/Skeleton';


const theme = createTheme();

export default function ViewCooler() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
   
   
    const { cooler } = useSelector((state) => state.coolers);

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
          {cooler != undefined && cooler != null ?
          
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
                 {(cooler.groupName).toUpperCase()}
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
            {/*<Grid item xs={12} md={8} lg={6} style={{height: '40%', marginTop: '14px'}}>
             <img src={job.imageUrl} style={{borderRadius: '15px', height:'250px'}}/>
            </Grid>*/}
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
              
            </Grid>


             <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>TOTAL AMOUNT SAVED</h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%', marginTop: '14px'}}>
             <p style={{color: 'black'}}>${cooler.amount}</p>
            </Grid>
             
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
             
             </Grid>
             <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
              <h4>REGISTERED ON</h4>
             </Grid>
              <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
              <p style={{color: 'black'}}>{cooler.accountCreated && new Date(cooler.accountCreated.seconds*1000).toLocaleDateString()}
                 </p>
             </Grid>



            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
             
            </Grid>
            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>STATUS</h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
             <p style={{color: 'black'}}>{cooler.status}
                </p>
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
            </Grid>

            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>ADMINS</h4>
            </Grid>
            <Grid item xs={12} md={8} lg={6} style={{height: '40%', marginTop: '14px'}}>
             <p style={{color: 'black'}}>{cooler.admins}</p>
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>   
            </Grid>
            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>MEMBERS</h4>
            </Grid>
            <Grid item xs={12} md={8} lg={6} style={{height: '40%', marginTop: '14px'}}>
              
             <p style={{color: 'black'}}>{cooler.members}</p>
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
                      navigate(`/dashboard/update-coolers/${params.id}`);
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
