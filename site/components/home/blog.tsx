// Placeholder copy — no posts exist yet, which is why `homepage-blog-section`
// defaults to off. Give each entry a real href and wrap the card in a link
// before turning the flag on.
const BLOG_POSTS = [
  {
    kind: 'Essay',
    readingTime: '8 min read',
    title: 'Decision debt is the cost of every handoff',
    blurb: 'What is actually lost between conversation, ticket, and pull request.',
  },
  {
    kind: 'Guide',
    readingTime: '6 min read',
    title: 'Writing a Coda a whole team can converge on',
    blurb: 'Defining a destination that is specific and resolved rather than aspirational.',
  },
  {
    kind: 'Field note',
    readingTime: '4 min read',
    title: 'Which function is unowned on your team',
    blurb: 'Using the method as a diagnostic rather than an org chart.',
  },
];

export function Blog() {
  return (
    <section className="hm-section" id="blog">
      <div className="hm-wrap">
        <div className="hm-shead">
          <span className="cajon-overline">From the blog</span>
          <h2>Ideas, patterns, and field notes</h2>
          <p>Writing on delivery, context, and building software with human and AI performers.</p>
        </div>
        <div className="hm-cards3">
          {BLOG_POSTS.map((post) => (
            <div className="hm-post" key={post.title}>
              <div className="hm-post__media">
                <span className="hm-media-ph">Article cover</span>
              </div>
              <div className="hm-post__body">
                <div className="hm-post__meta">
                  {post.kind}
                  <span className="muted">{post.readingTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
