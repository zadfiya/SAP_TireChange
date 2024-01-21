exports.give_response = function (res, status_code, success, message, data = null) {
    var data = data == null ? {} : data;
    var json_to_send = { success: success, message: message, data: data };
    return res.status(status_code).json(json_to_send);
};

exports.vehicleChargeById = function(id)
{
    charge=0
    switch(id)
    {
        
        case "65ac38201345cb2eea7dd1c1":
          charge=150
          break;
        case "65ac382f1345cb2eea7dd1c4":
            charge=150
            break
        case "65ac38341345cb2eea7dd1c6":
            charge=150
            break
        case "65ac38651345cb2eea7dd1c8":
            charge=250
        case "65ac38701345cb2eea7dd1ca":
            charge = 600
        default:
            charge=0 
    }
    return charge
}