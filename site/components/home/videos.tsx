import { PlayIcon } from './icons';

// Placeholder copy — no videos exist yet, which is why
// `homepage-videos-section` defaults to off.
const VIDEOS = [
  {
    duration: '3:42',
    title: 'The Harmonic Method in four minutes',
    blurb: 'The core idea and why it exists.',
  },
  {
    duration: '12:08',
    title: 'From first Note to merged Revision',
    blurb: 'One capability, end to end.',
  },
  {
    duration: '18:30',
    title: 'Agents as first-class performers',
    blurb: 'What the Orchestrator function has to account for.',
  },
];

export function Videos() {
  return (
    <section className="hm-section hm-section--alt" id="videos">
      <div className="hm-wrap">
        <div className="hm-shead">
          <span className="cajon-overline">Watch</span>
          <h2>Videos and walkthroughs</h2>
          <p>Short introductions and deeper walkthroughs of the method in practice.</p>
        </div>
        <div className="hm-cards3">
          {VIDEOS.map((video) => (
            <div className="hm-post" key={video.title}>
              <div className="hm-post__media">
                <span className="hm-media-ph hm-media-ph--corner">Video thumbnail</span>
                <span className="hm-play">
                  <span>
                    <PlayIcon />
                  </span>
                </span>
                <span className="hm-dur">{video.duration}</span>
              </div>
              <div className="hm-post__body">
                <h3>{video.title}</h3>
                <p>{video.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
