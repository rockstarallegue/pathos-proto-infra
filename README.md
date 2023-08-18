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
| makeUser                 | birthday, secret, format                |
| makeNode                 | author, file, str, format               |


## Decoders
Recieve hashes and returns useful data objects

| Function                 | Parameters                              |
| ------------------------ | --------------------------------------- |
| getMomentObj             | xmoment (moment hash)                   |
| getPioneerObj            | xpioneer (pioneer hash)                 |
| getSecretObj             | xsecret (secret hash)                   |
| getUserObj               | xuser (user hash)                       |
| getNodeObj               | xnode (node hash)                       |


## Modifiers
Modify objects

| Function                 | Parameters                              | Description                                          |
| ------------------------ | --------------------------------------- | ---------------------------------------------------- |
| useSecret                | xsecret (secret hash)                   | Sets 'used' secret property to true if it is false.  |


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
  invite: 'users/ffe125f1827ca16374ac5ea8d69defeee4b2ff8a9f8d640fa27c495881fe93b4',
  tag: 'users/ffe125f1827ca16374ac5ea8d69defeee4b2ff8a9f8d640fa27c495881fe93b4'
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


### makeUser(birthday, secret, format)
Making a user involves tracking the user's author by tracking the secret author. Pioneer user is created automatically if it does not exist. We use the user's given birthday as a bigbang moment.

Calling `makeUser()`:
```javascript
const user = pathos.makeUser('03 08 2001 05:23:04 GMT-0600', secret);
console.log("USER BUFFER: ", user)
```

Console log:
```
USER BUFFER:  bd97daa5b9d4490156bfa169c3b15a08b5d43bad0b2206575e4f6330fd5aca6f
```


### getUserObj(xuser)
Getting a user object by it's hashname

Calling `getUserObj()`:
```javascript
const user_obj = pathos.getUserObj(user);
console.log("USER OBJECT: ", user_obj);
```

Console log:
```
USER OBJECT:  {
  birthday: 'moments/0d6c319d7c11b457b0163d84d7643352f855e1a34b7f4c24118a4e0178fc7431',
  register: 'moments/4063001a28bedc82e006585add2f88059c5daa1ef252177a6381e69ed1806108',
  invite: 'pioneer/ebd4ff7e4f69d1c4c2b529eb60a7ca72bb459c1458e1a011b26b6ea84901d143',
  tag: 'users/bd97daa5b9d4490156bfa169c3b15a08b5d43bad0b2206575e4f6330fd5aca6f'
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

