const {csvToDB} = require("../controller/bookingController")
const bookingData = {}
const carMap = {
    "compact": 30,
    "medium": 30,
    "full-size": 30,
    "class 1 truck": 60,
    "class 2 truck": 120
}

const carRevenueMap = {
    "compact": 150,
    "medium": 150,
    "full-size": 150,
    "class 1 truck": 250,
    "class 2 truck": 700
}

const bay = {
    "compact": 1,
    "medium": 2,
    "full-size": 3,
    "class 1 truck": 4,
    "class 2 truck": 5
}

const idMap = {
    "compact": "65ac38201345cb2eea7dd1c1",
    "medium": "65ac382f1345cb2eea7dd1c4",
    "full-size": "65ac38341345cb2eea7dd1c6",
    "class 1 truck": "65ac38651345cb2eea7dd1c8",
    "class 2 truck": "65ac38701345cb2eea7dd1ca"
}

const bayLength = 5;

function parseDateString(dateString) {
    const [datePart, timePart] = dateString.split(' ');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');

    // Note: JavaScript months are 0-indexed, so we subtract 1 from the month
    return new Date(Date.UTC(year, month - 1, day, hours, minutes));
}

function getTimesForDate(dateString, hour, min) {
    
    const [year, month, day] = dateString.split('-').map(Number);

    return new Date(Date.UTC(year, month - 1, day, hour, min))
    
}


const ProcessCSV = (dataFile) => {
    console.log("<========= Processing Data  ========>");
    let count = 0;
    dataFile.map((data) => {
        const key = `${data[1].getFullYear()}-${data[1].getMonth() + 1}-${data[1].getDate()}`;
        if (!(key in bookingData)) {
            bookingData[key] = [];
        }
        let serviceTime = new Date(data[1]);
        bookingData[key].push({
            timeStamp: data[0],
            startTime: data[1],
            vehicleType: data[2],
            endTime: new Date(serviceTime.setMinutes(serviceTime.getMinutes() + carMap[data[2]]))
        });
    });

    for(date of Object.keys(bookingData)) {
        let dbData = {
            "date": date,
            "data": {
                "totalRevenue": 0,
                "totalTurnedAway": 0,
                "acceptedCustomers": 0,
                "turnedAwayCustomers": 0,
                "Bookings": [],
                "vehicleWise": []
            }
        }

        let vehiclesData = {
            "compact": {
                totalRevenue: 0,
                acceptedCustomers: 0,
                turnedAwayCustomers: 0,
                totalTurnedAway: 0
            },
            "medium": {
                totalRevenue: 0,
                acceptedCustomers: 0,
                turnedAwayCustomers: 0,
                totalTurnedAway: 0
            },
            "full-size": {
                totalRevenue: 0,
                acceptedCustomers: 0,
                turnedAwayCustomers: 0,
                totalTurnedAway: 0
            },
            "class 1 truck": {
                totalRevenue: 0,
                acceptedCustomers: 0,
                turnedAwayCustomers: 0,
                totalTurnedAway: 0
            },
            "class 2 truck": {
                totalRevenue: 0,
                acceptedCustomers: 0,
                turnedAwayCustomers: 0,
                totalTurnedAway: 0
            }
        }

        let slots = {
            dedicated: {
                "compact": [],
                "medium": [],
                "full-size": [],
                "class 1 truck": [],
                "class 2 truck": []
            },
            regular: [],
            turnedAwaySlots:[]
            
        }
        
        for (let i=0; i<bayLength; i++) {
            slots.regular.push([]);
        }

        getTimesForDate(date);
        const openingHour = getTimesForDate(date, 7, 0);
        const closingHour = getTimesForDate(date, 19, 0);
        let total = 0;

        // console.log(openingHour, closingHour)

        for (booking of bookingData[date]) {
            // if (booking.vehicleType != "class 2 truck" || date != "2022-10-2") continue;
            // console.log(booking);
            let dedicatedSlot = slots["dedicated"][booking.vehicleType];
            let regularSlot = slots["regular"];
            total += carRevenueMap[booking.vehicleType];

            // Check if end time is greater than 7 PM and Booking Time is less than 7 AM
            // If True: Add to TurnedAway Request and continue
            // Check if end time is greater than 7 PM and booking time is less than 7 AM
            if (booking.startTime < openingHour || booking.endTime > closingHour) {
                // console.log(booking.startTime , openingHour , booking.endTime , closingHour);
                booking["status"] = "TurnedAway"
                dbData.data.totalTurnedAway += carRevenueMap[booking.vehicleType]
                vehiclesData[booking["vehicleType"]].totalTurnedAway += carRevenueMap[booking.vehicleType]
                vehiclesData[booking["vehicleType"]].turnedAwayCustomers += 1
                booking["vehicleType"] = idMap[booking.vehicleType]
                slots.turnedAwaySlots.push(booking);
                dbData.data.Bookings.push(booking);
                dbData.data.turnedAwayCustomers += 1
                
                
                continue;
            }

            if (dedicatedSlot.length == 0 || dedicatedSlot[dedicatedSlot.length - 1].endTime < booking.startTime) {
                // Add to dedicated Slot
                booking["status"] = "Serviced";
                booking["bay"] = bay[booking.vehicleType];
                dbData.data.totalRevenue += carRevenueMap[booking.vehicleType]
                vehiclesData[booking["vehicleType"]].totalRevenue += carRevenueMap[booking.vehicleType]
                vehiclesData[booking["vehicleType"]].acceptedCustomers += 1
                booking["vehicleType"] = idMap[booking.vehicleType]
                dbData.data.acceptedCustomers += 1
                dedicatedSlot.push(booking);
                dbData.data.Bookings.push(booking);
            }
            else {
                // Check for Slot in regular Slot
                let isBooked = false;
                for (let i = 0; i<bayLength; i++) {
                    if (regularSlot[i].length == 0 || regularSlot[i][regularSlot[i].length - 1].endTime < booking.startTime) {
                        // Add to dedicated Slot

                        booking["status"] = "Serviced";
                        booking["bay"] = (i + 1 + bayLength);
                        dbData.data.totalRevenue += carRevenueMap[booking.vehicleType]
                        dbData.data.acceptedCustomers += 1
                        vehiclesData[booking["vehicleType"]].totalRevenue += carRevenueMap[booking.vehicleType]
                        vehiclesData[booking["vehicleType"]].acceptedCustomers += 1
                        booking["vehicleType"] = idMap[booking.vehicleType]
                        regularSlot[i].push(booking);
                        dbData.data.Bookings.push(booking);
                        isBooked = true;
                        break;
                    }
                }

                if(!isBooked) {
                    booking["status"] = "TurnedAway";
                    dbData.data.totalTurnedAway += carRevenueMap[booking.vehicleType];
                    vehiclesData[booking["vehicleType"]].totalTurnedAway += carRevenueMap[booking.vehicleType]
                    vehiclesData[booking["vehicleType"]].turnedAwayCustomers += 1
                    booking["vehicleType"] = idMap[booking.vehicleType]
                    slots.turnedAwaySlots.push(booking);
                    dbData.data.Bookings.push(booking);
                    dbData.data.turnedAwayCustomers += 1
                }
            }
        }
        // if (date == "2022-10-2") {
        //     console.log(slots.regular[3]);
        //     console.log("\n====================================\n")
        //     console.log(slots.regular.length);
        //     console.log("\n====================================\n")
        //     console.log(slots.turnedAwaySlots.length);
        //     console.log(date, " +++ ", bookingData[date].length," +++ ", slots.totalRevenue, " +++ ",slots.totalTurnedAwayRevenue, "  +++  ", total)
        //     console.log(slots.regular[3].reduce((a, b) => a + carRevenueMap[b.vehicleType], 0));
        // }
        // finalTotalProfit += slots.totalRevenue;
        // finalTotalLostt += slots.totalTurnedAwayRevenue;
        for (let key of Object.keys(vehiclesData)) {
            dbData.data.vehicleWise.push({vehicleid: idMap[key], ...vehiclesData[key]})
        }
        csvToDB(dbData)
    }
}

module.exports = ProcessCSV
