import { trace } from '@opentelemetry/api';
import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

fastify.get('/', async function handler(request, reply) {
  trace.getActiveSpan()?.addEvent('testing log from microservice');
  return { hello: 'world' };
});

// Run the server!
try {
  await fastify.listen({ port: 8080, host: '0.0.0.0' });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
