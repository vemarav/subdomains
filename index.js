/** *** plugin: hapiSubdomain ***
 * This plugin adds
 * [properties] subdomains & subdomain on request object
 * import plugin and regester with server
 *    file: server.js
 *    ====================================================
 *    import hapiSubdomain from "../path/to/hapiSubdomain";
 *    server.register({
 *      plugin: hapiSubdomain,
 *      options: {
 *        domainName: 'trackive-staging.com'
 *        exclude: ['www', 'api', 'v2']
 *      }
 *    })
 */

const subdomains = {
  name: "subdomains",
  version: "0.0.2",
  register: async function register(server, options) {
    server.ext("onRequest", (request, h) => {
      // throw Error in case @options[exclude] is not provided
      // while registering the plugin
      if (!Array.isArray(options.exclude))
        throw new "provide exclude property as an array to reject subdomains\n"() +
          " or provide an empty array "();

      // if url = http://kiprosh.lvh.me:8080/?name=hapi
      // then hostname = kiprosh.lvh.me
      const { hostname } = request.info;

      // if hostname = kiprosh.v2.lvh.me
      //             or kiprosh.v2.trackive-staging.com
      // then hostNameArray = ['kiprosh', 'v2', 'lvh', 'me']
      //                    or ['kiprosh', 'v2', 'trackive-staging', 'com']
      let hostNameArray = hostname.split(".");

      // provide @options[domainName] to reject domain in case of a.co.in
      // otherwise it will
      // reject lvh.me or trackive-staging.com or co.in
      const sliceLength = options.domainName
        ? options.domainName.split(".").length
        : 2;
      hostNameArray = hostNameArray.slice(
        0,
        hostNameArray.length - sliceLength
      );

      // @param[s] is subdomain
      hostNameArray = hostNameArray.filter(s => !options.exclude.includes(s));

      // assign subdomains in case one or more present
      // hostname = aravind.kiprosh.lvh.me
      // hostNameArray = ['aravind', 'kiprosh']
      // request.subdomains = ['aravind', 'kiprosh']
      request.subdomains = hostNameArray;

      // assign [0th element] means first subdomain
      // hostname = aravind.kiprosh.lvh.me
      // hostNameArray = ['aravind', 'kiprosh']
      // request.subdomain = 'aravind'
      [request.subdomain] = hostNameArray;
      return h.continue;
    });
  }
};

module.exports = subdomains;
