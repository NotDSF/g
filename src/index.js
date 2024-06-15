const fs = require("fs");
const path = require("path");

const fastify = require("fastify")({
    https: {
        cert: fs.readFileSync(path.join(__dirname, '../domain.crt')),
        key: fs.readFileSync(path.join(__dirname, '../domain.key'))
    }
});

fastify.addContentTypeParser("application/vnd.api+json", (request, payload, done) => done())

fastify.post("/*", (request, reply) => {
    reply.status(502);
});

(async () => {
    fastify.listen({ port: 443 }).then(() => console.log("started!"));
})();