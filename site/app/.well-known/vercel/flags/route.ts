import { createFlagsDiscoveryEndpoint, getProviderData } from 'flags/next';

import * as flags from '@/lib/flags';

// Exposes the flag definitions to the Vercel Toolbar's Flags Explorer so the
// homepage sections can be toggled per-environment without a deploy.
export const GET = createFlagsDiscoveryEndpoint(async () => getProviderData(flags));
