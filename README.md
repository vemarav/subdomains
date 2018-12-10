# subdomains

[![subdomains](https://img.shields.io/badge/dynamic/json.svg?label=subdomains&url=https%3A%2F%2Fraw.githubusercontent.com%2Fvemarav%2Fsubdomains%2Fmaster%2Fpackage.json&query=version&colorB=0275D8&prefix=v)](https://www.npmjs.com/package/subdomains/v/latest)
[![downloads](https://img.shields.io/npm/dt/subdomains.svg)](https://npmjs.com/package/subdomains/v/latest)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/npm)
[![codecov](https://codecov.io/gh/vemarav/subdomains/branch/master/graph/badge.svg)](https://codecov.io/gh/vemarav/subdomains)
[![Build Status](https://travis-ci.com/vemarav/subdomains.svg?branch=master)](https://travis-ci.com/vemarav/subdomains)

This plugin supprots only [Hapi](https://hapijs.com)

**subdomains** plugin adds subdomains & subdomain properties to request object

## Usage

```js
// file: server.js
const subdomains = require("subdomains");

server.register({
  plugin: subdomains,
  options: {
    // provide domain name for better results
    domainName: "yourdomain.co.in",
    // provide subdomains to exclude
    // or an empty array
    exclude: ["www", "api"]
  }
});
```

## Example

http://users.kiprosh.trackive.com

```js
// file server.js

"use strict";
const subdomains = require("subdomains");
const Hapi = require("hapi");

// Create a server with a host and port
const server = Hapi.server({
  host: "localhost",
  port: 8000
});

// Add the route
server.route({
  method: "GET",
  path: "/",
  handler: (request, reply) => {
    console.log(request.subdomains); // ['users', 'kiprosh']
    console.log(request.subdomain); // 'users'
    return "Home";
  }
});

server.register({
  plugin: subdomains,
  options: {
    // provide domain name for better results
    domainName: "trackive.com",
    // provide subdomains to exclude
    // or an empty array
    exclude: ["www", "api"]
  }
});

// Start the server
async function start() {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Server running at:", server.info.uri);
}

start();
```

## CONTRIBUTING

Whether you are a novice or experienced software developer,
all contributions and suggestions are welcome!

1. Clone repo

   ```shell
   git clone https://github.com/vemarav/subdomains.git
   ```

2. Add features or bug fixes
3. Make a Pull Request

   OR

   Report a bug [here](https://github.com/vemarav/subdomains/issues/new/choose)

Feel free to contribute, hosted on ❤️ with Github.

## LICENSE

Package published under [MIT License](https://github.com/vemarav/subdomains/blob/master/LICENSE)

## Author

- [Aravind Vemula](https://github.com/vemarav)

> Liked my work then don't forget to ⭐️ the repo as an appraisal.

## SOCIAL

[![Twitter Follow](https://img.shields.io/twitter/follow/vemarav.svg?style=social&label=Follow)](https://twitter.com/vemarav)
