export function approvalStatus(estimate) {
  if (!estimate?.designatedApproverId) return 'Unavailable';
  const decision = estimate.decision;
  if (!decision || decision.actorId !== estimate.designatedApproverId) return 'Pending';
  if (decision.outcome === 'approved') return 'Approved';
  if (decision.outcome === 'declined') return 'Declined';
  return 'Unavailable';
}
