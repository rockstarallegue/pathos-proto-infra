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
            return -1;
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
    var pioneer_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/entity.proto'))
    
    // NOT FOUND EXCEPTION
    var fileContents;
    try {
        fileContents = fs.readFileSync("files/pioneer/"+xpioneer);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return -1;
        } else {
            throw err;
        }
    }


    // DECODING PIONEER
    var pioneer_enc = fileContents
    var pioneer_obj = pioneer_pb.entity.decode(pioneer_enc)

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
    /*if(xsecret.split("/").length > 1){ 
        xsecret = xsecret.split("/")[xsecret.length -1]
    }*/

    // LOADING PB
    var secret_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/secret.proto'))
    
    // NOT FOUND EXCEPTION
    var fileContents;
    try {
        fileContents = fs.readFileSync("files/"+xsecret);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return -1;
        } else {
            throw err;
        }
    }

    // DECODING SECRET
    var secret_enc = fileContents
    var secret_obj = secret_pb.secret.decode(secret_enc)

    return secret_obj;
}

/** getEntityObj
 * [Function that recieves a entity hash and returns the entity object]
 * 
 * @param {string} xentity (required)
 * 
 * @return void
 */
function getEntityObj(xentity) {
    // "entity/hash" FORMAT EXCEPTION
    /*if(xentity.split("/").length > 1){ 
        xentity = xentity.split("/")[xentity.length -1]
    }*/

    // LOADING PB
    var entity_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/entity.proto'))
    
    // NOT FOUND EXCEPTION
    var fileContents;
    try {
        fileContents = fs.readFileSync("files/"+xentity);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return -1;
        } else {
            throw err;
        }
    }

    // DECODING ENTITY
    var entity_enc = fileContents
    var entity_obj = entity_pb.entity.decode(entity_enc)

    return entity_obj;
}

/** getNodeObj
 * [Function that recieves a node hash and returns the node object]
 * 
 * @param {string} xnode (required)
 * 
 * @return void
 */
function getNodeObj(xnode) {
    // "node/hash" FORMAT EXCEPTION
    /*if(xnode.split("/").length > 1){ 
        xnode = xnode.split("/")[xnode.length -1]
    }*/

    // LOADING PB
    var node_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/node.proto'))
    
    // NOT FOUND EXCEPTION
    var fileContents;
    try {
        fileContents = fs.readFileSync("files/"+xnode);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return -1;
        } else {
            throw err;
        }
    }

    // DECODING NODE
    var node_enc = fileContents
    var node_obj = node_pb.node.decode(node_enc)

    return node_obj;
}


/** getPathObj
 * [Function that recieves a path hash and returns the path object]
 * 
 * @param {string} xpath (required)
 * 
 * @return void
 */
function getPathObj(xpath) {
    // "path/hash" FORMAT EXCEPTION
    /*var splitted_xpath = xpath.split("/");
    if(splitted_xpath.length > 1){ 
        xpath = splitted_xpath[splitted_xpath.length -1]
    }*/

    // LOADING PB
    var path_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/path.proto'))
    
    // NOT FOUND EXCEPTION
    var fileContents;
    try {
        fileContents = fs.readFileSync("files/"+xpath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return -1;
        } else {
            throw err;
        }
    }

    // DECODING PATH
    var path_enc = fileContents
    var path_obj = path_pb.path.decode(path_enc)

    return path_obj;
}

/** getTagObj
 * [Function that recieves a tag hash and returns the tag object]
 * 
 * @param {string} xtag (required)
 * 
 * @return void
 */
function getTagObj(xtag) {
    // "tag/hash" FORMAT EXCEPTION
    /*if(xtag.split("/").length > 1){ 
        xtag = xtag.split("/")[xtag.length -1]
    }*/

    // LOADING PB
    var tag_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/tag.proto'))
    
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

    // DECODING TAG
    var tag_enc = fileContents
    var tag_obj = tag_pb.tag.decode(tag_enc)

    return tag_obj;
}

/** getTagObjFromKey
 * [Function that recieves a tag hash and returns the tag object]
 * 
 * @param {string} xkey (required)
 * 
 * @return void
 */
function getTagObjFromKey(xkey) {
    // "tag/hash" FORMAT EXCEPTION
    /*if(xtag.split("/").length > 1){ 
        xtag = xtag.split("/")[xtag.length -1]
    }*/

    // LOADING PB
    var tag_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/tag.proto'))
    
    // NOT FOUND EXCEPTION
    var fileContents;
    try {
        fileContents = fs.readFileSync("files/dictionary/"+xkey);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return -1;
        } else {
            throw err;
        }
    }

    // DECODING TAG
    var tag_enc = fileContents
    var tag_obj = tag_pb.tag.decode(tag_enc)

    return tag_obj;
}

module.exports = { getCurrentDate, getMomentObj, getPioneerObj, getSecretObj, getEntityObj, getNodeObj, getPathObj, getTagObj, getTagObjFromKey };