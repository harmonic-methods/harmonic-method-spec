import { test } from 'node:test';
import assert from 'node:assert/strict';
import { approvalStatus } from './status.mjs';

const estimate = { designatedApproverId: 'approver-1' };
test('no recorded decision stays Pending', () => {
  assert.equal(approvalStatus(estimate), 'Pending');
});
for (const [outcome, label] of [['approved', 'Approved'], ['declined', 'Declined']]) {
  test(`the designated approver's ${outcome} decision displays ${label}`, () => {
    assert.equal(approvalStatus({ ...estimate, decision: { actorId: 'approver-1', outcome } }), label);
  });
}
test('another actor cannot make the estimate appear Approved', () => {
  assert.equal(approvalStatus({ ...estimate, decision: { actorId: 'someone-else', outcome: 'approved' } }), 'Pending');
});
test('an unknown outcome is Unavailable rather than Approved', () => {
  assert.equal(approvalStatus({ ...estimate, decision: { actorId: 'approver-1', outcome: 'unexpected' } }), 'Unavailable');
});
test('a missing designated approver cannot imply approval', () => {
  assert.equal(approvalStatus({ decision: { outcome: 'approved' } }), 'Unavailable');
});
test('a missing estimate is Unavailable', () => {
  assert.equal(approvalStatus(null), 'Unavailable');
});
