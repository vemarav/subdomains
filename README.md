# subdomains

This plugin supprots only [Hapi](https://hapijs.com)

`subdomains` plugin adds subdomains & subdomain properties to request object

**Usage**

```js
// file: server.js
import subdomains from "subdomains";

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

```
// file server.js
import subdomains from "subdomains";

server.route(
  [
    {
      method: 'GET',
      path: '\',
      handler: (req, res) => {
        console.log(req.subdomains); // ['users', 'kiprosh']
        console.log(req.subdomain); // 'users'
        return 'Home';
      }
    }
  ]
);

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




server.start()
```

## Contributing

Feel free to contribute

## LICENSE

package licensed under [MIT License](https://github.com/vemarav/subdomains/blob/master/LICENSE)

## Social

[![Twitter Follow](https://img.shields.io/twitter/follow/vemarav.svg?style=social&label=Follow)](https://twitter.com/vemarav)
