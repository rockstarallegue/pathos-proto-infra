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
    checker.checkDir("files/entities/")
    if(checker.checkEmptyDir("files/entities/")){
        // CREATING PIONEER
        var entity = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/entity.proto'))
        
        var register = new Date()
        register = dt.format(register, dt.compile(format, true));

        var register_moment_hash = moment(register, format, 0, 0, 0, 0, 0)

        var birthday = dt.parse(xbigbang, format, true);
        birthday = dt.format(birthday, format, true);

        var birthday_moment = moment(birthday, format, 0, 0, 0, 0, 0)

        // console.log("PIONEER REGISTER MOMENT: ", register_moment_hash)
        // console.log("PIONEER BIRTHDAY MOMENT: ", birthday_moment)

        var pioneer_hash = sha256(register_moment_hash + "_" + birthday_moment);

        var buffer = entity.entity.encode({
            birthday: "moments/"+birthday_moment,
            register: "moments/"+register_moment_hash,
            invite: "entities/"+pioneer_hash, // points to itself as inviting entity in the chain
            tag: "entities/"+pioneer_hash,
        })

        // Save as active entity
        checker.checkDir("files/entities/")
        fs.writeFileSync("files/entities/" + pioneer_hash, buffer);

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
function secret(author = "pioneer/"+pioneer(), format = 'MM DD YYYY HH:mm:SSS [GMT]Z') {
    var secret_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/secret.proto'))

    var register = new Date()
    register = dt.format(register, dt.compile(format, true));

    var register_moment_hash = moment(register, format, 0, 0, 0, 0, 0)
    
    // console.log("SECRET AUTHOR: ", author);
    // console.log("SECRET REGISTER MOMENT: ", register_moment_hash);

    var secret_hash = sha256(register_moment_hash + "_" + author);
    var author_folder = author.split("/")[1];
    
    var buffer = secret_pb.secret.encode({
        register: "moments/"+register_moment_hash,
        author: author,
        used: false,
        tag: "secrets/"+secret_hash,
    })

    checker.checkDir("files/secrets/") // checking
    checker.checkDir("files/"+ author_folder +"/secrets/") // checking

    fs.writeFileSync("files/secrets/" + secret_hash, buffer);
    fs.writeFileSync("files/"+ author_folder +"/secrets/" + secret_hash, buffer);
    
    return "secrets/"+secret_hash;
}

/** entity
 * [entity Protocol Buffer Creation]
 * 
 * @param {string} author (optional, default=pioneer_hash)
 * @param {string} format   (required)
 * 
 * @return {string} secret_hash
 */
function entity(xsecret, format = 'MM DD YYYY HH:mm:SSS [GMT]Z') {
    // "secret/hash" FORMAT EXCEPTION
    /*if(xsecret.split("/").length > 1){ 
        xsecret = xsecret.split("/")[1]
    }*/

    checker.checkDir("files/entities/");
    if(checker.checkEmptyDir("files/entities/")){
        return "You need a pioneer's secret to create the first entity. There was no pioneer, but don't worry, now there is one at 'files/pioneer/'"+pioneer();
    }
    else{
        if(!checker.isSecretUsed(xsecret)){
            // CREATING entity
            var entity = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/entity.proto'))
            
            var register = new Date()
            register = dt.format(register, dt.compile(format, true));

            var register_moment_hash = moment(register, format, 0, 0, 0, 0, 0)
            var inviting_entity_hash = getter.getSecretObj(xsecret).author;
            // console.log("-> INVITING ENTITY HASH: ", inviting_entity_hash);

            var entity_hash = sha256(register_moment_hash + "_" + inviting_entity_hash);


            var buffer = entity.entity.encode({
                register: "moments/"+register_moment_hash,
                invite: inviting_entity_hash,
                tag: "entities/"+entity_hash,
            })

            checker.checkDir("files/entities/") // checking
            fs.writeFileSync("files/entities/" + entity_hash, buffer);

            return "entities/"+entity_hash
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
function node(author = pioneer(), file, text, url, format = 'MM DD YYYY HH:mm:SSS [GMT]Z') {
    var node_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/node.proto'))

    var register = new Date()
    register = dt.format(register, dt.compile(format, true));

    var register_moment_hash = moment(register, format, 0, 0, 0, 0, 0)
    
    var node_hash = sha256(register_moment_hash + "_" + author);
    var author_folder = author.split("/")[1];
    
    var buffer = node_pb.node.encode({
        register: "moments/"+register_moment_hash,
        author: author,
        file: file,
        text: text,
        url: url,
        tag: "nodes/"+node_hash,
    })

    checker.checkDir("files/" + author_folder + "/nodes/") // checking
    fs.writeFileSync("files/" + author_folder + "/nodes/" + node_hash, buffer);
    
    return author_folder + "/nodes/" + node_hash;
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

    var register_moment_hash = moment(register, format, 0, 0, 0, 0, 0)

    var path_hash = sha256(register_moment_hash + "_" + author);
    var author_folder = author.split("/")[1];
    
    if(name == ""){ name = path_hash; }
    if(head == ""){ return "Head node is required to create a path!" }
    if(parent == ""){ parent = "paths/"+path_hash; }

    var buffer = path_pb.path.encode({
        register: "moments/"+register_moment_hash,
        author: author,
        name: name,
        head: head,
        parent: parent,
        chain: head.split("/")[1],
        tag: "paths/"+path_hash,
    })

    checker.checkDir("files/" + author_folder + "/paths/") // checking
    fs.writeFileSync("files/" + author_folder + "/paths/" + path_hash, buffer);
    
    return author_folder + "/paths/" + path_hash;
}


/** tag
 * [Pioneer Protocol Buffer Creation]
 * 
 * @param {string} author (optional, default=pioneer_hash)
 * @param {string} name   (required)
 * @param {string} parent (optional, default=tag_hash)
 * @param {string} format (required)
 * 
 * @return {string} tag_hash
 */
function tag(author = pioneer(), name="", parent="", format = 'MM DD YYYY HH:mm:SSS [GMT]Z') {
    var tag_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/tag.proto'))

    var register = new Date()
    register = dt.format(register, dt.compile(format, true));

    var register_moment_hash = moment(register, format, 0, 0, 0, 0, 0)

    var tag_hash = sha256(register_moment_hash + "_" + author);
    var author_folder = author.split("/")[1];

    if(name == ""){ return "The tag has to have name!" }
    if(parent == ""){ parent = "tags/"+tag_hash; }
    
    var buffer = tag_pb.tag.encode({
        register: "moments/"+register_moment_hash,
        author: author,
        name: name,
        parent: parent,
        tag: "tags/"+tag_hash,
    })

    checker.checkDir("files/" + author_folder + "/tags/") // checking
    fs.writeFileSync("files/" + author_folder + "/tags/" + tag_hash, buffer);
    
    return author_folder + "/tags/" + tag_hash;
}

/** tag
 * [Pioneer Protocol Buffer Creation]
 * 
 * @param {string} author (optional, default=pioneer_hash)
 * @param {string} key   (required)
 * @param {string} xtag   (required)
 * @param {string} format (required)
 * 
 * @return {string} tag_hash
 */
function tagKey(author = pioneer(), key="", xtag, format = 'MM DD YYYY HH:mm:SSS [GMT]Z') {

    var author_folder = author.split("/")[1];

    // NOT FOUND EXCEPTION
    var fileContents;
    try {
        fileContents = fs.readFileSync("files/"+xtag);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return -1;
        } else {
            throw err;
        }
    }

    checker.checkDir("files/" + author_folder + "/dictionary/") // checking
    fs.writeFileSync("files/" + author_folder + "/dictionary/" + key, fileContents);
    
    return author_folder + "/dictionary/" + key;
}

/** public
 * [Make file public]
 * 
 * @param {string} xdir (dir)
 * 
 * @return {string} node_hash
 */
function public(xdir) {
    
    var splitted_dir = xdir.split("/");
    
    // NOT FOUND EXCEPTION
    var fileContents;
    try {
        fileContents = fs.readFileSync("files/" + xdir);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return xdir+" Not found :c";
        } else {
            throw err;
        }
    }

    var dir = splitted_dir[splitted_dir.length - 2] + "/";
    checker.checkDir("files/" + dir + "/") // checking
    fs.writeFileSync("files/" + dir + splitted_dir[splitted_dir.length - 1], fileContents);
    
    return dir + splitted_dir[splitted_dir.length - 1];
    
}

module.exports = { moment, pioneer, secret, entity, node, path, tag, tagKey, public };