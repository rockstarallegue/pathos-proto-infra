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
 * @param {string} datetime (optional, default='01 01 1970 00:00:00 GMT-0800')
 * @param {string} format (optional, default='MM DD YYYY HH:mm:SSS [GMT]Z')
 * @param {float}  lat (optional, default=0)
 * @param {float}  lon (optional, default=0)
 * @param {float}  x (optional,  default=0)
 * @param {float}  y (optional, default=0)
 * @param {float}  z (optional, default=0)
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

module.exports = { moment };