import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { mainListItems } from '../Dashboard/list-items';
import { Link, /*useHistory,*/ useLocation } from 'react-router-dom'
import MDliaison from '../../assets/images/logo.png';
import PopupModal from './modal';
import NestedList, { ListMenu2 } from '../Dashboard/list-items2';
import { logout } from '../../redux/actions/auth.action';

  const drawerWidth = 240;
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    // backgroundColor: '#fff',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        backgroundColor:'black' /*'#60A1EC'*/,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );
  
  const mdTheme = createTheme();

const Layout = ({ title, children }) => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const dispatch = useDispatch();
    //const history = useHistory();
    const location = useLocation()
  return(
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
            backgroundColor:'black'
            
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            // sx={{ flexGrow: 1 }}
          >
            {/* {title} */}
            {/* Welcome <span style={{color: 'purple'}}>{"User"}</span><span className="wave" role="img" aria-labelledby="wave">👋🏻</span> */}
             {/* <span style={{color: 'purple'}}></span><span className="wave" role="img" aria-labelledby="wave"></span> */}
          </Typography>
          {/* <Link onClick={() => {dispatch(logout(history))}}><IconButton style={{color: 'white'}}>
              <LogoutIcon />
          </IconButton></Link> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
      <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: 'black',
            // backgroundColor: '#60A1EC',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <br/>
        <img src={MDliaison} alt="" width='100px' height='80px' style={{marginLeft:'80px'}}/>
        <br/>
        <List component="nav">
          {/* {mainListItems} */}
          <NestedList />
          <Divider sx={{ my: 1 }} />
        </List>
        {/* <ListMenu2/> */}
      </Drawer>
     
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => location.pathname == '/company/add-jobs' || location.pathname === '/company/view-job' ? '#FFFFFF' : theme.palette.grey[100],
          // backgroundColor: (theme) =>
          //   theme.palette.mode === 'light' && location.pathname == '/view-job'
          //   // theme.palette.mode === 'light'
          //     ? '#FFFFFF'
          //     : theme.palette.grey[100],
          //     // ? theme.palette.grey[100]
          //     // : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
       {children}
      </Box>
    </Box>
  </ThemeProvider>
   )

 }

export default Layout;