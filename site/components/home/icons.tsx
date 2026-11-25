// Brand and UI glyphs used by the homepage. Kept inline (rather than as files in
// public/) so they inherit currentColor from their container.

type IconProps = { size?: number };

export function DiscordIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4.4A19 19 0 0015.4 3l-.3.5a14 14 0 014 2A16 16 0 003.9 5.5a14 14 0 014.1-2L7.6 3A19 19 0 003 4.4 20 20 0 00.5 18.3 19 19 0 006.3 21l.5-.8c-.9-.3-1.7-.7-2.5-1.2l.5-.4a13 13 0 0014.4 0l.5.4c-.8.5-1.6.9-2.5 1.2l.5.8a19 19 0 005.8-2.7A20 20 0 0020 4.4zM8.3 15c-.9 0-1.7-.9-1.7-1.9s.7-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9zm7.4 0c-.9 0-1.7-.9-1.7-1.9s.7-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9z" />
    </svg>
  );
}

export function SubstackIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 4h18v3H3V4zm0 5.5h18V21l-9-4-9 4V9.5z" />
    </svg>
  );
}

export function XIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.2 2.3h3.3l-7.2 8.3 8.5 11.3h-6.6l-5.2-6.8-6 6.8H1.7l7.7-8.8L1.5 2.3h6.8l4.7 6.2 5.2-6.2zm-1.2 17.9h1.8L7.1 4.1H5.2L17 20.2z" />
    </svg>
  );
}

export function GitHubIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.4 4.6-4.6 4.9.3.3.6.9.6 1.9v2.8c0 .3.2.6.7.5A10 10 0 0012 2z" />
    </svg>
  );
}

export function PlayIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5z" />
    </svg>
  );
}
