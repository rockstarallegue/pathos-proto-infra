var fs = require("fs");
var pb = require('protocol-buffers');
var dt = require('date-and-time');

/** getCurrentDate
 * [Function that returns current datetime string on "MMM DD YYYY HH:mm:ss [GMT]Z" format]
 * 
 * @return {string} current_datetime
 */
function getCurrentDate(format = 'MM DD YYYY HH:mm:SSS [GMT]Z'){
    var current_datetime = new Date()
    current_datetime = dt.format(current_datetime, dt.compile(format, true));

    return current_datetime;
}

/** getMomentObj
 * [Function that recieves a moment hash and returns the moment object]
 * 
 * @param {string} xmoment (required)
 * 
 * @return void
 */
function getMomentObj(xmoment) {
    // "moments/hash" FORMAT EXCEPTION
    if(xmoment.split("/").length > 1){ 
        xmoment = xmoment.split("/")[1]
    }

    // LOADING PB
    var moment_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/moment.proto'))
    
    // NOT FOUND EXCEPTION
    var fileContents;
    try {
        fileContents = fs.readFileSync("files/moments/"+xmoment);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return "Moment not found :(";
        } else {
            throw err;
        }
    }

    // DECODING MOMENT
    var moment_enc = fileContents
    var moment_obj = moment_pb.moment.decode(moment_enc)

    return moment_obj;
}

/** getPioneerObj
 * [Function that recieves a pioneer hash and returns the pioneer object]
 * 
 * @param {string} xpioneer (required)
 * 
 * @return void
 */
function getPioneerObj(xpioneer) {
    // "pioneer/hash" FORMAT EXCEPTION
    if(xpioneer.split("/").length > 1){ 
        xpioneer = xpioneer.split("/")[1]
    }

    // LOADING PB
    var pioneer_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/user.proto'))
    
    // NOT FOUND EXCEPTION
    var fileContents;
    try {
        fileContents = fs.readFileSync("files/pioneer/"+xpioneer);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return "Pioneer not found :(";
        } else {
            throw err;
        }
    }


    // DECODING PIONEER
    var pioneer_enc = fileContents
    var pioneer_obj = pioneer_pb.user.decode(pioneer_enc)

    return pioneer_obj;
}

/** getSecretObj
 * [Function that recieves a secret hash and returns the secret object]
 * 
 * @param {string} xsecret (required)
 * 
 * @return void
 */
function getSecretObj(xsecret) {
    // "secret/hash" FORMAT EXCEPTION
    if(xsecret.split("/").length > 1){ 
        xsecret = xsecret.split("/")[1]
    }

    // LOADING PB
    var secret_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/secret.proto'))
    
    // NOT FOUND EXCEPTION
    var fileContents;
    try {
        fileContents = fs.readFileSync("files/secrets/"+xsecret);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return "Secret not found :(";
        } else {
            throw err;
        }
    }

    // DECODING SECRET
    var secret_enc = fileContents
    var secret_obj = secret_pb.secret.decode(secret_enc)

    return secret_obj;
}

module.exports = { getCurrentDate, getMomentObj, getPioneerObj, getSecretObj };