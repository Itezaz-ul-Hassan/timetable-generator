import React from 'react';


const Timetable = () => {
  const times = ['', '8.30-10.00', '11.30-1.00', '1.00-2.30', '2.30-4.00', '4.00-5.30', '5.30-7.00', '7.00-8.30'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Select Column'];

  return (
    <table>
      <thead>
        {times.map((time) => <th key={time}>{time}</th>)}
        <th>Select Row</th>
      </thead>
      <tbody>
        {days.map((day) => {
          return (
            <tr key={day}>
              <th>{day}</th>
              {times.map(() => {
                return <td><input type="checkbox" checked/>&nbsp;</td>
              })}
              <td><input type="checkbox" checked onClick={() => {}} /></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};

export default Timetable;
