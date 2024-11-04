import { context, metrics, trace } from '@opentelemetry/api';
import Fastify from 'fastify';
import {
  getLifecyclePerformanceMeasurements,
  lifecyclePerformanceMeasurementPlugin,
} from 'fastify-lifecycle-performance-measurement-plugin';

const meter = metrics.getMeter('backend');

const requestDurationHistogram = meter.createHistogram('request_duration', {
  description: 'The duration of requests',
  unit: 'milliseconds',
});
const requestHandlerDurationHistogram = meter.createHistogram('request_handler_duration', {
  description: 'The duration of request handlers',
  unit: 'milliseconds',
});
const requestParsingDurationHistogram = meter.createHistogram('request_parsing_duration', {
  description: 'The duration of request parsing',
  unit: 'milliseconds',
});
const requestValidationDurationHistogram = meter.createHistogram('request_validation_duration', {
  description: 'The duration of request validation', 
  unit: 'milliseconds',
});
const requestSerializationDurationHistogram = meter.createHistogram('request_serialization_duration', {
  description: 'The duration of request serialization',
  unit: 'milliseconds',
});


const fastify = Fastify({
  logger: true,
});

await fastify.register(lifecyclePerformanceMeasurementPlugin);

fastify.addHook('onResponse', (request, reply, done) => {
  const requestPerformance = getLifecyclePerformanceMeasurements(request);

  request.log.info(requestPerformance);

  requestDurationHistogram.record(requestPerformance?.totalTimeMs ?? 0);
  requestHandlerDurationHistogram.record(requestPerformance?.handlerTimeMs ?? 0);
  requestParsingDurationHistogram.record(requestPerformance?.parsingTimeMs ?? 0);
  requestValidationDurationHistogram.record(requestPerformance?.validationTimeMs ?? 0);
  requestSerializationDurationHistogram.record(requestPerformance?.serializationTimeMs ?? 0);
  
  done();
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
  reply.statusCode = 200;
  return null;
});

fastify.get('/', async function handler(request, reply) {
  reply.headers({
    'access-control-request-method': '*',
    'access-control-allow-headers': '*',
    'access-control-allow-origin': 'http://localhost:3000',
  });
  trace.getActiveSpan()?.addEvent('testing event from backend');

  const response = await fetch('http://microservice:8080/');
  return await response.json();
});

// Run the server!
try {
  await fastify.listen({ port: 8080, host: '0.0.0.0' });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
