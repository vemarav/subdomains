var Code = require("code"); // assertion library
var Lab = require("lab");
var lab = (exports.lab = Lab.script());
var Hapi = require("hapi");

var subdomains = require("../");

var expect = Code.expect;

lab.experiment("Subdomains plugin", function() {
  lab.test("should load correctly", async () => {
    const server = Hapi.Server({});

    await server.register({
      plugin: subdomains,
      options: {
        exclude: ["www", "api"]
      }
    });
  });

  lab.test("throw provide exclude if not provided", async () => {
    const server = Hapi.Server({
      debug: false
    });

    server.route({
      method: "GET",
      path: "/",
      handler: async () => {
        return "ok";
      }
    });

    await server.register({
      plugin: subdomains,
      options: {
        domainName: "example.com"
      }
    });

    const res = await server.inject("http://example.com/");
    const { message } = res.request.response._error;
    expect(message).to.equal(
      "provide exclude property as an array" +
        " toreject subdomains or provide an empty array!"
    );
    expect(res.statusCode).to.equal(500);
  });

  lab.test("should do nothing if no subdomain", async () => {
    const server = Hapi.Server({ host: "example.com" });

    server.route({
      method: "GET",
      path: "/",
      handler: async () => {
        return "ok";
      }
    });

    await server.register({
      plugin: subdomains,
      options: {
        domainName: "example.com",
        exclude: ["www", "api"]
      }
    });

    const res = await server.inject("http://example.com/");
    expect(res.statusCode).to.equal(200);
  });

  lab.test("should ignore whitelist", async () => {
    const server = Hapi.Server({ host: "example.com" });

    server.route({
      method: "GET",
      path: "/",
      handler: function(request) {
        return request.subdomains;
      }
    });

    await server.register([
      {
        plugin: subdomains,
        options: {
          exclude: ["www", "api", "v2"]
        }
      }
    ]);

    const res = await server.inject("http://api.v2.example.com/");
    expect(res.statusCode).to.equal(200);
    expect(res.result).to.equal([]);
  });

  lab.test("should assign subdomain on request", async () => {
    const server = Hapi.Server({ host: "example.com" });

    await server.register([
      {
        plugin: subdomains,
        options: {
          exclude: ["www"]
        }
      }
    ]);

    server.route({
      method: "GET",
      path: "/",
      handler: async request => {
        return request.subdomain;
      }
    });

    const res = await server.inject("http://acme.example.com");
    expect(res.statusCode).to.equal(200);
    expect(res.result).to.contain("acme");
  });

  lab.test("should assign subdomains on request", async () => {
    const server = Hapi.Server({ host: "example.com" });

    await server.register([
      {
        plugin: subdomains,
        options: {
          exclude: ["www"]
        }
      }
    ]);

    server.route({
      method: "GET",
      path: "/",
      handler: async request => {
        return request.subdomains;
      }
    });

    const res = await server.inject("http://acme.example.com");
    expect(res.statusCode).to.equal(200);
    expect(res.result).to.contain(["acme"]);
  });

  lab.test("should reject complex domains", async () => {
    const server = Hapi.Server({ host: "example.co.uk.ac" });

    await server.register([
      {
        plugin: subdomains,
        options: {
          domainName: "example.co.uk.ac",
          exclude: ["www"]
        }
      }
    ]);

    server.route({
      method: "GET",
      path: "/",
      handler: async request => {
        return request.subdomains;
      }
    });

    const res = await server.inject("http://acme.example.co.uk.ac");
    expect(res.statusCode).to.equal(200);
    expect(res.result).to.contain(["acme"]);
  });
});
