exports.give_response = function (res, status_code, success, message, data = null) {
    var data = data == null ? {} : data;
    var json_to_send = { success: success, message: message, data: data };
    return res.status(status_code).json(json_to_send);
};