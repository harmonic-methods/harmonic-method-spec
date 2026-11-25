import Link from 'next/link';

import { type MethodRole, roleUrl } from '@/lib/roles';

export function RoleTags({
  accountable = [],
  supporting = [],
}: {
  accountable?: MethodRole[];
  supporting?: MethodRole[];
}) {
  if (accountable.length === 0 && supporting.length === 0) return null;

  return (
    <nav className="hm-role-tags" aria-label="Practice responsibilities">
      {[
        { label: 'Accountable', roles: accountable },
        { label: 'Supporting', roles: supporting },
      ].filter((group) => group.roles.length > 0).map((group) => (
        <div className="hm-role-tags__group" key={group.label}>
          <span className="hm-role-tags__label">{group.label}</span>
          <ul>
            {group.roles.map((role) => (
              <li key={role}><Link href={roleUrl(role)}>{role}</Link></li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
