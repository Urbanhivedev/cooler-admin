import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
import {Box, Grid, TextField, Paper, Button, Typography, ButtonBase,Divider} from '@mui/material';
//import Layout from "../components/Layout/layout";
import CssBaseline from '@mui/material/CssBaseline';
import { NavLink, useNavigate, useLocation,useParams} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled,alpha } from '@mui/material/styles';
import JobLogo from '../assets/images/Cooler.png';
import { getSingleJob,getSpecificCoolers } from "../redux/actions/job.action";
import { fetchGroupMembers } from "../redux/actions/group.action";
import Skeleton from '@mui/material/Skeleton';

import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';

import { fetchCoolersOfMember } from "../redux/actions/cooler.action";

const theme = createTheme();

export default function CViewJob() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const [fetched,setFetched] = useState(false)
    const [wait,setWait] = useState(false)


    const { userDetails, error,message } = useSelector((state) => state.loggedIn);
    
    useEffect(() => {
      console.log(userDetails)
     if(userDetails === '' ){
       
        navigate('/login')
        
      }
       
       
    }, [])

   
   
    const { job } = useSelector((state) => state.jobs);
    const { coolerGroups,isLoading } = useSelector((state) => state.jobs);

   console.log("THIS EMPLOYEES DETAILS ARE FULLY:",job)
   console.log("alternate date is:",new Date(Number(job.createdAt)*1000))
    useEffect(() => {
      dispatch(getSingleJob(params.id)); 
    //(job &&  dispatch(getSpecificCoolers(job.coolers?job.coolers:job.cooler))); 
      console.log("THIS EMPLOYEES DETAILS ARE FINALLY:",job)
      setTimeout(()=>{setFetched(true)},100)
     }, [params.id,location.pathname])

     useEffect(() => {
    job &&  dispatch(getSpecificCoolers(job.coolers?job.coolers:job.cooler)); 
    
       
     }, [params.id,job.coolers,job.cooler,location.pathname,fetched])

     console.log("what's in cooler groups",coolerGroups)


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



      const StyledMenu = styled((props) => (
        <Menu
          elevation={0}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          {...props}
        />
      ))(({ theme }) => ({
        '& .MuiPaper-root': {
          borderRadius: 6,
          marginTop: theme.spacing(1),
          minWidth: 180,
          color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
          boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
          '& .MuiMenu-list': {
            padding: '4px 0',
          },
          '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
              fontSize: 18,
              color: theme.palette.text.secondary,
              marginRight: theme.spacing(1.5),
            },
            '&:active': {
              backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity,
              ),
            },
          },
        },
      }));
      
      
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };
       







  return (
      
         <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
          {job != undefined && job != null && fetched ?
          
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
            <img alt="Job-Logo" src={job.imageUrl} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <br/><br/>
            <Grid item xs>
              <p style={myHeader}>
                 {job.firstName + " " + job.lastName}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </Grid>  
           
              
            
             <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px',marginLeft: '196px'}}>
             <h3>NAME</h3>
            
            </Grid>
            
             <Grid item xs={12} md={8} lg={6} style={{height: '40%', marginTop: '14px',}}>
             <p style={{color: 'black'}}>{job.firstName + " " + job.lastName}</p>
             <Divider/>
            </Grid>
            
             
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
             
             </Grid>

             
             <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%',  marginTop: '1px'}}>
              <h3>REGISTERED</h3>
             </Grid>
             
              <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
              <p style={{color: 'black'}}>{job.accountCreated && typeof(job.accountCreated) !== 'string' && new Date(job.accountCreated.seconds*1000).toLocaleDateString()}
                 {typeof(job.accountCreated) === 'string' && job.accountCreated}
                 </p>
                 <Divider/>
             </Grid>

          

            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
             
            </Grid>
            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%',  marginTop: '1px'}}>
             <h3>EMPLOYER</h3>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
             <p style={{color: 'black'}}>{job.employeerNumber && job.employeerNumber}{job.employerNumber && job.employerNumber}
                </p>
                <Divider/>
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
            </Grid>

            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%',  marginTop: '1px'}}>
             <h3>EMAIL</h3>
            </Grid>
            <Grid item xs={12} md={8} lg={6} style={{height: '40%',  marginTop: '1px'}}>
             <p style={{color: 'black'}}>{job.email}</p>
             <Divider/>
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>   
            </Grid>
            
            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%',  marginTop: '1px'}}>
             <h3>WALLET BALANCE</h3>
            </Grid>
            <Grid item xs={12} md={8} lg={6} style={{height: '40%',  marginTop: '1px'}}>
              
             <p style={{color: 'black'}}>{job.walletBalance}</p>
             <Divider/>
            </Grid>

            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>   
            </Grid>
            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%',  marginTop: '1px'}}>
             <h3>ACCRUED BALANCE</h3>
            </Grid>
            <Grid item xs={12} md={8} lg={6} style={{height: '40%',  marginTop: '1px'}}>
              
             <p style={{color: 'black'}}>{job.accruedBalance && job.accruedBalance} {job.amountAccrued && job.amountAccrued }</p>
             <Divider/>
            </Grid>

            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>   
            </Grid>
            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%',  marginTop: '1px', }}>
             <h3>COOLERS</h3>
            </Grid>
            <Grid item xs={12} md={8} lg={6} style={{height: '40%',  marginTop:'1px' }}>
              
            <Button
              id="demo-customized-button"
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              style={{width: '200px',backgroundColor:/*'#130C66'*/ "#60A1EC" }}
           >
            SELECT
           </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
      { coolerGroups  && coolerGroups.length && fetched?
      
       coolerGroups.map((item)=>(

        <MenuItem onClick={handleClose} disableRipple>
        <PersonIcon />
        {item.groupName}
      </MenuItem>
       ))
      : 
      <MenuItem onClick={handleClose} disableRipple>
        no coolers joined yet
        </MenuItem>
      }





      </StyledMenu>

             {/*<p style={{color: 'black'}}>{job.members}</p>*/}
             
            </Grid>

           

          </Grid>
                 <br/>
           <Box sx={{ ml:"350px"}}>
                 <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    style={{
                     
                      color: "white",
                    //   width: "30%",
                      fontSize: "15px",
                    }}
                    sx={{ mt: 3, mb: 2 ,ml:3 ,p:2,backgroundColor:/*'#130C66'*/ "#60A1EC"}}
                    onClick={() => {

                      dispatch(fetchCoolersOfMember(job.coolers)); 
                      setWait(true)

                     setTimeout(()=>{navigate(`/dashboard/update-users/${params.id}`)},1000)
                    }}
                  >
                   {wait?"Please wait...":"UPDATE"}
                  </Button>

          </Box>
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
