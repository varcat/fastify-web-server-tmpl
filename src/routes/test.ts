import { FastifyInstance } from "fastify";

export default function (fastify: FastifyInstance, options: any) {
    
  fastify.get("/doc", (req, replay) => {
    replay.send("ok");
  });
}
