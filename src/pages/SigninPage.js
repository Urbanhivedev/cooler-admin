import React, { useEffect, useState } from "react";

import Container from '@mui/material/Container';
import {Box, Grid, TextField, Paper, Card, CardActions, CardContent, CircularProgress, Button, Typography, Divider, Chip} from '@mui/material';
//import Layout from "../components/Layout/layout";
import CssBaseline from '@mui/material/CssBaseline';
import { NavLink, useNavigate} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MDliaison from '../assets/images/Cooler.png';

/*REDUX AND FIREBASE IMPORTS */
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../redux/actions/auth.action';

/*REDUX AND FIREBASE IMPORTS END */


const theme = createTheme();

export default function Signin() {
   const [fname, setfName] = useState('');
    const [lname, setlName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [checkDetails, setCheckDetails] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const { userDetails, error,message, isLoading } = useSelector((state) => state.loggedIn);
    
    useEffect(() => {
      console.log(userDetails)
     if(userDetails !== '' ){
       
        navigate('/dashboard/home')
        
      }
       
       
    }, [])


    const header = {
      fontFamily: 'Roboto', //used to be ARIAL
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '29px',
      lineHeight: '30.4px',
      color: 'black',
      marginLeft: '10%'
    };

    const mystyle = {
        fontFamily: 'Roboto', //used to be ARIAL
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '21px',
        lineHeight: '24.8px',
        color: 'black'
      };

  const userSignin = () => {
    
    console.log(userDetails)
    dispatch(signin({email,password},navigate,));
    setTimeout(() => {
      window.location.reload()
  }, 1500);
    
    
   
  }

  return (
    //   <Layout>
     <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" style={{border: '0px solid red' }}>
        <div style={{marginLeft: '20%'}}>
        <CssBaseline /><br/><br/>
        <div style={{marginLeft: '30%',marginBottom:"10%"}}>
        <img src={MDliaison} alt=""  style={{backgroundColor: '#60A1EC',padding:'20px',borderRadius:"10px"}}/>
        <p style={header}>ADMIN LOGIN</p>
        </div>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center"
          }}
        >
          <Box>
          <form component="form" /*onSubmit={console.log("submitted")}*/ sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={10} sm={2.5} sx={{mt: 1}} style={{border: '0px solid red'}}>
                <p style={mystyle}>EMAIL:</p>
              </Grid>
              <Grid item xs={12} sm={8} style={{border: '0px solid red'}}>
                <TextField
                  variant="standard"
                  style={{border: '1px solid black', width: 380, height: 45,  padding: 2}}
                  required
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                  }}
                  value={email} onChange={(e)=>{setEmail(e.target.value)}}
                />
              </Grid>
              <br/><br/><br/>
              <Grid item xs={10} sm={2.5} sx={{mt: 1}} style={{border: '0px solid red'}}>
                <p style={mystyle}>PASSWORD:</p>
              </Grid>
              <Grid item xs={12} sm={8} style={{border: '0px solid red'}}>
                <TextField
                  variant="standard"
                  type="password"
                  style={{border: '1px solid black', width: 380, height: 45, padding: 2}}
                  required
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                  }}

                  value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
              </Grid>
           
              <Grid item xs={12} sm={12} style={{border: '0px solid red'}}>
              <center>
              <a href="#"><p style={mystyle}>FORGOT PASSWORD?</p></a>
            </center>
              </Grid>
              <br/><br/><br/>
              <Grid item xs={12} sm={12} style={{border: '0px solid red'}}>
              <center>
             <Button
              type="button"
              // fullWidth
              variant="contained"
              style={{backgroundColor: '#60A1EC',color:"white", height:"40px", width: '30%',  fontSize:"15px"}}
              onClick = {userSignin}
            //   sx={{ mt: 3, mb: 2 }}
            >
              LOGIN
            </Button>
            </center>
              </Grid>

              
              


            </Grid>
             {isLoading && <center><CircularProgress color="secondary" /></center> }
            <br/><br/>

            {/* <Grid container justifyContent="center">
              <Grid item>
                <NavLink to="/signin" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid> */}
            </form>
          </Box>
        </Box>
        </div>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>


    //   </Layout>
  );
}
