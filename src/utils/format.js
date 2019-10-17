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

export const formatEpisode = (episode, index, array) => {
  try {
    const id = array.length - index;
    const title = episode['itunes:title']? episode['itunes:title']['_text'] : episode.title['_text'];
    const description = episode['summary']? episode['summary']['_cdata'] : episode['itunes:summary']['_cdata'];
    const duration = episode['itunes:duration']? episode['itunes:duration']['_text'] : 'Unknown duration';
    const date = episode['pubDate']['_text'];
    const audioSrc = episode['enclosure']? episode['enclosure']['_attributes']['url'] : episode['media:content']['_attributes']['url'];
    return {
      id,
      title,
      description,
      duration,
      date,
      audioSrc
    };
  } catch (error) {
    console.group('FormatEpisode');
    console.log(error);
    console.log(episode);
    console.groupEnd();
  }
}

export const formatRSSContext = (context) => {
  try {
    const summary = context['description']?
      (context['description']['_cdata'] || context['description']['_text'])
      : (context['itunes:summary']['_cdata'] || context['itunes:summary']['_text']);
    return {
      summary
    };
  } catch (error) {
    console.group('FormatRSSContext');
    console.log(error);
    console.log(context);
    console.groupEnd();
  }
}
