const data = require("../service/datafile.csv")
const {parse} = require("csv-parse")

const LoadDataFromCSV = () => {

    fs.createReadStream(data)
    .pipe(parse({ delimiter: ",", from_line: 1 }))
    .on("data", function (row) {
        console.log(row);
    })
}

module.exports = LoadDataFromCSV