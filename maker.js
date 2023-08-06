var fs = require("fs");
var pb = require('protocol-buffers');
var dt = require('date-and-time');
var sha256 = require("js-sha256");

/** checkDir
 * [Function that creates directory if it does not exist]
 * 
 * @param {string} dir (required)
 * 
 * @return void
 */
function checkDir(dir){
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
}

/** moment
 * [Moment Protocol Buffer Creation]
 * 
 * @param {string} datetime (optional)
 * @param {string} format   (optional)
 * @param {float}  lat      (optional)
 * @param {float}  lon      (optional)
 * @param {float}  x        (optional)
 * @param {float}  y        (optional)
 * @param {float}  z        (optional)
 * 
 * @return {string} moment_buffer
 */
function moment(datetime, format, lat, lon, x, y, z) {
    // let moment_pb = require('node_modules/proto/moment.proto')
    var moment_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/moment.proto'))
    
    var date_obj = dt.preparse(datetime, format);
    var moment_obj = {
        coordinates: {
            lat: lat,
            lon: lon,
            xyz: { x: x, y: y, z: z }
        },
        datetime: {
            Y: date_obj.Y,
            M: date_obj.M,
            D: date_obj.D,
            H: date_obj.H,
            A: date_obj.A,
            h: date_obj.h,
            m: date_obj.m,
            s: date_obj.s,
            S: date_obj.S,
            Z: date_obj.Z,
            _index: date_obj._index,
            _length: date_obj._length,
            _match: date_obj._match
        }
    }
    // console.log(".:MOMENT OBJECT:. :", moment_obj)

    var buffer = moment_pb.moment.encode(moment_obj);
    
    var moment_hash = sha256(JSON.stringify(moment_pb.moment.decode(buffer)));
    // console.log(" -> Moment hash: ", moment_hash)

    checkDir("files/moments/")
    fs.writeFileSync("files/moments/" + moment_hash, buffer);

    return moment_hash;
}


/** moment
 * [Moment Protocol Buffer Creation]
 * 
 * @param {string} datetime (required)
 * @param {string} format   (required)
 * 
 * @return {string} pioneer_buffer
 */
function pioneer(xbirthday, format = 'MM DD YYYY HH:mm:SSS [GMT]Z') {
    // CREATING PIONEER
    var user = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/user.proto'))
    
    var register = new Date()
    register = dt.format(register, dt.compile(format, true));

    var register_moment = moment(register, format, 0, 0, 0, 0, 0)

    var birthday = dt.parse(xbirthday, format, true);
    birthday = dt.format(birthday, format, true);

    var birthday_moment = moment(birthday, format, 0, 0, 0, 0, 0)

    // console.log("PIONEER REGISTER MOMENT: ", register_moment)
    // console.log("PIONEER BIRTHDAY MOMENT: ", birthday_moment)

    var pioneer_hash = sha256(register_moment + "_" + birthday_moment);

    var buffer = user.user.encode({
        birthday: "moments/"+birthday_moment,
        register: "moments/"+register_moment,
        invite: "users/"+pioneer_hash, // points to itself as inviting user in the chain
        tag: "users/"+pioneer_hash,
    })

    // Save as active user
    checkDir("files/users/")
    fs.writeFileSync("files/users/" + pioneer_hash, buffer);

    // Save pioneer to look for it later
    checkDir("files/pioneer/")
    fs.writeFileSync("files/pioneer/" + pioneer_hash, buffer);

    return pioneer_hash
}

module.exports = { moment, pioneer };