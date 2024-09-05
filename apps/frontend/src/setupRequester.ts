import { context, propagation } from '@opentelemetry/api';

export function setupRequester(element: HTMLButtonElement) {
  element.innerText = 'Send Request';

  element.addEventListener('click', async () => {
    await request('http://localhost:8080');

    await new Promise((r) => setTimeout(r, 1000));
  });
}

async function request(...params: Parameters<typeof fetch>) {
  const [url, options, ...rest] = params;

  // To merge trace contexts with backend
  const otlpHeaders = {};
  propagation.inject(context.active(), otlpHeaders);

  await fetch(
    url,
    {
      headers: {
        ...otlpHeaders,
        ...options?.headers,
      },
      ...options,
    },
    ...rest
  );
}
