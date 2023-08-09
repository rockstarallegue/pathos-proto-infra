var fs = require("fs");
var emptyDir = require('empty-dir');
var pb = require('protocol-buffers');

// "./files/users"

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

/** checkFiles
 * [Function that returns files in directory]
 * 
 * @param {string} dir (required)
 * 
 * @return void
 */
function checkFiles(dir){
    var files = fs.readdirSync(dir);
    return files;
}

/** checkEmptyDir
 * [Function that returns TRUE if dir is empty, FALSE if not]
 * 
 * @param {string} dir (required)
 * 
 * @return {bool}  empty_dir
 */
function checkEmptyDir(dir) {
    var empty_dir = emptyDir.sync(dir);
    return empty_dir
}

/** isSecretUsed
 * [Function that returns TRUE if secret has been used, FALSE if not]
 * 
 * @param {string} xsecret (required)
 * 
 * @return {bool}  used_secret
 */
function isSecretUsed(xsecret) {
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
        return false
    }
    return true;
}

// CHECKING THE SECRET CHECKS THE SECRET

module.exports = { checkDir, checkFiles, checkEmptyDir, isSecretUsed };
                                                                         