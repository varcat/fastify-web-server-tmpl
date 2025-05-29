import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";

import { networkInterfaces } from "node:os";

function getLocalIP() {
  const info = networkInterfaces();
  for (const name of Object.keys(info)) {
    for (const iface of info[name]!) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "0.0.0.0";
}

export async function loadPlugins(fastify: FastifyInstance) {
  await fastify.register(swagger, {
    hiddenTag: "internal",
    swagger: {},
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Test swagger",
        description: "Testing the Fastify swagger API",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://${getLocalIP()}:8080`,
          description: "localhost server",
        },
      ],
    },
  });
}
