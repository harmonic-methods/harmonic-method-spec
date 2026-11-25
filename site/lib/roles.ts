export const ROLE_NAMES = [
  'Director',
  'Composer',
  'Orchestrator',
  'Conductor',
  'Producer',
  'Promoter',
] as const;

export type MethodRole = (typeof ROLE_NAMES)[number];

export function roleUrl(role: MethodRole) {
  return `/docs/method/roles#${role.toLowerCase()}`;
}
