import { useState } from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import TimetableGenerator from './containers/TimetableGenerator'
import CourseDropdown from './components/CourseDropdown';

import Courses from './core/utils/data';

function App() {
  const [selectedTime, setSelectedTime] = useState(
    Array.from({length: 7}, () => Array(9).fill(true))
  );

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 30 }}>
      <Grid
        container
        spacing={{xs: 2, md: 12}}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {[1,2,3,4,5].map((item) => {
          let prev = "";
          const options = Courses.map((course) => {
            const name = course[0];
            if (name != prev && name.includes("Lab") != true) {
              prev = name;
              return name;
            }
          }).filter((item) => item != undefined);
          return (
            <Grid item xs={12} sm={10} md={8} lg={6} xl={3}>
              <CourseDropdown
                key={item}
                id={item}
                onChangeHandler={()=>{}}
                options={options}
              />
            </Grid>
          )
        })}
      </Grid>
      <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: 3 }}>
        <TimetableGenerator selectedTime={selectedTime} />
      </Grid>
    </Box>
  );
}

export default App
