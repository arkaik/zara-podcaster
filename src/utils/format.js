export const formatPodcast = (podcast) => {
  const id = podcast.collectionId;
  const name = podcast.collectionName;
  const author = podcast.artistName;
  const image = podcast.artworkUrl60;
  return ({
    id,
    name,
    author,
    image
  });
}

export const formatEpisode = (episode) => {
  const id = episode['itunes:episode']? episode['itunes:episode']['_text'] : episode['itunes:episodeType']['_text']
  const title = episode['itunes:title']['_text'];
  const duration = episode['itunes:duration']['_text'];
  const date = episode['pubDate']['_text'];
  return {
    id,
    title,
    duration,
    date,
  };
}
