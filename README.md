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


## Decoders
Recieve hashes and returns useful data objects

| Function                 | Parameters                              |
| ------------------------ | --------------------------------------- |
| getMomentObj             | xmoment (moment hash)                   |
| getPioneerObj            | xpioneer (pioneer hash)                 |
| getSecretObj             | xsecret (secret hash)                   |


## Modifiers
Modify objects

| Function                 | Parameters                              | Description                                          |
| ------------------------ | --------------------------------------- | ---------------------------------------------------- |
| useSecret                | xsecret (secret hash)                   | sets 'used' secret property to true if it is false.  |


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


## useSecret(xsecret)
Using a secret by setting its 'used' property to true if it is set to false.

Creating a secret, calling `useSecret(xsecret)` and printing used secret object:
```javascript
const secret = pathos.makeSecret();
console.log("SECRET BUFFER: ", secret)

const secret_obj = pathos.getSecretObj(secret);
console.log("SECRET OBJECT: ", secret_obj)

const used_secret = pathos.useSecret(secret)
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

