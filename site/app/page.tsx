import { evaluate } from 'flags/next';
import { SPEC_REPOSITORY_URL } from '@/lib/links';
import { Agents } from '@/components/home/agents';
import { Altitude } from '@/components/home/altitude';
import { Blog } from '@/components/home/blog';
import { Community } from '@/components/home/community';
import { Cta } from '@/components/home/cta';
import { DocsGrid } from '@/components/home/docs-grid';
import { Footer } from '@/components/home/footer';
import { Functions } from '@/components/home/functions';
import { Hero } from '@/components/home/hero';
import { HomeNav, type HomeNavLink } from '@/components/home/nav';
import { Problem } from '@/components/home/problem';
import { Stewardship } from '@/components/home/stewardship';
import { Videos } from '@/components/home/videos';
import {
  harmonicMethodSpecReleasedFlag,
  homepageBlogFlag,
  homepageCommunityFlag,
  homepageNewsletterFlag,
  homepageToolingFlag,
  homepageVideosFlag,
} from '@/lib/flags';

import './home.css';

// Metadata is inherited from app/layout.tsx, which already carries the tuned
// site tagline, description, keywords and canonical '/' for this route.

export default async function HomePage() {
  const [showBlog, showVideos, showCommunity, showNewsletter, showTooling, specReleased] =
    await evaluate([
      homepageBlogFlag,
      homepageVideosFlag,
      homepageCommunityFlag,
      homepageNewsletterFlag,
      homepageToolingFlag,
      harmonicMethodSpecReleasedFlag,
    ]);

  const newsletterEnabled = showNewsletter && !!process.env.NEXT_PUBLIC_NEWSLETTER_ACTION;
  const navLinks: HomeNavLink[] = [
    { label: 'The method', href: '/docs' },
    { label: 'Docs', href: '/docs' },
    { label: 'Specification on GitHub', href: SPEC_REPOSITORY_URL },
    ...(showTooling ? [{ label: 'Tooling', href: '#agents' }] : []),
    ...(showBlog ? [{ label: 'Blog', href: '#blog' }] : []),
    ...(showVideos ? [{ label: 'Videos', href: '#videos' }] : []),
    ...(showCommunity || newsletterEnabled ? [{ label: 'Community', href: '#community' }] : []),
  ];

  return (
    <div className="hm-home">
      <HomeNav links={navLinks} />
      <Hero />
      <Stewardship />
      <Problem />
      <Functions />
      <Altitude />
      {showTooling && <Agents specReleased={specReleased} />}
      <DocsGrid />
      {showBlog && <Blog />}
      {showVideos && <Videos />}
      {(showCommunity || newsletterEnabled) && (
        <Community showChannels={showCommunity} showNewsletter={newsletterEnabled} />
      )}
      <Cta />
      <Footer />
    </div>
  );
}
