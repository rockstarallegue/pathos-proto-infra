const maker = require("./maker");
const getter = require("./getter");

const event = new Date(Date.now());
const split_datetime = event.toString().split(" (")[0].split(" ")
const current_datetime = split_datetime[1]  + " " + split_datetime[2] + " " + split_datetime[3] + " " + split_datetime[4] + " " + split_datetime[5]; 


/** hello
 * [Function that greets someone who is calling the function]
 * 
 * @param {string} name (optional, default="nameless entity")
 * 
 * @return {string} result
 */
exports.hello = (name = "nameless entity") => {
    var result = "Hello from the Dream Operator's Garage, " + name;
    return result;
}

/** makeMoment
 * [Moment maker]
 * 
 * @param {string} datetime (optional, default=*current datetime*)
 * @param {string} format (optional, default="ddd MMM DD YYYY HH:mm:ss [GMT]Z")
 * @param {float}  lat (optional, default=0)
 * @param {float}  lon (optional, default=0)
 * @param {float}  x (optional, default=0)
 * @param {float}  y (optional, default=0)
 * @param {float}  z (optional, default=0)
 * 
 * @return {string} moment_buffer
 */
exports.makeMoment = (datetime = current_datetime, format = "MMM DD YYYY HH:mm:ss [GMT]Z", lat = 0, lon = 0, x = 0, y = 0, z = 0) => {
    const moment_buffer = maker.moment(datetime, format, lat, lon, x, y, z)
    return moment_buffer
}

/** getMomentObj
 * [Function that recieves a moment hash and returns the moment object]
 * 
 * @param {string} xmoment (required)
 * 
 * @return {obj} moment_object
 */
exports.getMomentObj = (xmoment) => {
    const moment_object = getter.getMomentObj(xmoment);
    return moment_object;
}