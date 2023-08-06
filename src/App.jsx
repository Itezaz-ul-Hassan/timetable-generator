import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import TimetableGenerator from './containers/TimetableGenerator'
import CourseDropdown from './components/CourseDropdown';
import GeneratedTimetable from './components/GeneratedTimeTable';
import Details from './components/Details';

import Courses from './core/utils/data';

function App() {
  const [selectedTime, setSelectedTime] = useState(
    Array.from({ length: 7 }, () => Array(9).fill(true))
  );

  const [selectedCourses, setSelectedCourses] = useState([]);

  const [selectedSections, setSelectedSections] = useState([[], [], [], [], []]);
  const [error, setError] = useState('');
  const [generatedTables, setGeneratedTables] = useState([]);
  const [recentlyChangedCourse, setRecentlyChangedCourse] = useState('');

  const addSections = useCallback((courseName) => {
    let prev = '';
    const updatedSelectedSections = selectedSections.slice();

    Courses.forEach((period) => {
      const [course, section] = period;
      if (course === courseName && section !== prev) {
        const index = selectedCourses.indexOf(courseName);
        if (updatedSelectedSections[index] === undefined) {
          updatedSelectedSections[index] = [];
        }
        updatedSelectedSections[index].push(section);
        prev = section;
      }
    });

    setSelectedSections(updatedSelectedSections);
  }, [selectedCourses, setSelectedSections]);

  useEffect(() => {
    if (recentlyChangedCourse) {
      addSections(recentlyChangedCourse);
    }
  }, [recentlyChangedCourse, addSections]);

  function SameCourses(c1, c2) {
    return c1.includes(c2) || c2.includes(c1);
  }

  function SameSection(sections, s) {
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].substring(0, 6) == s.substring(0, 6)) {
        return true;
      }
    }
    return false;
  }

  function deepCopy2DArray(array) {
    return array.map(innerArray => [...innerArray]);
  }

  function deepCopy(obj) {
    if (Array.isArray(obj)) {
      return obj.map(deepCopy);
    } else if (typeof obj === 'object' && obj !== null) {
      const newObj = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          newObj[key] = deepCopy(obj[key]);
        }
      }
      return newObj;
    } else {
      return obj;
    }
  }

  function filter(courseNames, sections, allowedPeriods) {
    let currentCourse = [];
    const filtered = [];
    for (let i = 0; i < Courses.length;) {
      let iterate = true;
      for (let j = 0; j < 5; j++) {
        let previousSection;
        let currentSection = [];
        if (i < Courses.length && Courses[i][0] == courseNames[j] && SameSection(sections[j], Courses[i][1])) {
          previousSection = Courses[i][1].substring(0, 6);
          while (i < Courses.length && SameCourses(Courses[i][0], courseNames[j])) {
            let stime = Math.floor(parseInt(Courses[i][2]) / 90);
            let etime = Math.ceil(parseInt(Courses[i][3]) / 90);
            let allowed = true;
            if (previousSection != Courses[i][1].substring(0, 6) && currentSection.length != 0) {
              previousSection = Courses[i][1].substring(0, 6);
              currentCourse.push(currentSection);
              currentSection = [];
            }
            if (SameSection(sections[j], Courses[i][1]) == false) {
              allowed = false;
            }
            for (let k = stime; k < etime; k++) {
              if (allowedPeriods[parseInt(Courses[i][4])][k] == false || allowed == false) {
                let wrongSection = Courses[i][1].substring(0, 6);
                allowed = false;
                currentSection = [];
                while (i < Courses.length && SameCourses(Courses[i][0], courseNames[j]) && Courses[i][1].substring(0, 6) == wrongSection) {
                  i++;
                }
                previousSection = Courses[i][1].substring(0, 6);
                i--;
                break;
              }
            }
            if (allowed) {
              currentSection.push(Courses[i]);
            }
            iterate = false;
            i++;
          }
          if (currentSection.length != 0) {
            currentCourse.push(currentSection);
          }
          if (currentCourse.length != 0) {
            filtered.push(currentCourse);
            currentCourse = [];
          }
        }
      }
      if (iterate) {
        i++;
      }
    }
    return filtered;
  }

  const generateTable = () => {
    let numCourses = 0;
    for (let i = 0; i < selectedCourses.length; i++) {
      if (selectedSections[i].length !== 0 && selectedCourses[i] !== "Please select a course") {
        numCourses++;
      }
      const filteredData = filter(selectedCourses, selectedSections, selectedTime);
      if (filteredData.length < numCourses || numCourses === 0) {
        setError("No possible timetable");
      } else {
        var timetable = [];
        for (let i = 0; i < 6; i++) {
          timetable.push(["-", "-", "-", "-", "-", "-", "-", "-"]);
        }
        GenerateTable(filteredData, 0, timetable);
      }
    }
  }

  function printTable(timetable) {
    setGeneratedTables((item) => {
      const data = [...item, deepCopy2DArray(timetable.slice())].map(deepCopy);
      return [...data]
    });
  }

  const GenerateTable = (Filtered, Depth, TimeTable) => {
    if (Depth == Filtered.length) {
      printTable(deepCopy2DArray(TimeTable.slice()));
      return;
    }
    for (let i = 0; i < Filtered[Depth].length; i++) {
      let clash = false;
      for (let j = 0; j < Filtered[Depth][i].length; j++) {
        var stime = Math.floor(parseInt(Filtered[Depth][i][j][2]) / 90);
        var etime = Math.ceil(parseInt(Filtered[Depth][i][j][3]) / 90);
        for (let k = stime; k < etime; k++) {
          if (TimeTable[parseInt(Filtered[Depth][i][j][4])][k] == "-") {
            TimeTable[parseInt(Filtered[Depth][i][j][4])][k] = Filtered[Depth][i][j][0] + "\n" + Filtered[Depth][i][j][1] + "\n" + Filtered[Depth][i][j][5];
          }
          else {
            clash = true;
          }
        }
      }
      if (clash == false) {
        GenerateTable(Filtered, Depth + 1, TimeTable);
      }
      for (let j = 0; j < Filtered[Depth][i].length; j++) {
        var stime = Math.floor(parseInt(Filtered[Depth][i][j][2]) / 90);
        var etime = Math.ceil(parseInt(Filtered[Depth][i][j][3]) / 90);
        for (let k = stime; k < etime; k++) {
          if (TimeTable[parseInt(Filtered[Depth][i][j][4])][k] == Filtered[Depth][i][j][0] + "\n" + Filtered[Depth][i][j][1] + "\n" + Filtered[Depth][i][j][5]) {
            TimeTable[parseInt(Filtered[Depth][i][j][4])][k] = "-";
          }
        }
      }
    }
  }

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 30 }}>
      <Grid container direction="column" justifyContent="center" rowGap={2} alignItems="center" sx={{ marginBottom: 3 }}>
        <Details />
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, md: 12 }}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {[1, 2, 3, 4, 5].map((item) => {
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
                courses={selectedCourses}
                key={item}
                id={item}
                onChangeHandler={setSelectedCourses}
                options={options}
                setRecentlyChangedCourse={setRecentlyChangedCourse}
              />
            </Grid>
          )
        })}
      </Grid>
      <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: 3 }}>
        <TimetableGenerator selectedTime={selectedTime} onSubmit={generateTable} />
      </Grid>
      <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: 3 }}>
        {generatedTables.slice(0, generatedTables.length/selectedCourses.length).map((table) => (
          <Grid container sx={{ marginTop: 3, marginBottom: 3 }}>
            <GeneratedTimetable state={table} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App
