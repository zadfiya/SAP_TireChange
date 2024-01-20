const { give_response } = require("./helper");

const errorHandler = (err, req, res, next) => {
    let message;

    if (err.name === "CastError") {
        message = `Resourse not found`;
        //error = new ErrorResponse(message, 404);
    }

    //Mongoose Duplicate key
    else if (err.code === 11000) {
        message = `Duplicate found`;
        //error = new ErrorResponse(message, 400);
    }

    //Mongoose validation Error
    else if (err.name === "ValidationError") {
        message = Object.values(err.errors).map((val) => val.message)[0];
        //error = new ErrorResponse(message, 400);
    } else {
        message = err.message;
    }
    console.log(err);
    return give_response(res, 201, false, message);
};

module.exports = errorHandler;
