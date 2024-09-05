import { context, trace } from '@opentelemetry/api';
import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

function getCurrentTraceId() {
  const spanContext = trace.getSpan(context.active())?.spanContext();
  return spanContext?.traceId || 'no-trace-id';
}

// Declare a route
fastify.options('/', async function handler(request, reply) {
  reply.headers({
    'access-control-request-method': '*',
    'access-control-allow-headers': '*',
    'access-control-allow-origin': 'http://localhost:3000',
  });
  reply.statusCode = 204;
  return null;
});

fastify.get('/', async function handler(request, reply) {
  reply.headers({
    'access-control-request-method': '*',
    'access-control-allow-headers': '*',
    'access-control-allow-origin': 'http://localhost:3000',
  });
  trace.getActiveSpan()?.addEvent('testing event from backend');

  return await fetch('http://microservice:8080/');
});

// Run the server!
try {
  await fastify.listen({ port: 8080, host: '0.0.0.0' });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
