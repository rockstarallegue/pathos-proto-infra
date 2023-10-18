# pathos-proto-infra
+ **NPM Module _Version_** - [![npm version](https://badge.fury.io/js/pathos-proto-infra.svg)](https://badge.fury.io/js/pathos-proto-infra)

---

## Pathos Protocol Buffer Infrastructure
Encoding and decoding standard for Pathos Protocol Buffer based data architecture


## Encoders
Recieve data to encode it within pathos file structure and returns the Protocol Buffer hash name

| Function                 | Parameters                              |
| ------------------------ | --------------------------------------- |
| makeMoment               | datetime, format, lat, lon, x, y, z     |
| makePioneer              | birthday, format                        |
| makeSecret               | author, format                          |
| makeEntity                 | birthday, secret, format                |
| makeNode                 | author, file, str, format               |
| makePath                 | author, name, head, parent, format      |
| makeTag                  | author, name, parent, format            |


## Decoders
Recieve hashes and returns useful data objects

| Function                 | Parameters                              |
| ------------------------ | --------------------------------------- |
| getMomentObj             | xmoment (moment hash)                   |
| getPioneerObj            | xpioneer (pioneer hash)                 |
| getSecretObj             | xsecret (secret hash)                   |
| getEntityObj               | xuser (user hash)                       |
| getNodeObj               | xnode (node hash)                       |
| getPathObj               | xpath (path hash)                       |
| getTagObj                | xtag (tag hash)                         |
| getTagObjFromKey         | xkey (key on the dictionary)            |


## Modifiers
Modify objects

| Function                 | Parameters                              | Description                                          |
| ------------------------ | --------------------------------------- | ---------------------------------------------------- |
| useSecret                | xsecret (secret hash)                   | Sets 'used' secret property to true if it is false.  |


## Dictionary
The dictionary is the human layer naming tags in order to get them by setting up a unique key

| Function                 | Parameters                              |
| ------------------------ | --------------------------------------- |
| makeTagKey               | author, key, xtag, format               |


## Publishing
When author is specified, the nodes, paths, keys and tags are stored in private directions.

| Function                 | Parameters                              |
| ------------------------ | --------------------------------------- |
| makePublic               | dir                                     |


## Usage
You can **make** (encode) and **get** (decode) protocol buffers easily with pathos's data structure in order to use them.

Importing pathos-proto-infra:
```javascript
const pathos = require("pathos-proto-infra");
```


### makeMoment(datetime, format, lat, lon, x, y, z)
Making a moment involves space and time parameters, but they are all optional because the default moment data is the current time information. If datetime is specified, format must be specified accordingly with `date-and-time` npm dependency standards.

Calling `makeMoment()`:
```javascript
const moment = pathos.makeMoment();
console.log("MOMENT BUFFER: ", moment)
```

Console log:
```
MOMENT BUFFER:  9e68a6f5c74b4f25a863117f95caadde1b2bde3fad550b0e616ee21ce2ba8d0a
```


### getMomentObj(xmoment)
Getting a moment object by it's hashname

Calling `getMomentObj()`:
```javascript
// Creating a moment
const moment = pathos.makeMoment();

const moment_obj = pathos.getMomentObj(moment);
console.log("MOMENT OBJECT: ", moment_obj)
```

Console log:
```
MOMENT OBJECT:  {
  coordinates: { lat: 0, lon: 0, xyz: { x: 0, y: 0, z: 0 } },
  datetime: {
    Y: 2023,
    M: 8,
    D: 5,
    H: 15,
    A: 0,
    h: 0,
    m: 22,
    s: 37,
    S: 0,
    Z: 360,
    _index: 29,
    _length: 29,
    _match: 7
  }
}
```


### getPioneerObj(xpioneer)
Getting a pioneer object by it's hashname

Calling `getPioneerObj()`:
```javascript
const pioneer_obj = pathos.getPioneerObj(pioneer);
console.log("PIONEER OBJECT: ", pioneer_obj);
```

Console log:
```
PIONEER OBJECT:  {
  birthday: 'moments/1ac234c81ee269e408d7a9e5a7a95492b60883ac53d24d9f11e0903c6ba5f7c6',
  register: 'moments/140ccd369a9d916fb339b09f5b98f84831412a3f520a71002bcb3a66678882a4',
  invite: 'entities/ffe125f1827ca16374ac5ea8d69defeee4b2ff8a9f8d640fa27c495881fe93b4',
  tag: 'entities/ffe125f1827ca16374ac5ea8d69defeee4b2ff8a9f8d640fa27c495881fe93b4'
}
```


### makeSecret(author, format)
Making a secret involves tracking the secret's author. Pioneer user is set by default if author is not provided. Pioneer is created automatically if it does not exist.

Calling `makeSecret()`:
```javascript
const secret = pathos.makeSecret();
console.log("SECRET BUFFER: ", secret)
```

Console log:
```
SECRET BUFFER:  574e8fee76ba4dc93c2f4cd79399aa01e6cfb19257e4eb305dcfaeb16649b7bf
```


### getSecretObj(xsecret)
Getting a secret object by it's hashname

Calling `getSecretObj()`:
```javascript
const secret_obj = pathos.getSecretObj(secret);
console.log("SECRET OBJECT: ", secret_obj);
```

Console log:
```
SECRET OBJECT:  {
  register: 'moments/638976edf4684e746f9bd013bd2e9145b1316ee42b40b0877185f6aeda960b8d',
  author: 'pioneer/ebd4ff7e4f69d1c4c2b529eb60a7ca72bb459c1458e1a011b26b6ea84901d143',
  used: false,
  tag: 'secrets/574e8fee76ba4dc93c2f4cd79399aa01e6cfb19257e4eb305dcfaeb16649b7bf'
}
```


### useSecret(xsecret)
Using a secret by setting its 'used' property to true if it is set to false.

Creating a secret, calling `useSecret(xsecret)` and printing used secret object:
```javascript
// Creating secret
const secret = pathos.makeSecret();
console.log("SECRET BUFFER: ", secret)

// Getting secret object and printing it
const secret_obj = pathos.getSecretObj(secret);
console.log("SECRET OBJECT: ", secret_obj)

// Using secret!
const used_secret = pathos.useSecret(secret)

// Getting secret object and printing it
const usecret_obj = pathos.getSecretObj(used_secret);
console.log("USED SECRET OBJECT: ", usecret_obj)
```

Console log:
```
SECRET BUFFER:  574e8fee76ba4dc93c2f4cd79399aa01e6cfb19257e4eb305dcfaeb16649b7bf
SECRET OBJECT:  {
  register: 'moments/638976edf4684e746f9bd013bd2e9145b1316ee42b40b0877185f6aeda960b8d',
  author: 'pioneer/ebd4ff7e4f69d1c4c2b529eb60a7ca72bb459c1458e1a011b26b6ea84901d143',
  used: false,
  tag: 'secrets/574e8fee76ba4dc93c2f4cd79399aa01e6cfb19257e4eb305dcfaeb16649b7bf'
}
USED SECRET OBJECT:  {
  register: 'moments/638976edf4684e746f9bd013bd2e9145b1316ee42b40b0877185f6aeda960b8d',
  author: 'pioneer/ebd4ff7e4f69d1c4c2b529eb60a7ca72bb459c1458e1a011b26b6ea84901d143',
  used: true,
  tag: 'secrets/574e8fee76ba4dc93c2f4cd79399aa01e6cfb19257e4eb305dcfaeb16649b7bf'
}
```


### makeEntity(secret, format)
Making an entity involves tracking the entities author by tracking the secret author. Pioneer user is created automatically if it does not exist. We use the entities given birthday as a bigbang moment.

Calling `makeEntity()`:
```javascript
const entity = pathos.makeEntity(secret);
console.log("ENTITY BUFFER: ", entity)
```

Console log:
```
ENTITY BUFFER:  bd97daa5b9d4490156bfa169c3b15a08b5d43bad0b2206575e4f6330fd5aca6f
```


### getEntityObj(xentity)
Getting an entity object by it's hashname

Calling `getEntityObj()`:
```javascript
const entity_obj = pathos.getEntityObj(entity);
console.log("ENTITY OBJECT: ", entity_obj);
```

Console log:
```
ENTITY OBJECT:  {
  birthday: 'moments/0d6c319d7c11b457b0163d84d7643352f855e1a34b7f4c24118a4e0178fc7431',
  register: 'moments/4063001a28bedc82e006585add2f88059c5daa1ef252177a6381e69ed1806108',
  invite: 'pioneer/ebd4ff7e4f69d1c4c2b529eb60a7ca72bb459c1458e1a011b26b6ea84901d143',
  tag: 'entitys/bd97daa5b9d4490156bfa169c3b15a08b5d43bad0b2206575e4f6330fd5aca6f'
}
```


### makeNode(author, file, str, format)
Making a node takes an author and content, that can be a file address or a string.

Calling `makeNode()`:
```javascript
const node = pathos.makeNode("pioneer/ebd4ff7e4f69d1c4c2b529eb60a7ca72bb459c1458e1a011b26b6ea84901d143", "izipizilemonsquizi");
console.log("NODE BUFFER: ", node)
```

Console log:
```
NODE BUFFER:  bd97daa5b9d4490156bfa169c3b15a08b5d43bad0b2206575e4f6330fd5aca6f
```

If the author is specified, the buffer includes the private direction
Console log of private node:
```
NODE BUFFER:  ebd4ff7e4f69d1c4c2b529eb60a7ca72bb459c1458e1a011b26b6ea84901d143/nodes/2359990a0e4b3a69c057aecefc7a2b288dd80752e635b1afbb83d4f4c1e6d686
```


### getNodeObj(xnode)
Getting a node object by it's hashname

Calling `getNodeObj()`:
```javascript
const node_obj = pathos.getNodeObj(node);
console.log("NODE OBJECT: ", node_obj)
```

Console log:
```
NODE OBJECT:  {
  register: 'moments/90e7b7a8fe8ff1d198ea2df3a05088550d19104af888073aa35237fb82e98163',
  author: 'pioneer/ebd4ff7e4f69d1c4c2b529eb60a7ca72bb459c1458e1a011b26b6ea84901d143',
  file: '',
  str: 'izipizilemonsquizi',
  tag: 'secrets/ab99e5cb55a5e32dd2d5385d6cddfb5e6a40845b29e3897a2b93db8d4ee730a9'
}
```


### makePath(author, name, head, parent, format)
To create a path, it is necessary to specify the author and the head of the node of the path. The name can be set, but if not, the hash is set as default name. If the path is a branch from another path, the parent path can be specified.

Calling `makePath()`:
```javascript
const path = pathos.makePath(entity, "elPath", node);
console.log("PATH BUFFER: ", path)
```

Console log:
```
PATH BUFFER:  paths/ad6ee3e45a3bfa450d7de201cd354f90a17651e06c1d4b8e9b2b76ae1330c735
```

If the author is specified, the buffer includes the private direction
Console log of private path:
```
PATH BUFFER:  ebd4ff7e4f69d1c4c2b529eb60a7ca72bb459c1458e1a011b26b6ea84901d143/paths/2359990a0e4b3a69c057aecefc7a2b288dd80752e635b1afbb83d4f4c1e6d686
```


### getPathObj(xpath)
Getting a path object by it's hashname

Calling `getPathObj()`:
```javascript
const path_obj = pathos.getPathObj(path);
console.log("PATH OBJECT: ", path_obj)
```

Console log:
```
PATH OBJECT:  {
  register: 'moments/091da3164800c5d08c2efc21abe948c14185d8841a1c82cf6f683dd7c2b5cd02',
  author: 'entities/1249bf6b7d2c33722325b4ec7213577b9d51338f8cbb0c3757583bf2254961d4',
  name: 'elPath',
  head: 'nodes/d7a45fa71467185773e687e279f8dc763748571a5ed0bd6abf08d0895a805a14',
  parent: 'paths/ad6ee3e45a3bfa450d7de201cd354f90a17651e06c1d4b8e9b2b76ae1330c735',
  tag: 'paths/ad6ee3e45a3bfa450d7de201cd354f90a17651e06c1d4b8e9b2b76ae1330c735'
}
```


### makeTag(author, name, head, parent, format)
To create a tag, it is necessary to specify the author and the name of the tag. If the tag is under another tag, the parent tag can be specified.

Calling `makeTag()`:
```javascript
const tag = pathos.makeTag(user, "word");
console.log("TAG BUFFER: ", tag)
```

Console log:
```
TAG BUFFER:  tags/86af49e57a415f956d3a9c99708848d0ea575864e790ed8e5e71bfc0e0fb5cd9
```

### makeTagKey(author, key, xtag, format)
Tag key are the dictionary keys that allow acessing tags from natural language ids. It puts a tag buffer in the dictionary inside a folder with the name of the specified key.

Calling `makeTagKey()`:
```javascript
const tag_key = pathos.makeTagKey(user, "word");
console.log("TAG KEY DIR: ", tag_key)
```

Console log:
```
TAG KEY DIR:  dictionary/word/86af49e57a415f956d3a9c99708848d0ea575864e790ed8e5e71bfc0e0fb5cd9
```


### getTagObj(xtag)
Getting a tag object by it's hashname

Calling `getTagObj()`:
```javascript
const tag_obj = tagos.getTagObj(tag);
console.log("PATH OBJECT: ", tag_obj)
```

Console log:
```
TAG OBJECT:  {
  register: 'moments/9858bb87923ae3e0eaab4479b47cbbf305ad70a8ce3afcd8465c28a7ef9f9e8f',
  author: 'entities/8799224e7192b3c0bf3b75ed211a50e90a23438eec8f718ae197c81a8f4fe001',
  name: 'word',
  parent: 'tags/86af49e57a415f956d3a9c99708848d0ea575864e790ed8e5e71bfc0e0fb5cd9',
  tag: 'tags/86af49e57a415f956d3a9c99708848d0ea575864e790ed8e5e71bfc0e0fb5cd9'
}
```

### getTagObjFromKey(xkey)
Getting a tag object by it's key name on the dictionary

Calling `getTagObjFromKey()`:
```javascript
const tag_obj = pathos.getTagObjFromKey(xey);
console.log("TAG OBJECT: ", tag_obj)
```

Console log:
```
TAG OBJECT:  {
  register: 'moments/9858bb87923ae3e0eaab4479b47cbbf305ad70a8ce3afcd8465c28a7ef9f9e8f',
  author: 'entities/8799224e7192b3c0bf3b75ed211a50e90a23438eec8f718ae197c81a8f4fe001',
  name: 'word',
  parent: 'tags/86af49e57a415f956d3a9c99708848d0ea575864e790ed8e5e71bfc0e0fb5cd9',
  tag: 'tags/86af49e57a415f956d3a9c99708848d0ea575864e790ed8e5e71bfc0e0fb5cd9'
}
```

### makePublic(dir)
The buffer on the specified directory is made public (it gets to live on the root directory)

Calling `makePublic()`:
```javascript
const dir = "46af49e57a415f956d3a9c99708848d0ea575864e790ed8e5e71bfc0e0fb5cd9/paths/ad6ee3e45a3bfa450d7de201cd354f90a17651e06c1d4b8e9b2b76ae1330c735";

const public_buffer = pathos.makePublic(dir);
console.log("PUBLIC ADDRESS: ", public_buffer)
```

Console log:
```
PUBLIC ADDRESS:  paths/ad6ee3e45a3bfa450d7de201cd354f90a17651e06c1d4b8e9b2b76ae1330c735
```
