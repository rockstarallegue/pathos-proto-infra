const maker = require("./maker");
const getter = require("./getter");
const updater = require("./updater");

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
 * @param {string} format   (optional, default="ddd MMM DD YYYY HH:mm:ss [GMT]Z")
 * @param {float}  lat      (optional, default=0)
 * @param {float}  lon      (optional, default=0)
 * @param {float}  x        (optional, default=0)
 * @param {float}  y        (optional, default=0)
 * @param {float}  z        (optional, default=0)
 * 
 * @return {string} moment_buffer
 */
exports.makeMoment = (datetime = getter.getCurrentDate(), format = 'MM DD YYYY HH:mm:SSS [GMT]Z', lat = 0, lon = 0, x = 0, y = 0, z = 0) => {
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

/** makePioneer
 * [Pioneer maker]
 * 
 * @return {string} moment_buffer
 */
exports.makePioneer = (datetime = getter.getCurrentDate(), format = 'MM DD YYYY HH:mm:SSS [GMT]Z') => {
    const pioneer_buffer = maker.pioneer(datetime, format)
    return pioneer_buffer
}

/** getPioneerObj
 * [Function that recieves a moment hash and returns the moment object]
 * 
 * @param {string} xpioneer (required)
 * 
 * @return {obj} pioneer_object (user object)
 */
exports.getPioneerObj = (xpioneer) => {
    const pioneer_object = getter.getPioneerObj(xpioneer);
    return pioneer_object;
}

/** makeSecret
 * [Secret maker]
 * 
 * @return {string} secret_buffer
 */
exports.makeSecret = (author = "pioneer/"+maker.pioneer(), format = 'MM DD YYYY HH:mm:SSS [GMT]Z') => {
    const secret_buffer = maker.secret(author, format)
    return secret_buffer
}

/** useSecret
 * [Secret using]
 * 
 * @return {string} secret_buffer
 */
exports.useSecret = (xsecret) => {
    const secret_buffer = updater.useSecret(xsecret)
    return secret_buffer
}

/** getSecretObj
 * [Function that recieves a moment hash and returns the moment object]
 * 
 * @param {string} xsecret (required)
 * 
 * @return {obj} secret_object (user object)
 */
exports.getSecretObj = (xsecret) => {
    const secret_object = getter.getSecretObj(xsecret);
    return secret_object;
}
