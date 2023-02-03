import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
import {Box, Grid, TextField, Paper, Button, Typography, ButtonBase, Divider} from '@mui/material';
//import Layout from "../components/Layout/layout";
import CssBaseline from '@mui/material/CssBaseline';
import { NavLink, useNavigate, useLocation,useParams} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled,alpha } from '@mui/material/styles';
import JobLogo from '../assets/images/Cooler.png';
import { getSingleCooler } from "../redux/actions/cooler.action";
import Skeleton from '@mui/material/Skeleton';



import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArchiveIcon from '@mui/icons-material/Archive';
import PersonIcon from '@mui/icons-material/Person';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';

const theme = createTheme();

export default function ViewCooler() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
   
   
    const { cooler } = useSelector((state) => state.coolers);
    const [amount,setAmount] = useState(cooler.amount)

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
            <img alt="Job-Logo" src={cooler.imageUrl} />
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
           
              
            
            

            <Grid item xs={12} md={8} lg={2} style={{height: '40%',marginTop: '100px'}}>   
            </Grid>
            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%',  marginTop: '100px', }}>
             <h3>MEMBERS</h3>
            </Grid>
            <Grid item xs={12} md={8} lg={6} style={{height: '40%',  marginTop:'120px' }}>
              
            <Button
              id="demo-customized-button"
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              style={{width: '200px',backgroundColor:"#60A1EC" }}
           >
            Select
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
        <MenuItem onClick={handleClose} disableRipple>
          <PersonIcon />
          Juston Mraz
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <PersonIcon />
          Kentaro Miura
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <PersonIcon />
          Smith John
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <PersonIcon />
          Tom Polo
        </MenuItem>
      </StyledMenu>

             {/*<p style={{color: 'black'}}>{cooler.members}</p>*/}
             
            </Grid>

            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '38px',marginLeft: '180px',}}>
             <h3>AMOUNT</h3>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%',  marginTop: '40px'}}>
             <TextField fullWidth
              label="Edit Minimum Amount Required"
               id="fullWidth"
              
               value={amount}
               name="amount "
               onChange={(e)=>setAmount(e.target.value)}
               error={amount === ""}
               />
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
              
            </Grid>

          </Grid>
                 <br/>
           <Box sx={{ ml:"350px"}}>
                

                  <Button
                    type="submit"
                    // fullWidth/dashboard/settings
                    variant="contained"
                    style={{
                      
                      color: "white",
                    //   width: "30%",
                      fontSize: "15px",
                    }}
                    sx={{ mt: 3, mb: 2 , ml:3,p:2,backgroundColor:"#60A1EC" }}
                    onClick={() => {
                      navigate(`/dashboard/transfer-coolers/${params.id}`);
                    }}
                  >
                    TRANSFER
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