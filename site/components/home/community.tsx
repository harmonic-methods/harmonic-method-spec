import { DiscordIcon, GitHubIcon, SubstackIcon, XIcon } from './icons';

// Placeholder copy — none of these destinations exist yet, which is why
// `homepage-community-section` defaults to off. Give each channel a real href
// and wrap the card in a link before turning the flag on.
const CHANNELS = [
  { name: 'Discord', desc: 'Practitioners, in conversation', Icon: DiscordIcon },
  { name: 'Substack', desc: 'Long-form essays', Icon: SubstackIcon },
  { name: 'X', desc: 'Updates and short notes', Icon: XIcon },
  { name: 'GitHub', desc: 'Reference and examples', Icon: GitHubIcon },
];

// The subscribe endpoint (e.g. a Substack or Mailchimp embed target). Required
// before enabling `homepage-newsletter-section` — with no action the form would
// just reload the page.
const NEWSLETTER_ACTION = process.env.NEXT_PUBLIC_NEWSLETTER_ACTION;

function Channels() {
  return (
    <div className="hm-channels">
      {CHANNELS.map(({ name, desc, Icon }) => (
        <div className="hm-channel" key={name}>
          <span className="hm-channel__ico">
            <Icon />
          </span>
          <div>
            <div className="hm-channel__name">{name}</div>
            <div className="hm-channel__desc">{desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Newsletter() {
  return (
    <div className="hm-news">
      <h3>Get the newsletter</h3>
      <p>Occasional updates on new documentation, essays, and videos.</p>
      <form className="hm-news__form" action={NEWSLETTER_ACTION} method="post">
        <label className="sr-only" htmlFor="hm-news-email">
          Email address
        </label>
        <input
          id="hm-news-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
        />
        <button className="cajon-btn cajon-btn--contained cajon-btn--md" type="submit">
          Subscribe
        </button>
      </form>
    </div>
  );
}

export function Community({
  showChannels,
  showNewsletter,
}: {
  showChannels: boolean;
  showNewsletter: boolean;
}) {
  const bothShown = showChannels && showNewsletter;

  return (
    <section className="hm-section" id="community">
      <div className="hm-wrap">
        <div className="hm-shead">
          <span className="cajon-overline">Community</span>
          <h2>Learn in the open</h2>
          <p>
            Follow the method as it develops, ask questions, and share how you are applying it.
          </p>
        </div>
        <div className={bothShown ? 'hm-community' : 'hm-community hm-community--single'}>
          {showChannels && <Channels />}
          {showNewsletter && <Newsletter />}
        </div>
      </div>
    </section>
  );
}
