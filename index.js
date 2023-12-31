const maker = require("./maker");
const getter = require("./getter");
const updater = require("./updater");
const linker = require("./linker");

///////////////
///  HELLO  ///
///////////////

/** hello
 * [Function that greets someone who is calling the function]
 * 
 * @param {string} name (optional, default="nameless entity")
 * 
 * @return {string} result
 */
exports.hello = (name = "nameless entity") => {
    var result = "Hello from the Dream Operator's Garage, " + name;
    return result;
}

////////////////
///  MOMENT  ///
////////////////

/** makeMoment
 * [Moment maker]
 * 
 * @param {string} datetime (optional, default=*current datetime*)
 * @param {string} format   (optional, default="ddd MMM DD YYYY HH:mm:ss [GMT]Z")
 * @param {float}  lat      (optional, default=0)
 * @param {float}  lon      (optional, default=0)
 * @param {float}  x        (optional, default=0)
 * @param {float}  y        (optional, default=0)
 * @param {float}  z        (optional, default=0)
 * 
 * @return {string} moment_buffer
 */
exports.makeMoment = (datetime = getter.getCurrentDate(), format = 'MM DD YYYY HH:mm:SSS [GMT]Z', lat = 0, lon = 0, x = 0, y = 0, z = 0) => {
    const moment_buffer = maker.moment(datetime, format, lat, lon, x, y, z)
    return moment_buffer
}

/** getMomentObj
 * [Function that recieves a moment hash and returns the moment object]
 * 
 * @param {string} xmoment (required)
 * 
 * @return {obj} moment_object
 */
exports.getMomentObj = (xmoment) => {
    const moment_object = getter.getMomentObj(xmoment);
    return moment_object;
}

/////////////////
///  PIONEER  ///
/////////////////

/** makePioneer
 * [Pioneer maker]
 * 
 * @return {string} entity_buffer
 */
exports.makePioneer = (datetime = getter.getCurrentDate(), format = 'MM DD YYYY HH:mm:SSS [GMT]Z') => {
    const pioneer_buffer = maker.pioneer(datetime, format)
    return pioneer_buffer
}

/** getPioneerObj
 * [Function that recieves a moment hash and returns the moment object]
 * 
 * @param {string} xpioneer (required)
 * 
 * @return {obj} pioneer_object (entity object)
 */
exports.getPioneerObj = (xpioneer = this.makePioneer()) => {
    const pioneer_object = getter.getPioneerObj(xpioneer);
    return pioneer_object;
}

////////////////
///  SECRET  ///
////////////////

/** makeSecret
 * [Secret maker]
 * 
 * @return {string} secret_buffer
 */
exports.makeSecret = (author = "pioneer/"+maker.pioneer(), format = 'MM DD YYYY HH:mm:SSS [GMT]Z') => {
    const secret_buffer = maker.secret(author, format)
    return secret_buffer
}

/** useSecret
 * [Secret using]
 * 
 * @return {string} secret_buffer
 */
exports.useSecret = (xsecret) => {
    const secret_buffer = updater.useSecret(xsecret)
    return secret_buffer
}

/** getSecretObj
 * [Function that recieves a moment hash and returns the moment object]
 * 
 * @param {string} xsecret (required)
 * 
 * @return {obj} secret_object (entity object)
 */
exports.getSecretObj = (xsecret) => {
    const secret_object = getter.getSecretObj(xsecret);
    return secret_object;
}

////////////////
///  ENTITY  ///
////////////////

/** makeEntity
 * [Entity maker]
 * 
 * @return {string} entity_buffer
 */
exports.makeEntity = (xsecret, format = 'MM DD YYYY HH:mm:SSS [GMT]Z') => {
    const entity_buffer = maker.entity(xsecret, format)
    return entity_buffer
}

/** getEntityObj
 * [Function that recieves a moment hash and returns the moment object]
 * 
 * @param {string} xentity (required)
 * 
 * @return {obj} entity_object (entity object)
 */
exports.getEntityObj = (xentity) => {
    const entity_object = getter.getEntityObj(xentity);
    return entity_object;
}

//////////////
///  NODE  ///
//////////////

/** makeNode
 * [Node maker]
 * 
 * @return {string} node_buffer
 */
exports.makeNode = (author = "pioneer/"+maker.pioneer(), file, text, url, format = 'MM DD YYYY HH:mm:SSS [GMT]Z') => {
    const node_buffer = maker.node(author, file, text, url, format)
    return node_buffer
}

/** getNodeObj
 * [Function that recieves a moment hash and returns the moment object]
 * 
 * @param {string} xnode (required)
 * 
 * @return {obj} node_object (entity object)
 */
exports.getNodeObj = (xnode) => {
    const node_object = getter.getNodeObj(xnode);
    return node_object;
}

//////////////
///  PATH  ///
//////////////

/** makePath
 * [Path maker]
 * 
 * @return {string} path_buffer
 */
exports.makePath = (author = "pioneer/"+maker.pioneer(), name, head, parent, format = 'MM DD YYYY HH:mm:SSS [GMT]Z') => {
    const path_buffer = maker.path(author, name, head, parent, format)
    return path_buffer
}

/** getPathObj
 * [Function that recieves a moment hash and returns the moment object]
 * 
 * @param {string} xpath (required)
 * 
 * @return {obj} path_object (entity object)
 */
exports.getPathObj = (xpath) => {
    const path_object = getter.getPathObj(xpath);
    return path_object;
}

/** addPathNode
 * [Adding node to path node chain]
 * 
 * @return {string} path_buffer
 */
exports.addPathNode = (xpath, xnode) => {
    const path_buffer = updater.addPathNode(xpath, xnode)
    return path_buffer
}

////////////////////
///  PUBLISHING  ///
////////////////////

/** makePublic
 * [Publishing from private dir]
 * 
 * @return {string} public dir
 */
exports.makePublic = (xdir) => {
    const public_buffer = maker.public(xdir)
    return public_buffer
}

/////////////
///  TAG  ///
/////////////

/** makeTag
 * [Tag maker]
 * 
 * @return {string} tag_buffer
 */
exports.makeTag = (author = "pioneer/"+maker.pioneer(), name, parent, format = 'MM DD YYYY HH:mm:SSS [GMT]Z') => {
    const tag_buffer = maker.tag(author, name, parent, format)
    return tag_buffer
}

/** getTagObj
 * [Function that recieves a moment hash and returns the moment object]
 * 
 * @param {string} xtag (required)
 * 
 * @return {obj} tag_object (entity object)
 */
exports.getTagObj = (xtag) => {
    const tag_object = getter.getTagObj(xtag);
    return tag_object;
}

////////////////
///  TAG KEY ///
////////////////

/** makeTag
 * [Tag maker]
 * 
 * @return {string} tag_buffer
 */
exports.makeTagKey = (author = "pioneer/"+maker.pioneer(), key, xtag, format = 'MM DD YYYY HH:mm:SSS [GMT]Z') => {
    const tag_key = maker.tagKey(author, key, xtag, format)
    return tag_key;
}

/** getTagFromKey
 * [Function that recieves a key and returns the tag object belonging to the key on the dictionary]
 * 
 * @param {string} xkey (required)
 * 
 * @return {obj} tag_object (entity object)
 */
exports.getTagObjFromKey = (xkey) => {
    const tag_object = getter.getTagObjFromKey(xkey);
    return tag_object;
}

/** linkTagToNode
 * [Tag-to-Node link maker]
 * 
 * @return {string} tagnode_buffer
 */
exports.linkTagToNode = (author = "pioneer/"+maker.pioneer(), xtag, xnode) => {
    const tag_buffer = linker.TagNode(author, xtag, xnode)
    return tag_buffer
}

/** linkTagToPath
 * [Tag-to-Path link maker]
 * 
 * @return {string} tagpath_buffer
 */
exports.linkTagToPath = (author = "pioneer/"+maker.pioneer(), xtag, xpath) => {
    const tag_buffer = linker.TagPath(author, xtag, xpath)
    return tag_buffer
}