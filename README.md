# subdomains

This plugin supprots only [Hapi](hapijs.com)

`subdomains` plugin adds subdomains & subdomain properties to request object

Example

http://users.kiprosh.trackive.com

```
  server.route({
    method: 'GET',
    path: '\'
    handler: (req, res) => {
      console.log(req.subdomains); // ['users', 'kiprosh']
      console.log(req.subdomain); // 'users'
      return 'Home';
    }
  })
```

## Contributing

Feel free to contribute

## LICENSE

package licensed under [MIT License](https://github.com/vemarav/subdomains/blob/master/LICENSE)

## Social

[![Twitter Follow](https://img.shields.io/twitter/follow/vemarav.svg?style=social&label=Follow)](https://twitter.com/vemarav)
