import { approvalStatus } from './status.mjs';

const list = document.querySelector('#estimates');
try {
  const response = await fetch('./estimates.json');
  if (!response.ok) throw new Error('Unable to load estimates');
  const estimates = await response.json();
  for (const estimate of estimates) {
    const card = document.createElement('article');
    const heading = document.createElement('h2');
    heading.textContent = `${estimate.id} · ${estimate.title}`;
    const status = document.createElement('p');
    const label = approvalStatus(estimate);
    status.className = `status ${label.toLowerCase()}`;
    status.textContent = label;
    const explanation = document.createElement('p');
    explanation.textContent = label === 'Pending'
      ? 'No decision from the designated approver is recorded.'
      : label === 'Unavailable'
        ? 'The record needs review before its status can be confirmed.'
        : 'Recorded decision from the designated approver.';
    card.append(heading, status, explanation);
    list.append(card);
  }
} catch {
  list.textContent = 'Estimates could not be loaded. Reload the page to try again.';
}
