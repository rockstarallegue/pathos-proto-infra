var fs = require("fs");
var pb = require('protocol-buffers');
var dt = require('date-and-time');
var sha256 = require("js-sha256");
const getter = require("./getter");
const checker = require("./checker");


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

    checker.checkDir("files/moments/")
    fs.writeFileSync("files/moments/" + moment_hash, buffer);

    return moment_hash;
}


/** pioneer
 * [Pioneer Protocol Buffer Creation]
 * 
 * @param {string} datetime (required)
 * @param {string} format   (required)
 * 
 * @return {string} pioneer_buffer
 */
function pioneer(xbigbang = getter.getCurrentDate(), format = 'MM DD YYYY HH:mm:SSS [GMT]Z') {
    checker.checkDir("files/users/")
    if(checker.checkEmptyDir("files/users/")){
        // CREATING PIONEER
        var user = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/user.proto'))
        
        var register = new Date()
        register = dt.format(register, dt.compile(format, true));

        var register_moment = moment(register, format, 0, 0, 0, 0, 0)

        var birthday = dt.parse(xbigbang, format, true);
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
        checker.checkDir("files/users/")
        fs.writeFileSync("files/users/" + pioneer_hash, buffer);

        // Save pioneer to look for it later
        checker.checkDir("files/pioneer/")
        fs.writeFileSync("files/pioneer/" + pioneer_hash, buffer);

        return pioneer_hash
    }
    else{
        return checker.checkFiles('files/pioneer/')[0];
    }

    return "Pioneer has failed:(";
}

/** secret
 * [Pioneer Protocol Buffer Creation]
 * 
 * @param {string} author (optional, default=pioneer_hash)
 * @param {string} format   (required)
 * 
 * @return {string} secret_hash
 */
function secret(author = pioneer(), format = 'MM DD YYYY HH:mm:SSS [GMT]Z') {
    var secret_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/secret.proto'))

    var register = new Date()
    register = dt.format(register, dt.compile(format, true));

    var register_moment = moment(register, format, 0, 0, 0, 0, 0)
    
    // console.log("SECRET AUTHOR: ", author);
    // console.log("SECRET REGISTER MOMENT: ", register_moment);

    var secret_hash = sha256(register_moment + "_" + author);
    
    var buffer = secret_pb.secret.encode({
        register: "moments/"+register_moment,
        author: author,
        used: false,
        tag: "secrets/"+secret_hash,
    })

    checker.checkDir("files/secrets/") // checking
    fs.writeFileSync("files/secrets/" + secret_hash, buffer);
    
    return "secrets/"+secret_hash;
}

/** user
 * [User Protocol Buffer Creation]
 * 
 * @param {string} author (optional, default=pioneer_hash)
 * @param {string} format   (required)
 * 
 * @return {string} secret_hash
 */
function user(xbirthday, xsecret, format = 'MM DD YYYY HH:mm:SSS [GMT]Z') {
    // "secret/hash" FORMAT EXCEPTION
    if(xsecret.split("/").length > 1){ 
        xsecret = xsecret.split("/")[1]
    }

    checker.checkDir("files/users/");
    if(checker.checkEmptyDir("files/users/")){
        return "You need a pioneer's secret to create the first user. There was no pioneer, but don't worry, now there is one at 'files/pioneer/'"+pioneer();
    }
    else{
        if(!checker.isSecretUsed(xsecret)){
            // CREATING USER
            console.log("Creating user...")
            var user = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/user.proto'))
            
            var register = new Date()
            register = dt.format(register, dt.compile(format, true));

            var register_moment = moment(register, format, 0, 0, 0, 0, 0)

            var birthday = dt.parse(xbirthday, format, true);
            birthday = dt.format(birthday, format, true);

            var birthday_moment = moment(birthday, format, 0, 0, 0, 0, 0)
            var user_hash = sha256(register_moment + "_" + birthday_moment);

            var invite_user_hash = getter.getSecretObj(xsecret).author;

            var buffer = user.user.encode({
                birthday: "moments/"+birthday_moment,
                register: "moments/"+register_moment,
                invite: invite_user_hash,
                tag: "users/"+user_hash,
            })

            checker.checkDir("files/users/") // checking
            fs.writeFileSync("files/users/" + user_hash, buffer);

            return "users/"+user_hash
        }
        else{
            return "Secret has been already used!"
        }
    }
}

/** node
 * [Node Protocol Buffer Creation]
 * 
 * @param {string} author (optional, default=pioneer_hash)
 * @param {string} file   (optional)
 * @param {string} str    (optional)
 * @param {string} format (required)
 * 
 * @return {string} node_hash
 */
function node(author = pioneer(), content, format = 'MM DD YYYY HH:mm:SSS [GMT]Z') {
    var node_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/node.proto'))

    var register = new Date()
    register = dt.format(register, dt.compile(format, true));

    var register_moment = moment(register, format, 0, 0, 0, 0, 0)
    
    var node_hash = sha256(register_moment + "_" + author);
    
    // FILE
    if(content.split("/").length > 1){ // REPLACE FOR COMPLEX FILE LOCATION IDENTIFIER
        var buffer = node_pb.node.encode({
            register: "moments/"+register_moment,
            author: author,
            file: content,
            tag: "nodes/"+node_hash,
        })
    }
    else{
        var buffer = node_pb.node.encode({
            register: "moments/"+register_moment,
            author: author,
            str: content,
            tag: "nodes/"+node_hash,
        })
    }

    checker.checkDir("files/nodes/") // checking
    fs.writeFileSync("files/nodes/" + node_hash, buffer);
    
    return "nodes/"+node_hash;
}


/** path
 * [Pioneer Protocol Buffer Creation]
 * 
 * @param {string} author (optional, default=pioneer_hash)
 * @param {string} name   (optional, default=path_hash)
 * @param {string} head   (required)
 * @param {string} parent (optional, default=path_hash)
 * @param {string} format (required)
 * 
 * @return {string} path_hash
 */
function path(author = pioneer(), name="", head="", parent="", format = 'MM DD YYYY HH:mm:SSS [GMT]Z') {
    var path_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/path.proto'))

    var register = new Date()
    register = dt.format(register, dt.compile(format, true));

    var register_moment = moment(register, format, 0, 0, 0, 0, 0)

    var path_hash = sha256(register_moment + "_" + author);
    
    if(name == ""){ name = path_hash; }
    if(head == ""){ return "Head node is required to create a path!" }
    if(parent == ""){ parent = "paths/"+path_hash; }

    var buffer = path_pb.path.encode({
        register: "moments/"+register_moment,
        author: author,
        name: name,
        head: head,
        parent: parent,
        tag: "paths/"+path_hash,
    })

    checker.checkDir("files/paths/") // checking
    fs.writeFileSync("files/paths/" + path_hash, buffer);
    
    return "paths/"+path_hash;
}

module.exports = { moment, pioneer, secret, user, node, path };