import { FastifyInstance } from "fastify";

export default function (fastify: FastifyInstance, options: any) {
  fastify.get("/list", (req, replay) => {
    replay.send([1, 2]);
  });
}
