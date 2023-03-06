import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SavingsIcon from '@mui/icons-material/Savings';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding style={{display:"flex",flexDirection:"column",marginTop:"25px" }} sx={{ px: 1,py:0,}}>
        {data.map((item) => (
          <>
          <NavItem key={item.title} item={item}/>
           {
             item?.children?.map((c) => (
              <SubNavItem key={c.title} item={c}/>
            ))
           }
           <br/> 
           <br/>
          </>
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, iconLabel, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      style={{height:"32px",marginTop:"-20px",marginBottom:"-20px"}}
      sx={{
        width:"100%",
        borderRadius:"10px",
        
        '&.active': {
          color: 'black',
          // bgcolor: '#66000000',
          backgroundColor: 'black',
          fontWeight: 'fontWeightBold',
          borderRadius:"10px",
         

        },
        
      }}
    >
      {iconLabel !== 'msg' && iconLabel !== 'settings' && <StyledNavItemIcon sx={{color: '#FFFFFF', fontSize: '17px'}}>{icon && icon}</StyledNavItemIcon>}
      
      {iconLabel === 'msg' && <StyledNavItemIcon sx={{color: '#FFFFFF', fontSize: '17px'}}><MessageIcon /></StyledNavItemIcon>}
      
      {iconLabel === 'settings' && <StyledNavItemIcon sx={{color: '#FFFFFF', fontSize: '17px'}}><SettingsIcon /></StyledNavItemIcon>}

      <ListItemText disableTypography primary={title} sx={{color: '#FFFFFF', fontSize: '15px'}}/>

      {info && info}
    </StyledNavItem>
  );
}
function SubNavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
      <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        
        '&.active': {
          // color: 'black',
          // bgcolor: '#66000000',
          backgroundColor: 'black',
          fontWeight: 'fontWeightBold',
          
        },
      }}
    >
      {/* <StyledNavItemIcon sx={{color: '#FFFFFF', fontSize: '20px'}}>{icon && icon}</StyledNavItemIcon> */}
      <StyledNavItemIcon sx={{color: '#FFFFFF', fontSize: '18px', ml: 5}}>
        {icon === 'LockIcon' && <LockIcon />}
        {icon === 'LockOpen' && <LockOpenIcon />}
        {icon === 'Savings' && <SavingsIcon />}
      </StyledNavItemIcon>

      <ListItemText disableTypography primary={title} sx={{color: '#FFFFFF', fontSize: '15px'}}/>

      {info && info}
    </StyledNavItem>
  );
}
