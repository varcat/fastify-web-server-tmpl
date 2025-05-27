import fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import autoLoad from "@fastify/autoload";
import { resolve } from "node:path";
import { loadPlugins } from "./plugins";

async function main() {
  const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

  await loadPlugins(server);

  server.register((instance) => {
    instance.addHook("onRequest", (req, reply, done) => {
      console.log(`[${req.method}] ${req.url}`);
      done();
    });

    instance.register(autoLoad, {
      dir: resolve(__dirname, "routes"),
      dirNameRoutePrefix: true,
      options: {
        prefix: "/api",
      },
    });
  });

  server.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });

  await server.ready();
}

main();
