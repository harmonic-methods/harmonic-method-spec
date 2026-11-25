export function StarterKitDownload() {
  const url = URL.parse(process.env.STARTER_KIT_DOWNLOAD_URL ?? '');

  if (url?.protocol === 'https:' && !url.username && !url.password) {
    return <p><a href={url.href}>Download the starter kit (ZIP)</a></p>;
  }

  return <p>The starter kit is pending public release.</p>;
}
