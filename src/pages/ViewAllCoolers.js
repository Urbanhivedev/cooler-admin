import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
//import Layout from "../components/layout";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CJobList from "../components/home/c-job-list";
import CoolerList from "../components/home/cooler-list";
import { getJobs } from "../redux/actions/job.action";
import {Skeleton, Box} from '@mui/material';
import { getCoolers } from "src/redux/actions/cooler.action";



const theme = createTheme();



export default function ViewAllCoolers() {
  const dispatch = useDispatch();
  const { coolers } = useSelector((state) => state.coolers);
  const [coolerArr, setCoolerArr] = useState(coolers);
 useEffect(() => {
   dispatch(getCoolers());  
   setCoolerArr(coolers);
  }, [])

  console.log('coolerArr: ', coolerArr);

  return (
      
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {coolerArr.length ?
           <CoolerList jobs={coolers} />
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