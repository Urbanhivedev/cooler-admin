import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
//import Layout from "../components/layout";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CJobList from "../components/home/c-job-list";
import { getJobs } from "../redux/actions/job.action";
import {Skeleton, Box} from '@mui/material';



const theme = createTheme();



export default function CJobs() {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobs);
  const [jobArr, setJobArr] = useState(jobs);
  const navigate = useNavigate()

  const { userDetails, error,message, isLoading } = useSelector((state) => state.loggedIn);
    
    useEffect(() => {
      console.log(userDetails)
     if(userDetails === '' ){
       
        navigate('/login')
        
      }
       
       
    }, [])

 
 
 
 
 useEffect(() => {
   dispatch(getJobs());  
   setJobArr(jobs);
  }, [])



  console.log('jobArr: ', jobArr);

  return (
      
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {jobArr.length ?
           <CJobList jobs={jobs} />
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
