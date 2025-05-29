import { FastifyInstance } from "fastify";
import { Type } from "@fastify/type-provider-typebox";

export default function (fastify: FastifyInstance, options: any) {
  fastify.post(
    "/hello",
    {
      schema: {
        tags: ["base"],
        body: Type.Object({
          name: Type.String({
            description: "用户名称",
          }),
        }),
        response: {
          200: Type.Object({
            code: Type.Number({
              description: "状态码",
              default: 0,
            }),
            data: Type.Object({
              name: Type.String({
                description: "用户名称",
              }),
            }),
          }),
        },
      },
    },
    (req, replay) => {
      replay.send("ok");
    }
  );
}
