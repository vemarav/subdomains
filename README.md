# subdomains

[![codecov](https://codecov.io/gh/vemarav/subdomains/branch/master/graph/badge.svg)](https://codecov.io/gh/vemarav/subdomains)
[![Build Status](https://travis-ci.com/vemarav/subdomains.svg?branch=master)](https://travis-ci.com/vemarav/subdomains)

This plugin supprots only [Hapi](https://hapijs.com)

`subdomains` plugin adds subdomains & subdomain properties to request object

**Usage**

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

**Example**

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
    domainName: "yourdomain.co.in",
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

## Contributing

Whether you are a novice or experienced software developer,
all contributions and suggestions are welcome!

Feel free to contribute, hosted on ❤️ with Github

## LICENSE

Package published under [MIT License](https://github.com/vemarav/subdomains/blob/master/LICENSE)

## NOTE

Liked my work then don't forget to ⭐️ the repo as an appraisal.

## Social

[![Twitter Follow](https://img.shields.io/twitter/follow/vemarav.svg?style=social&label=Follow)](https://twitter.com/vemarav)
