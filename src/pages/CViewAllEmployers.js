import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
//import Layout from "../components/layout";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CJobList from "../components/home/c-job-list";
import EmployerList from "../components/home/employer-list";

import {Skeleton, Box} from '@mui/material';
import { getEmployers } from "src/redux/actions/employer.action";



const theme = createTheme();



export default function ViewAllEmployers() {
  const dispatch = useDispatch();
  const { employers } = useSelector((state) => state.employers);
  const [coolerArr, setCoolerArr] = useState(employers);
 useEffect(() => {
   dispatch(getEmployers());  
   setCoolerArr(employers);
  }, [])

  console.log('coolerArr: ', coolerArr);

  return (
      
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {coolerArr.length ?
           <EmployerList jobs={employers} />
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