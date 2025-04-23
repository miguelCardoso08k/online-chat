import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { userRoutes } from "./routes/user";
import fastifyJwt from "@fastify/jwt";
import auth from "./plugins/auth";
import { conversationRoutes } from "./routes/conversation";
import { messageRoutes } from "./routes/message";

const server = Fastify({
  // logger: true,
}).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyJwt, { secret: "teste" });
server.register(fastifyCors, { origin: "*" });
server.register(auth);

server.register(fastifySwagger, {
  openapi: {
    info: { title: "online chat backend", version: "1.0.0" },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  transform: jsonSchemaTransform,
});
server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    deepLinking: false,
    persistAuthorization: true,
  },
});

server.register(userRoutes);
server.register(conversationRoutes);
server.register(messageRoutes);

try {
  server.listen({ port: 3333 });
} catch (e) {
  console.log(e);
}
//"@Jq78952"
