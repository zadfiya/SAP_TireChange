
const fs = require('fs');
const {parse} = require("csv-parse")
const ProcessCSV = require("./ProcessCSV")
const dataList = [];
const csvFilePath = "./src/service/datafile.csv";

const carRevenueMap = {
    "compact": 150,
    "medium": 150,
    "full-size": 150,
    "class 1 truck": 250,
    "class 2 truck": 700
}

const carMap = {
    "compact": 30,
    "medium": 30,
    "full-size": 30,
    "class 1 truck": 60,
    "class 2 truck": 120
}

const compareByTimeStamp = (a, b) => {
    let x = a[0] - b[0];
    if (x == 0) {
        // console.log("HERH")
        return (carRevenueMap[b[2]] / carMap[b[2]]) - (carRevenueMap[a[2]] / carMap[a[2]]);
    }
    return x;
};
const compareByBookingDate = (a, b) => a[1] - b[1];

function parseDateString(dateString) {
    const [datePart, timePart] = dateString.split(' ');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
  
    // Note: JavaScript months are 0-indexed, so we subtract 1 from the month
    return new Date(Date.UTC(year, month - 1, day, hours, minutes));
  }


const ExtactCSV = () => {
    
    return fs.createReadStream(csvFilePath)
    .pipe(parse())
    .on('data', (row) => {
        // Assuming the CSV file has header row, each row will be an object
        var timeStamp = row[0];
        var bookingDate = row[1];      
        dataList.push([parseDateString(timeStamp), parseDateString(bookingDate), row[2]]);
    
    })
    .on('end', () => {
        
        dataList.sort(compareByTimeStamp);
        dataList.sort(compareByBookingDate);
        console.log("<========= Extracting Data  ========>")
        ProcessCSV(dataList);  
    })
    .on('error', (error) => {
        console.error('Error reading CSV file:', error.message);
    });
}

module.exports = ExtactCSV