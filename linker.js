var fs = require("fs");
var pb = require('protocol-buffers');
var dt = require('date-and-time');
const checker = require("./checker");
const maker = require("./maker");

/** TagNode
 * [Links a tag to a node]
 * 
 * @param {string} author (optional, default=pioneer_hash)
 * @param {string} xtag   (required)
 * @param {string} xnode  (required)
 * 
 * @return {string} tagnode name
 */
function TagNode(author = pioneer(), xtag="", xnode="", format = 'MM DD YYYY HH:mm:SSS [GMT]Z') {
    var tagnode_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/tagnode.proto'))
    var fileContents;

    // "tag/hash" FORMAT EXCEPTION
    if(xtag.split("/").length > 1){ 
        xtag = xtag.split("/")[1]
    }

    // TAG NOT FOUND EXCEPTION
    try {
        fileContents = fs.readFileSync("files/tags/"+xtag);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return -1;
        } else {
            throw err;
        }
    }

    // "node/hash" FORMAT EXCEPTION
    if(xnode.split("/").length > 1){ 
        xnode = xnode.split("/")[1]
    }

    // NODE NOT FOUND EXCEPTION
    try {
        fileContents = fs.readFileSync("files/nodes/"+xnode);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return -1;
        } else {
            throw err;
        }
    }

    // CREATING LINK
    var register = new Date()
    register = dt.format(register, dt.compile(format, true));

    var register_moment = maker.moment(register, format, 0, 0, 0, 0, 0)
    
    
    var buffer = tagnode_pb.tagnode.encode({
        register: "moments/"+register_moment,
        author: author,
        xtag: xtag,
        xnode: xnode,
        tag: "tagnodes/"+xtag+"-"+xnode,
    })

    checker.checkDir("files/tagnodes/") // checking
    fs.writeFileSync("files/tagnodes/" + xtag +"-"+ xnode, buffer);
    
    return "tagnodes/" + xtag +"-"+ xnode;
}


/** TagPath
 * [Links a tag to a path]
 * 
 * @param {string} author (optional, default=pioneer_hash)
 * @param {string} xtag   (required)
 * @param {string} xpath  (required)
 * 
 * @return {string} tagpath name
 */
function TagPath(author = pioneer(), xtag="", xpath="", format = 'MM DD YYYY HH:mm:SSS [GMT]Z') {
    var tagpath_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/tagpath.proto'))
    var fileContents;

    // "tag/hash" FORMAT EXCEPTION
    if(xtag.split("/").length > 1){ 
        xtag = xtag.split("/")[1]
    }

    // TAG NOT FOUND EXCEPTION
    try {
        fileContents = fs.readFileSync("files/tags/"+xtag);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return -1;
        } else {
            throw err;
        }
    }

    // "path/hash" FORMAT EXCEPTION
    if(xpath.split("/").length > 1){ 
        xpath = xpath.split("/")[1]
    }

    // NODE NOT FOUND EXCEPTION
    try {
        fileContents = fs.readFileSync("files/paths/"+xpath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return -1;
        } else {
            throw err;
        }
    }

    // CREATING LINK
    var register = new Date()
    register = dt.format(register, dt.compile(format, true));

    var register_moment = maker.moment(register, format, 0, 0, 0, 0, 0)
    
    
    var buffer = tagpath_pb.tagpath.encode({
        register: "moments/"+register_moment,
        author: author,
        xtag: xtag,
        xpath: xpath,
        tag: "tagpaths/"+xtag+"-"+xpath,
    })

    checker.checkDir("files/tagpaths/") // checking
    fs.writeFileSync("files/tagpaths/" + xtag +"-"+ xpath, buffer);
    
    return "tagpaths/" + xtag +"-"+ xpath;
}
module.exports = { TagNode, TagPath }