import { setupCounter } from './setupCounter.ts';
import { setupRequester } from './setupRequester.ts';
import './style.css';
import './tracer.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <button id="counter" type="button"></button>
      <button id="requester" type="button"></button>
    </div>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
setupRequester(document.querySelector<HTMLButtonElement>('#requester')!);
