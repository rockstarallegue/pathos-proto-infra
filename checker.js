var fs = require("fs");
var emptyDir = require('empty-dir');

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

// CHECKING THE SECRET CHECKS THE SECRET

module.exports = { checkDir, checkFiles, checkEmptyDir };
                                                                         