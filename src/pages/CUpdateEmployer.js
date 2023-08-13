import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from '@mui/material/Container';
import {Box, Grid, TextField, Paper, Button, Typography, ButtonBase} from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';
import { NavLink, useHistory, useLocation,useNavigate,useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import JobLogo from '../assets/images/Cooler.png';
import { getSingleEmployer, updateEmployer } from "../redux/actions/employer.action";
import Skeleton from '@mui/material/Skeleton';


const theme = createTheme();



export default function CUpdateJob() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const locationV = useLocation();
    const { employer } = useSelector((state) => state.employers);
    const [loading, setLoading] = useState(false);

   // const initialState = {
   //     amountAccrued: job ? job.amountAccrued : "",
   //     groups: job ? job.groups : "",
   //     walletBalance: job ? job.walletBalance : "",
   //     loanBalance: job ? job.loanBalance : ""
   //   };
//
   // const [
   //     { amountAccrued,coolers, walletBalance , loanBalance },
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
  
      const [amountAccrued,setAmountAccrued] = useState(employer.amountAccrued)
      const [coolers,setCoolers] = useState(employer.cooler)
      const [groups,setGroups] = useState(employer.groups)
      const [employerNumber,setEmployerNumber] = useState(employer.employerNumber)
      const [email,setEmail]= useState(employer.email)
      const [companyName,setCompanyName] = useState(employer.companyName)

      const [firstName,setFirstName] = useState(employer.firstName)
      const [lastName,setLastName] = useState(employer.lastName)

      const [loanBalance,setLoanBalance] = useState(employer.loanBalance)
      const [walletBalance,setWalletBalance] = useState( employer.walletBalance)


      const { userDetails, error,message, isLoading } = useSelector((state) => state.loggedIn);
      const {allGroups, myGroups } = useSelector((state) => state.group);

    
      const [memberNames,setMemberNames] = useState([...myGroups.map((item)=>(item.groupName))])
      const [memberNamesActive,setMemberNamesActive] = useState([...myGroups.map((item)=>(item.groupName))])
      const [coolersToDelete,setCoolersToDelete] = useState([])

      console.log("our cooler names are actually !",memberNames)

      const [memberIds,setMemberIds] = useState([...myGroups.map((item)=>(item.groupId))])
      const [memberIdsActive,setMemberIdsActive] = useState([...myGroups.map((item)=>(item.groupId))])


    useEffect(() => {
      console.log(userDetails)
     if(userDetails === '' ){
       
        navigate('/login')
        
      }
       
       
    }, [])



    useEffect(() => {
      dispatch(getSingleEmployer(params.id));  
      console.log("COOLERS FOR THIS EMPLOYR ARE: ", myGroups);
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
        const employer = {id,firstName,lastName,email,employerNumber,companyName};
        console.log('employer: ', employer);


        if(window.confirm("Any coolers selected will be deleted permanently, would you like to continue?")){
        dispatch(updateEmployer(employer,coolersToDelete ,setLoading, navigate));
        }
    }



    const deleteCoolers= (deletedItem,index)=> {

      


      setMemberNamesActive(
       memberNamesActive.filter((item)=>(item !== deletedItem))
      )
   
      const idHolder = [...memberIdsActive]
      idHolder.splice(index,1)

      setCoolersToDelete([...coolersToDelete,...memberIds.slice(index,index+1)])
      console.log("coolers to delete has increased",coolersToDelete)
 
      setMemberIdsActive(
      idHolder
      )
   
      console.log(memberNamesActive," name active is now")
      console.log(memberIdsActive," id active is now!!!")

    }



    const  resetMemberBoth = ()=>{
      setMemberNamesActive(memberNames)
      setMemberIdsActive([...myGroups.map((item)=>(item.groupId))])
      setCoolersToDelete([])
    }

  return (
      
         <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
          {employer != undefined && employer != null ?
          
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
            <img alt="Job-Logo"  src={employer.imageUrl} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <br/><br/>
            <Grid item xs>
              <p style={myHeader}>
                 {employer && (employer.firstName + " " + employer.lastName)}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </Grid>         
    <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>FIRST NAME</h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
             <TextField fullWidth
              label="Update first Name"
               id="fullWidth"
              
               value={firstName}
               name="first name"
               onChange={(e)=>setFirstName(e.target.value)}
               error={firstName === ""}
               />
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
              
            </Grid>


            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>LAST NAME</h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
             <TextField fullWidth
              label="Update last Name"
               id="fullWidth"
              
               value={lastName}
               name="last name"
               onChange={(e)=>setLastName(e.target.value)}
               error={lastName === ""}
               />
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
              
            </Grid>



            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>EMAIL</h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
             <TextField fullWidth
              label="Update employer number"
               id="fullWidth"
              
               value={email}
               name="last name"
               onChange={(e)=>setEmail(e.target.value)}
               error={setEmail === ""}
               />
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
              
            </Grid>




            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>COMPANY NAME</h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
             <TextField fullWidth
              label="Update company Name"
               id="fullWidth"
              
               value={companyName}
               name="company name"
               onChange={(e)=>setCompanyName(e.target.value)}
               error={lastName === ""}
               />
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
              
            </Grid>






            <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
             <h4>EMPLOYER NUMBER</h4>
            </Grid>
             <Grid item xs={12} md={8} lg={6} style={{height: '40%'}}>
             <TextField fullWidth
              label="Update employer number"
               id="fullWidth"
              
               value={employerNumber}
               name="employer number"
               onChange={(e)=>setEmployerNumber(e.target.value)}
               error={employerNumber === ""}
               />
            </Grid>
            <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
              
            </Grid>



            {memberNames && memberNames.length && 
        
        <Grid item xs={12} md={12} lg={12} style={{border: '0px solid red', height: '50%', marginTop: '14px',display:memberNames.length?"block":"none"}}>
         <h3>COOLER GROUPS </h3>
        </Grid>
      }

        {memberNames && 
    
    memberNamesActive.map((item,i)=>(
      <>
          

       


          <Grid item xs={12} md={8} lg={2} style={{height: '40%'}}>
          
          </Grid>


         <Grid item xs={12} md={8} lg={6} style={{height: '40%',marginLeft:"8%",display:"flex",justifyContent:"center",alignItems:"center",gap:"3rem",position:"relative"}}>
         <TextField 
         sx={{width:"70%"}}
         label={i==0?"Delete a name to remove a member":'' }
         id="fullWidth"
         value={item}
         name="cooler"
        
         error={memberNamesActive[i] === ""}
         />

        <Button
                type="button"
                // fullWidth
                variant="contained"
                style={{
                  backgroundColor:/*'#130C66'*/ "#60A1EC",
                  color: "white",
                //   width: "30%",
                  fontSize: "15px",
                  height: '40%',
                  padding:"15px",

                }}
                sx={{ }}
                onClick={(e)=>deleteCoolers(item,i)}
              >
               DELETE
          </Button>

        </Grid>

        
        <Grid item xs={12} md={12} lg={12} style={{height: '40%'}}>
          
          </Grid>

     
        
     
     </>
      )
      )}
    {memberNames &&  memberNames.length && 
     <center style={{display:memberNames.length?"block":"none",margin:"0 auto"}}>
     <Button
      type="button"
      variant="contained"
      style={{
        backgroundColor:"#60A1EC",
        color: "white",
      //  width: "30%",
        fontSize: "15px",
        padding:"20px",
      }}
      sx={{  mb: 2 }}
      onClick={(e)=>resetMemberBoth()}
    >
     UNDO
    </Button>
    </center>
      }


            


           {/* <Grid item xs={4} md={6} lg={3} style={{border: '0px solid red', height: '50%', marginTop: '14px'}}>
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
              
            </Grid>*/}
          </Grid>

          <center>
                 <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    style={{
                      padding:"20px",
                      backgroundColor:/*'#130C66'*/ "#60A1EC",
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
