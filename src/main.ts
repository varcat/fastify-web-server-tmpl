import fastify from "fastify";
import { Type, TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

async function main() {
  const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

  await server.register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Test swagger",
        description: "Testing the Fastify swagger API",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server",
        },
        {
          url: "http://192.168.31.2:3000",
          description: "test server",
        },
      ],
    },
  });
  await server.register(swaggerUi, {
    routePrefix: "/documentation",
    uiConfig: {
      filter: true,
      docExpansion: "list",
      deepLinking: true,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  server.get(
    "/ping",
    {
      schema: {
        description: "ping测试文案description",
        tags: ["user"],
        summary: "ping测试文案summary",
      },
    },
    async (request, reply) => {
      return "pong\n";
    }
  );

  server.post(
    "/",
    {
      schema: {
        body: Type.Object({
          x: Type.String(),
          y: Type.Number(),
          z: Type.Boolean(),
        }),
      },
    },
    (req) => {
      // The `x`, `y`, `z` types are automatically inferred
      const { x, y, z } = req.body;
      return { x, y, z };
    }
  );

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
