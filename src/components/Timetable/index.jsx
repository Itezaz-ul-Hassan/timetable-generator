import React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    minWidth: 10,
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  // '&:last-child td': {
  //   backgroundColor: theme.palette.common.green,
  // },
}));



const Timetable = ({state}) => {
  const times = ['', '8.30-10.00', '10.00-11.30', '11.30-1.00', '1.00-2.30', '2.30-4.00', '4.00-5.30', '5.30-7.00', '7.00-8.30'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Select Column'];

  return (
    <TableContainer component={Paper} sx={{ minWidth: 1050 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
          <StyledTableRow>
            {times.map((time) => <StyledTableCell key={time}>{time}</StyledTableCell>)}
            <StyledTableCell>Select Row</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {days.map((day, i) => {
           return (
             <StyledTableRow key={day} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
               <StyledTableCell component="th" scope="row">{day}</StyledTableCell>
               {times.map((time, j) => {
                 return (
                  <StyledTableCell>
                    <Checkbox
                      checked={state[Number(i)][Number(j)]}
                      // onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </StyledTableCell>
                 )
               })}
             </StyledTableRow>
           )
         })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

Timetable.propTypes = {
  state: PropTypes.array.isRequired,
};

export default Timetable;
