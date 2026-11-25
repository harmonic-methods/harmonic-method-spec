import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

import { ROLE_NAMES } from './lib/roles';

const roleList = z.array(z.enum(ROLE_NAMES)).refine(
  (roles) => new Set(roles).size === roles.length,
  'Each role should appear only once in a tag group.',
);

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      accountableRoles: roleList.refine(
        (roles) => roles.length <= 1,
        'Use one accountable role per practice page; explain mixed responsibilities inline.',
      ).optional(),
      supportingRoles: roleList.optional(),
    }).refine(
      (page) => !page.supportingRoles?.some((role) => page.accountableRoles?.includes(role)),
      'A role cannot be both accountable and supporting on the same page.',
    ),
    postprocess: { includeProcessedMarkdown: true },
  },
});

export default defineConfig();
