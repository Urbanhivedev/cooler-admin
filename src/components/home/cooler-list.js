import React, { useEffect, useState } from "react";
import PropTypes, { string } from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { styled } from "@mui/styles";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { Link, NavLink, useNavigate} from "react-router-dom";
//import SearchBar from "material-ui-search-bar";
//import useRequest from "../../hooks/use-request";
import { fetchJobs } from "../../redux/actions/job.action";
import Skeleton from '@mui/material/Skeleton';
import {Typography,CardMedia,} from '@material-ui/core';
import CoolerBoxIMG from '../../assets/images/save-money.png';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAllGroups, fetchGroups, payoutMember } from 'src/redux/actions/group.action';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';

import { deleteSingleCooler } from "../../redux/actions/cooler.action";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:/*'#130C66'*/ "#60A1EC",
    color: theme.palette.common.white,
    
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    width:300,
  },
}));

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const originalJobList = [
  { id: 1, title: "Java Developer", fulldate: "01/01/2022" },
  { id: 2, title: "MERN Stack Developer", fulldate: "01/01/2022"},
  { id: 3, title: "Flutter Developer", fulldate: "01/01/2022"},
].sort((a, b) => (a.title < b.title ? -1 : 1));

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});





export default function CoolerList({jobs}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {allGroups, myGroups, isLoading } = useSelector((state) => state.group);
  const [jobList, setJobList] = useState(jobs);
  console.log("the logged in user credentials are!:",user)
  
  useEffect(() => {
    dispatch(fetchGroups(user?.id));
    dispatch(fetchAllGroups());
  }, [])

 
 
 
  //search function
  
  const [searched, setSearched] = useState("");
  const classes = useStyles();
  const requestSearch = (searchedVal) => {
    const filteredRows = jobs?.filter((row) => {
      return row.title.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setJobList(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  //search function end


  const payoutMembers = async() => {
  

    let today = new Date();
    let date = today.getFullYear()+'-'+("0"+(today.getMonth()+1)).slice(-2)+'-'+("0"+today.getDate()).slice(-2);
    let filteredData = allGroups.filter(item => item.payoutDate === date);
    
    if(filteredData.length){
     filteredData.map( (group, index) => {
       dispatch(payoutMember(group.groupId, group.members, parseInt(group.amount), group.payoutIndex, group.accountBalance, group.numOfBatchPayment, group.payoutDate, filteredData, group.groupName))
     })
    }else{
     
      notifyErrorFxn("No groups are scheduled to pay out today!");
    }
    
  }

  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - jobList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const viewJobsFxn = (id) => {
    navigate(`/dashboard/view-coolers/${id}`);
  };

  const deleteCoolerFxn = (id,userId) => {
    const preserveId = id
    
  if(window.confirm("are you sure you want to delete this cooler?")){
   
    dispatch(deleteSingleCooler(id)); 
    
    notifySuccessFxn("Cooler Successfully Deleted!");
    
   setTimeout(function(){window.location.reload()},3000);
    
    
  }
  
};

  

  // const { doRequest, loading } = useRequest({
  //   url: '/setup/update-field',
  //   method: 'post',
  //   onSuccess: (data) => {
  //     // console.log('data: ', data);
  //     setLoadingButton(false);
  //     if (data?.message === 'done') {
  //       navigate('profile-picture?job=' + jobID);
  //     } else {
  //       setErrorMessage(data?.message);
  //     }
  //   }
  // });



  return (
    <>
        {
          jobs? 
          <>
         

         { <div style={{float: 'right', border: '0px solid red'}}>
        <Button
            type="submit"
            
            variant="contained"
            style={{
              backgroundColor: /*'#130C66'*/"#60A1EC" ,
              color: "white",
              fontSize: "15px",
              padding:"20px"
            }}
            sx={{ mt: 7, mb: 2 }}
             
            onClick={() => {payoutMembers()}}
          >
            MAKE PAYMENT 
          </Button>
            
         

          </div>}
      
      <br/>
      <p style={{fontSize: '26px', marginLeft: '5px', color: 'black'}}><b>ALL COOLERS</b></p><br/>
      <hr />
      <TableContainer component={Paper}  >
        <Table sx={{ maxWidth: 1300, tableLayout:"fixed" }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Group Name</StyledTableCell>
              <StyledTableCell align="right">Total Amount</StyledTableCell>
              <StyledTableCell align="right">Registered On</StyledTableCell>
              <StyledTableCell align="right">Number in Group</StyledTableCell>
              
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? jobList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : jobList
            ).map((row) => (
              <TableRow key={row.groupId && row.groupId}>
                <TableCell component="th" scope="row">
                  {row.groupName && row.groupName}
                </TableCell>
                <TableCell style={{ width: 140 }} align="right">
                  ${row.amount && row.amount}
                </TableCell>
                <TableCell style={{ width: 140 }} align="right">
                {row.accountCreated &&typeof(row.accountCreated) !== "string"  ?(new Date(row.accountCreated.seconds*1000)).toDateString():row.accountCreated}
                </TableCell>
                <TableCell style={{ width: 140 }} align="right">
                {row.members && row.members.length}
                </TableCell>
               
                <TableCell style={{ width: 180 }} align="right">
                  <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: /*'#130C66'*/ "#60A1EC",
                      color: "white",
                      width: "70%",
                      fontSize: "15px",
                    }}
                    sx={{ mt: 7, mb: 2 }}
                    onClick={() => viewJobsFxn(row.id)}
                  >
                    VIEW
                  </Button>
                </TableCell>


                <TableCell style={{ width: 180 }} align="right">
                  <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: /*'#130C66'*/ "#60A1EC",
                      color: "white",
                      width: "70%",
                      fontSize: "15px",
                    }}
                    sx={{ mt: 7, mb: 2 }}
                    onClick={() => deleteCoolerFxn(row.id,user.id)}
                  >
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={jobList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
     
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

    </>
  );
}
