import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
import {Box, Grid, TextField, Paper, Button, Typography, ButtonBase} from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';
import { NavLink, useHistory, useLocation,useNavigate,useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import JobLogo from '../assets/images/Cooler.png';
import { getSingleJob, updateJob } from "../redux/actions/job.action";
import Skeleton from '@mui/material/Skeleton';


const theme = createTheme();



export default function CUpdateJob() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const params = useParams();
    const locationV = useLocation();
    const { job } = useSelector((state) => state.jobs);
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
  
      const [amountAccrued,setAmountAccrued] = useState(job.amountAccrued)
      const [groups,setGroups] = useState(job.groups)
      const [loanBalance,setLoanBalance] = useState(job.walletBalance)
      const [walletBalance,setWalletBalance] = useState(job.loanBalance)

      


    useEffect(() => {
      dispatch(getSingleJob(params.id));  
      console.log("JOB: ", job);
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

    const updateJobFxn = (e) => {
        e.preventDefault();
        setLoading(true);
        const id  = params.id
        const job = {id, amountAccrued, groups, walletBalance, loanBalance};
        console.log('JOB: ', job);
        dispatch(updateJob(job, setLoading, history));
    }

  return (
      
         <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
          {job != undefined && job != null ?
          
          <>
          <form component="form" onSubmit={updateJobFxn}>
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
            <img alt="Job-Logo"  src={JobLogo} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <br/><br/>
            <Grid item xs>
              <p style={myHeader}>
                 {job && (job.firstName + " " + job.lastName)}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </Grid>         
             <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>AMOUNT ACCRUED ($)</h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
             <TextField fullWidth
              label="Enter Amount Accrued"
               id="fullWidth"
              
               value={amountAccrued}
               name="amount accrued"
               onChange={(e)=>setAmountAccrued(e.target.value)}
               error={amountAccrued === ""}
               />
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
              
            </Grid>
            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>GROUPS</h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
             <TextField fullWidth
              label="Ammend Groups"
              id="fullWidth" 
              
              multiline
              rows={6}
              maxRows={12}
              value={groups}
              name="groups"
              onChange={(e)=>setGroups(e.target.value)}
              error={groups === ""}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
            </Grid>
            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>WALLET BALANCE ($)</h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
             <TextField 
             fullWidth 
             label="Enter New Wallet Balance"
            
             id="fullWidth"
             value={walletBalance} 
             name="wallet Balace"
             onChange={(e)=>setWalletBalance(e.target.value)}
             error={walletBalance === ""}
             />
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>   
            </Grid>

            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>LOAN BALANCE ($)</h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
             <TextField 
             fullWidth 
            
             label="Enter New Loan Balance" 
             id="fullWidth"
             value={loanBalance}
             name="Loan Balance"
             onChange={(e)=>setLoanBalance(e.target.value)}
             error={loanBalance === ""}
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
                      backgroundColor: "black",
                      color: "white",
                    //   width: "30%",
                      fontSize: "15px",
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
