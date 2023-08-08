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

module.exports = { useSecret };