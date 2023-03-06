import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Iconify from '../components/iconify';

import Piggy from '../assets/images/piggy2.jpg';
import Money from '../assets/images/money.jpg';
import LoginForm from 'src/components/login/LoginForm';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  
  [theme.breakpoints.up('md')]: {
    display: 'flex',
   
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login | Cooler Web </title>
      </Helmet>

      <StyledRoot sx={{backgroundColor:"#FFFFFF"}}>
      {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
      <img src={Piggy} width="100" height="100"/>
    </Typography> */}
      

        {mdUp && (
          <StyledSection style={{backgroundColor:"#FFFFFF"}}>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/admin-welcome.jpg" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Cooler (Admin)
            </Typography>
            

            <Divider sx={{ my: 3 }}>
              
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
