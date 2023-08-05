const make = require("./maker");

const event = new Date(Date.now());
const current_datetime = event.toString().split(" (")[0]

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
exports.makeMoment = (datetime = current_datetime, format = "ddd MMM DD YYYY HH:mm:ss [GMT]Z", lat = 0, lon = 0, x = 0, y = 0, z = 0) => {
    const moment_buffer = make.moment(datetime, lat, lon, x, y, z, format)
    console.log("-> Moment buffer path: moments/", moment_buffer)
    return moment_buffer
}