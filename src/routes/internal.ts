import { FastifyInstance } from "fastify";

export default function (fastify: FastifyInstance, options: any) {
  fastify.get(
    "/swaggerJson",
    {
      schema: {
        tags: ["internal"],
      },
    },
    () => {
      return fastify.swagger();
    }
  );
}
