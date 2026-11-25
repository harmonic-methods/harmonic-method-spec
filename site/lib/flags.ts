import { vercelAdapter } from '@flags-sdk/vercel';
import { flag } from 'flags/next';

// Local development and public CI need no provider credentials. Deployments may
// use OIDC from Vercel's request context or a server-side SDK key. Runtime OIDC
// need not be present in process.env when this module is first loaded.
const adapter = process.env.VERCEL === '1' || process.env.FLAGS || process.env.VERCEL_OIDC_TOKEN
  ? vercelAdapter<boolean, Record<string, never>>()
  : { decide: () => false };

// Homepage sections whose content does not exist yet. Each defaults to false so
// the section stays off until real content is in place and the flag is turned on
// in the Vercel Flags Explorer — the page is honest by default, not aspirational.

export const homepageBlogFlag = flag<boolean>({
  key: 'homepage-blog-section',
  defaultValue: false,
  description: 'Gates the "From the blog" section on the homepage. Off until real posts exist.',
  adapter,
});

export const homepageVideosFlag = flag<boolean>({
  key: 'homepage-videos-section',
  defaultValue: false,
  description: 'Gates the "Videos and walkthroughs" section on the homepage. Off until real videos exist.',
  adapter,
});

export const homepageCommunityFlag = flag<boolean>({
  key: 'homepage-community-section',
  defaultValue: false,
  description:
    'Gates the community channel cards on the homepage. Off until the Discord/Substack/X/GitHub destinations exist.',
  adapter,
});

export const homepageNewsletterFlag = flag<boolean>({
  key: 'homepage-newsletter-section',
  defaultValue: false,
  description:
    'Gates the newsletter signup on the homepage. Off until a subscribe endpoint is wired — the form does not post anywhere yet.',
  adapter,
});

export const homepageToolingFlag = flag<boolean>({
  key: 'homepage-tooling-section',
  defaultValue: false,
  description:
    'Gates the "Agents and tooling" section on the homepage — the rubric-to-function mapping plus the specification and Harmonica cards.',
  adapter,
});

// Keep the outbound repository link gated until the source is publicly reachable.
export const harmonicMethodSpecReleasedFlag = flag<boolean>({
  key: 'harmonic-method-spec-released',
  defaultValue: false,
  description:
    'Marks the Harmonic Method specification as publicly released. Turn on only once github.com/harmonic-methods/harmonic-method-spec is public and tagged — it gates the outbound GitHub link.',
  adapter,
});
