import TimetableGenerator from './containers/TimetableGenerator'
import CourseDropdown from './components/CourseDropdown';

import Courses from './core/utils/data';

function App() {
  return (
    <>
      {[1,2,3,4,5].map((item) => {
        let prev = "";
        const options = Courses.map((course) => {
          const name = course[0];
          if (name != prev && name.includes("Lab") != true) {
            prev = name;
            return name;
          }
        }).filter((item) => item != undefined);
        return <CourseDropdown key={item} id={item} onChangeHandler={()=>{}} options={options} />
      })}
      <TimetableGenerator />
    </>
  );
}

export default App
