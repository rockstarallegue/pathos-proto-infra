const maker = require("./maker");
const getter = require("./getter");
const updater = require("./updater");

///////////////
///  HELLO  ///
///////////////

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

////////////////
///  MOMENT  ///
////////////////

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

/////////////////
///  PIONEER  ///
/////////////////

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

////////////////
///  SECRET  ///
////////////////

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

//////////////
///  USER  ///
//////////////

/** makeUser
 * [User maker]
 * 
 * @return {string} moment_buffer
 */
exports.makeUser = (xbirthday, xsecret, format = 'MM DD YYYY HH:mm:SSS [GMT]Z') => {
    const user_buffer = maker.user(xbirthday, xsecret, format)
    return user_buffer
}

/** getUserObj
 * [Function that recieves a moment hash and returns the moment object]
 * 
 * @param {string} xuser (required)
 * 
 * @return {obj} user_object (user object)
 */
exports.getUserObj = (xuser) => {
    const user_object = getter.getUserObj(xuser);
    return user_object;
}

//////////////
///  NODE  ///
//////////////

/** makeNode
 * [Node maker]
 * 
 * @return {string} node_buffer
 */
exports.makeNode = (author = "pioneer/"+maker.pioneer(), content, format = 'MM DD YYYY HH:mm:SSS [GMT]Z') => {
    const node_buffer = maker.node(author, content, format)
    return node_buffer
}

/** getNodeObj
 * [Function that recieves a moment hash and returns the moment object]
 * 
 * @param {string} xnode (required)
 * 
 * @return {obj} node_object (user object)
 */
exports.getNodeObj = (xnode) => {
    const node_object = getter.getNodeObj(xnode);
    return node_object;
}

//////////////
///  PATH  ///
//////////////

/** makePath
 * [Path maker]
 * 
 * @return {string} path_buffer
 */
exports.makePath = (author = "pioneer/"+maker.pioneer(), name, head, parent, format = 'MM DD YYYY HH:mm:SSS [GMT]Z') => {
    const path_buffer = maker.path(author, name, head, parent, format)
    return path_buffer
}

/** getPathObj
 * [Function that recieves a moment hash and returns the moment object]
 * 
 * @param {string} xpath (required)
 * 
 * @return {obj} path_object (user object)
 */
exports.getPathObj = (xpath) => {
    const path_object = getter.getPathObj(xpath);
    return path_object;
}