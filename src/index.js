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
    console.log(`- received ${request.url}`);
    reply.send({
        meta: {
            valid: true
        }
    })
});

let message;
let hash;
fastify.get("/message", (request, reply) => {
    reply.send({ message, hash });
});

fastify.post("/message", (request, reply) => {
    message = request.body.message;
    hash = crypto.randomUUID();
    reply.send(message);
});

(async () => {
    fastify.listen({ port: 443 }).then(() => console.log("started!"));
})();
