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
import { routes } from "./routes";

const server = Fastify({
  // logger: true,
}).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyCors, { origin: "*" });

server.register(fastifySwagger, {
  openapi: {
    info: { title: "online chat backend", version: "1.0.0" },
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

server.register(routes);

try {
  server.listen({ port: 3333 });
} catch (e) {
  console.log(e);
}
