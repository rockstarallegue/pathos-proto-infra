var fs = require("fs");
var pb = require('protocol-buffers');

/** useSecret
 * [Function that changes a secret state to used]
 * 
 * @param {string} xsecret
 * 
 * @return {string} xsecret
 */
function useSecret(xsecret){
    // DECODING SECRET
    var secret_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/secret.proto'))

    // NOT FOUND EXCEPTION
    var secret_enc;
    try {
        secret_enc = fs.readFileSync("files/secrets/"+xsecret)
    } catch (err) {
        if (err.code === 'ENOENT') {
            return "Secret not found :(";
        } else {
            throw err;
        }
    }
    
    var secret_obj = secret_pb.secret.decode(secret_enc)

    if(secret_obj.used == false){
        // USING INVITE SECRET
        secret_obj.used = true
        fs.writeFileSync("files/secrets/" + xsecret, secret_pb.secret.encode(secret_obj));

        return xsecret;
    }
    return xsecret;
}


/** addPathNode
 * [Function that adds element at the front of a path]
 * 
 * @param {string} xpath
 * @param {string} xnode
 * 
 * @return {string} xpath
 */
function addPathNode(xpath, xnode){
    // "paths/hash" FORMAT EXCEPTION
    if(xpath.split("/").length > 1){ 
        xpath = xpath.split("/")[1]
    }

    // DECODING PATH
    var path_pb = pb(fs.readFileSync('node_modules/pathos-proto-infra/proto/path.proto'))

    // NOT FOUND EXCEPTION
    var path_enc;
    try {
        path_enc = fs.readFileSync("files/paths/"+xpath)
    } catch (err) {
        if (err.code === 'ENOENT') {
            return "Path not found :(";
        } else {
            throw err;
        }
    }

    // "node/hash" FORMAT EXCEPTION
    if(xnode.split("/").length > 1){ 
        xnode = xnode.split("/")[1]
    }
    
    var path_obj = path_pb.path.decode(path_enc)
   
    path_obj.chain = path_obj.chain+"-"+xnode;
    
    fs.writeFileSync("files/paths/" + xpath, path_pb.path.encode(path_obj));

    return xpath;
}
module.exports = { useSecret, addPathNode };