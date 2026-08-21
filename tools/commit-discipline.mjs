/**
 * Binding discipline: a change is bound to the step it executes.
 *
 * The Revision spec says a tracked change in a software medium is a change with a
 * linked pull request, so the binding belongs on the request and not on each
 * commit inside it. A request carrying four commits is one Revision; demanding
 * four bindings would model something the specs do not define, and would fail a
 * contributor, an assistant, or a web editor for a convention none of them could
 * discover from the failure.
 *
 * Exactly one binding per request, because a Revision belongs to exactly one Beat
 * Version. A commit may carry the trailer as well; nothing requires it.
 *
 * The request body is only visible where a request exists, so this reports that
 * it cannot check rather than pretending to — with a strict mode the integration
 * job sets, because a check allowed to skip silently where it is the enforcement
 * reports success while guarding nothing.
 */
const TRAILER = /^Beat-Version:[ \t]*(\S+)[ \t]*$/gm;

/** Bindings named in a request body, in order, deduplicated. */
export function bindingsIn(body) {
  return [...new Set([...String(body ?? '').matchAll(TRAILER)].map((m) => m[1]))];
}

/**
 * Returns {skipped} when there is no request to read — a local run, or a push
 * that is not a request — unless HM_REQUIRE_BINDING says that is a failure.
 */
export function checkBinding() {
  const body = process.env.HM_PR_BODY;
  const number = process.env.HM_PR_NUMBER;

  if (body === undefined) {
    if (process.env.HM_REQUIRE_BINDING) {
      return { problems: ['no request body supplied, and HM_REQUIRE_BINDING is set — pass HM_PR_BODY'] };
    }
    return { skipped: 'no request to read — a binding is checked when one is opened' };
  }

  const found = bindingsIn(body);
  const where = number ? `request #${number}` : 'the request';

  if (found.length === 0) {
    return {
      problems: [
        `${where} names no step it executes. Add a line to the description:\n` +
        '           Beat-Version: HM-BV-<beat>.<step>\n' +
        '       Pick the step from harmonic-method/beats/*/versions/ — or open one first if none fits.',
      ],
    };
  }
  if (found.length > 1) {
    return {
      problems: [
        `${where} names ${found.length} steps (${found.join(', ')}), and a change belongs to exactly one. Split it.`,
      ],
    };
  }
  return { bound: found[0], where };
}
