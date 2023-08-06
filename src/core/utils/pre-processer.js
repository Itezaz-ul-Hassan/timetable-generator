// const xlsx = require("xlsx");
import xlsx from 'xlsx';
// const fs = require("fs");
export default function getData() {
  const workbook = xlsx.readFile("table.xlsx");
  const sheetname = workbook.SheetNames.find((name) => name.includes("TT"));

  const sheet = workbook.Sheets[sheetname];

  const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  let removeRows = 0;

  for (const rowData of jsonData) {
    if (rowData[0].includes("Monday")) break;
    removeRows++;
  }

  const dataWithoutRows = jsonData.slice(removeRows);

  const courseLength = {};

  const anotherSheet = xlsx.utils.sheet_add_json(sheet, dataWithoutRows);

  // console.log(anotherSheet);

  for (const range of anotherSheet["!merges"]) {
    courseLength[`${range.s.r + 1}-${range.s.c + 1}`] = range.e.c - range.s.c + 1;
  }

  // console.log(Object.keys(courseLength).length);
  // console.log(courseLength[`184-43`]);

  let venue = "";
  let day = 0;
  let section = "";
  let periods = [];

  // const updatedData = xlsx.utils.sheet_to_json(anotherSheet);
  for (const data in dataWithoutRows) {
    //   console.log(data, dataWithoutRows[data]);
    const row = data;
    const val = dataWithoutRows[data];
    //   break;
    if (val[1] == null) {
      day++;
    } else {
      venue = val[1];
      for (let col = 2; col < val.length; col++) {
        let period = val[col];
        if (period != null) {
          if (period.includes("(")) section = period.split("(")[1].split(")")[0];
          else section = period;
          let course = period.split("(")[0].trim();
          let stime = (col - 2) * 10;
          let etime = 0;
          if (`${Number(row) + 5}-${Number(col) + 1}` in courseLength) {
            etime =
              (col - 2 + courseLength[`${Number(row) + 5}-${Number(col) + 1}`]) *
                10 +
              10;
          } else {
            etime = 0;
            continue;
          }
          if (course === "Obj. Oriented Programming")
            course = "Object Oriented Programming";
          else if (course === "Obj. Ori. Analysis & Design")
            course = "Object Oriented Analysis and Design";
          else if (course === "English Comp Lab")
            course = "English Composition and Comprehension Lab";
          periods.push([
            course,
            section,
            String(stime - 40),
            String(etime - 40),
            String(day),
            venue,
          ]);
        }
      }
    }
  }

  function compare(p) {
    if (p[0].includes("Lab")) {
      return p[0].slice(0, -4) + p[1];
    }
    return p[0] + p[1];
  }

  periods.sort((a, b) => compare(a).localeCompare(compare(b)));
  return periods;

  // let content = "Courses = [\n";
  // for (const P of periods) {
  //   content += `\t["${P.join('","')}"],\n`;
  // }
  // content += "]\n";

  // fs.writeFileSync("Data.js", content);
};