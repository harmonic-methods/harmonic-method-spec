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
  const requireBinding = Boolean(process.env.HM_REQUIRE_BINDING);

  if (body === undefined || (!requireBinding && !number && String(body).trim() === '')) {
    if (requireBinding) {
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

/**
 * Identifier shapes belonging to systems these specs do not define.
 *
 * Shapes, never names. This check runs in public, so a list of client or
 * repository names would itself be the leak — which means a client's name will
 * never be caught here, and that gap is real rather than an oversight.
 */
const FOREIGN = [
  { what: 'a note identifier from another system', re: /\bN-[0-9A-Z]{4}-[0-9]{3,}\b/gi },
  { what: 'an entity identifier from another system', re: /\b(?:bv|rev|acct|mv|ts)-[0-9a-f]{8,}\b/gi },
];

/**
 * Scans a request's title and description. Returns {skipped} where there is no
 * request to read — a local run has none, and inventing one would be worse than
 * saying so.
 */
export function checkPublicSurface() {
  const body = process.env.HM_PR_BODY;
  const title = process.env.HM_PR_TITLE;
  if (body === undefined && title === undefined) {
    return { skipped: 'no request to read — a description is scanned when one is opened' };
  }

  const problems = [];
  for (const [where, text] of [['title', title ?? ''], ['description', body ?? '']]) {
    for (const { what, re } of FOREIGN) {
      const hits = [...new Set([...String(text).matchAll(re)].map((m) => m[0]))];
      if (hits.length) {
        problems.push(
          `the request ${where} carries ${what}: ${hits.join(', ')}\n` +
          '       Identifiers from a system these specs do not define should not appear in\n' +
          '       public prose. Describe what happened instead of citing its record.',
        );
      }
    }
  }
  return { problems, scanned: [title !== undefined && 'title', body !== undefined && 'description'].filter(Boolean) };
}
